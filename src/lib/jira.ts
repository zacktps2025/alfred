// Alfred — Jira REST API Client
// Configurable credentials via ~/.alfred/config.json

import { loadConfig, resolveTeamMember } from "./config.js";
import type { JiraIssue } from "../types/tools.js";

function getAuth(): { host: string; auth: string; project: string } {
  const config = loadConfig();
  if (!config.jira) throw new Error("Jira is not configured. Run `alfred-init` to set up.");
  const { host, email, apiToken, project } = config.jira;
  return {
    host,
    auth: "Basic " + Buffer.from(`${email}:${apiToken}`).toString("base64"),
    project,
  };
}

const BASE_FIELDS = ["summary", "status", "assignee", "updated", "created", "issuetype", "priority"];

async function search(jql: string, fields: string[], maxResults = 100): Promise<JiraIssue[]> {
  const { host, auth } = getAuth();
  const params = new URLSearchParams({
    jql,
    maxResults: String(maxResults),
    fields: fields.join(","),
  });

  const res = await fetch(`https://${host}/rest/api/3/search?${params}`, {
    headers: { Authorization: auth, Accept: "application/json" },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Jira search failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as { issues: JiraIssue[] };
  return data.issues ?? [];
}

/** Sanitize JQL — scope to configured project, block injection patterns */
function sanitizeJql(jql: string): string {
  const { project } = getAuth();
  let cleaned = jql.replace(/;\s*/g, "").replace(/--/g, "").replace(/\/\*/g, "");
  if (!/project\s*=\s*/i.test(cleaned)) {
    cleaned = `project = ${project} AND (${cleaned})`;
  }
  return cleaned;
}

/** All open issues (not Done) */
export async function getOpenIssues(): Promise<JiraIssue[]> {
  const { project } = getAuth();
  return search(
    `project = ${project} AND statusCategory != Done ORDER BY updated ASC`,
    BASE_FIELDS
  );
}

/** Issues completed within the last N hours */
export async function getCompletedSince(hours: number): Promise<JiraIssue[]> {
  const { project } = getAuth();
  return search(
    `project = ${project} AND statusCategory = Done AND updated >= "-${hours}h" ORDER BY updated DESC`,
    BASE_FIELDS,
    50
  );
}

/** Issues not updated in the last N days */
export async function getStaleSince(days: number): Promise<JiraIssue[]> {
  const { project } = getAuth();
  return search(
    `project = ${project} AND statusCategory != Done AND updated <= "-${days}d" ORDER BY updated ASC`,
    BASE_FIELDS
  );
}

/** Custom JQL search (sanitized) */
export async function customSearch(jql: string, maxResults = 10): Promise<JiraIssue[]> {
  const safeJql = sanitizeJql(jql);
  return search(safeJql, [...BASE_FIELDS, "description"], Math.min(maxResults, 25));
}

/** Get a single issue by key */
export async function getIssue(key: string): Promise<JiraIssue> {
  const { host, auth } = getAuth();
  const res = await fetch(
    `https://${host}/rest/api/3/issue/${encodeURIComponent(key)}?fields=${BASE_FIELDS.join(",")}`,
    { headers: { Authorization: auth, Accept: "application/json" } }
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Jira getIssue failed (${res.status}): ${body}`);
  }
  return res.json() as Promise<JiraIssue>;
}

/** Create a new issue. Returns the created issue key. */
export async function createIssue(
  summary: string,
  description?: string,
  issueType = "Task",
  assigneeAccountId?: string
): Promise<string> {
  const { host, auth, project } = getAuth();
  const fields: Record<string, unknown> = {
    project: { key: project },
    summary,
    issuetype: { name: issueType },
  };

  if (description) {
    fields.description = {
      type: "doc",
      version: 1,
      content: [{ type: "paragraph", content: [{ type: "text", text: description }] }],
    };
  }

  if (assigneeAccountId) {
    fields.assignee = { accountId: assigneeAccountId };
  }

  const res = await fetch(`https://${host}/rest/api/3/issue`, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Jira createIssue failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as { key: string };
  return data.key;
}

/** Add a comment to an issue */
export async function addComment(key: string, comment: string): Promise<void> {
  const { host, auth } = getAuth();
  const res = await fetch(`https://${host}/rest/api/3/issue/${encodeURIComponent(key)}/comment`, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      body: {
        type: "doc",
        version: 1,
        content: [{ type: "paragraph", content: [{ type: "text", text: comment }] }],
      },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Jira addComment failed (${res.status}): ${body}`);
  }
}

/** Transition an issue to a new status by name */
export async function transitionIssue(key: string, targetStatusName: string): Promise<void> {
  const { host, auth } = getAuth();

  const res1 = await fetch(
    `https://${host}/rest/api/3/issue/${encodeURIComponent(key)}/transitions`,
    { headers: { Authorization: auth, Accept: "application/json" } }
  );
  if (!res1.ok) throw new Error(`Jira getTransitions failed (${res1.status})`);

  const data1 = (await res1.json()) as {
    transitions: { id: string; name: string; to: { name: string } }[];
  };

  const target = targetStatusName.toLowerCase();
  const transition = data1.transitions.find(
    (t) => t.to.name.toLowerCase() === target || t.name.toLowerCase() === target
  );

  if (!transition) {
    const available = data1.transitions.map((t) => `"${t.to.name}"`).join(", ");
    throw new Error(`No transition to "${targetStatusName}". Available: ${available}`);
  }

  const res2 = await fetch(`https://${host}/rest/api/3/issue/${encodeURIComponent(key)}/transitions`, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ transition: { id: transition.id } }),
  });

  if (!res2.ok) {
    const body = await res2.text();
    throw new Error(`Jira transitionIssue failed (${res2.status}): ${body}`);
  }
}

/** Resolve assignee display name */
export function resolveAssignee(issue: JiraIssue): string {
  if (!issue.fields.assignee) return "Unassigned";
  return resolveTeamMember(issue.fields.assignee.accountId) ?? issue.fields.assignee.displayName;
}

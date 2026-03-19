// Alfred — MCP Server Definition
// The open-source agency brain. Registers all tools, resources, and prompts.
// Full dashboard: alfredify.com

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { loadConfig, hasIntegration, daysSince, todayStr, resolveTeamMember } from "./lib/config.js";
import * as jira from "./lib/jira.js";
import * as slack from "./lib/slack.js";
import * as search from "./lib/search.js";
import * as vercel from "./lib/vercel.js";
import { registerAllPrompts } from "./prompts/index.js";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "alfred",
    version: "1.0.0",
  });

  // ─── TOOLS ────────────────────────────────────────────────

  // Jira: Search Issues
  server.tool(
    "alfred_search_issues",
    "Search project issues using JQL or natural language. Returns open issues, stale issues, or custom queries. Requires Jira integration.",
    {
      query: z.string().describe("JQL query or natural language search (e.g. 'open bugs', 'assigned to me', 'status = \"In Progress\"')"),
      maxResults: z.number().optional().default(10).describe("Max results to return (1-25)"),
    },
    async ({ query, maxResults }) => {
      if (!hasIntegration("jira")) {
        return { content: [{ type: "text", text: "Jira is not configured. Run `alfred-init` to connect your Jira instance." }] };
      }
      try {
        const issues = await jira.customSearch(query, maxResults);
        const formatted = issues.map((i) => {
          const assignee = jira.resolveAssignee(i);
          const stale = daysSince(i.fields.updated);
          return `${i.key} | ${i.fields.status.name} | ${assignee} | ${stale}d ago | ${i.fields.summary}`;
        }).join("\n");

        return {
          content: [{
            type: "text",
            text: issues.length === 0
              ? "No issues found matching that query."
              : `Found ${issues.length} issue(s):\n\n${formatted}\n\n— Alfred`,
          }],
        };
      } catch (err) {
        return { content: [{ type: "text", text: `Error searching issues: ${err instanceof Error ? err.message : String(err)}` }] };
      }
    }
  );

  // Jira: Create Issue
  server.tool(
    "alfred_create_issue",
    "Create a new project issue/task in Jira. Requires Jira integration.",
    {
      summary: z.string().describe("Issue title/summary"),
      description: z.string().optional().describe("Detailed description of the issue"),
      issueType: z.enum(["Task", "Bug", "Story", "Epic"]).optional().default("Task").describe("Issue type"),
      assigneeAccountId: z.string().optional().describe("Jira account ID of the assignee"),
    },
    async ({ summary, description, issueType, assigneeAccountId }) => {
      if (!hasIntegration("jira")) {
        return { content: [{ type: "text", text: "Jira is not configured. Run `alfred-init` to connect your Jira instance." }] };
      }
      try {
        const key = await jira.createIssue(summary, description, issueType, assigneeAccountId);
        const config = loadConfig();
        return {
          content: [{
            type: "text",
            text: `Created ${key}: ${summary}\nView: https://${config.jira!.host}/browse/${key}\n\n— Alfred`,
          }],
        };
      } catch (err) {
        return { content: [{ type: "text", text: `Error creating issue: ${err instanceof Error ? err.message : String(err)}` }] };
      }
    }
  );

  // Jira: Transition Issue
  server.tool(
    "alfred_transition_issue",
    "Move a project issue to a new status (e.g. 'In Progress', 'Done', 'To Do'). Requires Jira integration.",
    {
      issueKey: z.string().describe("Issue key (e.g. 'PROJ-123')"),
      targetStatus: z.string().describe("Target status name (e.g. 'In Progress', 'Done', 'To Do')"),
    },
    async ({ issueKey, targetStatus }) => {
      if (!hasIntegration("jira")) {
        return { content: [{ type: "text", text: "Jira is not configured. Run `alfred-init` to connect your Jira instance." }] };
      }
      try {
        await jira.transitionIssue(issueKey, targetStatus);
        return {
          content: [{
            type: "text",
            text: `${issueKey} transitioned to "${targetStatus}".\n\n— Alfred`,
          }],
        };
      } catch (err) {
        return { content: [{ type: "text", text: `Error transitioning issue: ${err instanceof Error ? err.message : String(err)}` }] };
      }
    }
  );

  // Jira: Add Comment
  server.tool(
    "alfred_comment_issue",
    "Add a comment to an existing project issue. Requires Jira integration.",
    {
      issueKey: z.string().describe("Issue key (e.g. 'PROJ-123')"),
      comment: z.string().describe("Comment text to add"),
    },
    async ({ issueKey, comment }) => {
      if (!hasIntegration("jira")) {
        return { content: [{ type: "text", text: "Jira is not configured." }] };
      }
      try {
        await jira.addComment(issueKey, comment);
        return {
          content: [{ type: "text", text: `Comment added to ${issueKey}.\n\n— Alfred` }],
        };
      } catch (err) {
        return { content: [{ type: "text", text: `Error: ${err instanceof Error ? err.message : String(err)}` }] };
      }
    }
  );

  // Slack: Post Message
  server.tool(
    "alfred_post_message",
    "Post a message to a Slack channel. Requires Slack integration.",
    {
      channel: z.string().describe("Channel ID or name (e.g. 'C0123456789' or '#general')"),
      message: z.string().describe("Message text (supports Slack markdown)"),
    },
    async ({ channel, message }) => {
      if (!hasIntegration("slack")) {
        return { content: [{ type: "text", text: "Slack is not configured. Run `alfred-init` to connect your Slack workspace." }] };
      }
      try {
        await slack.postMessage(channel, message);
        return {
          content: [{ type: "text", text: `Message posted to ${channel}.\n\n— Alfred` }],
        };
      } catch (err) {
        return { content: [{ type: "text", text: `Error posting message: ${err instanceof Error ? err.message : String(err)}` }] };
      }
    }
  );

  // Slack: DM User
  server.tool(
    "alfred_dm_user",
    "Send a direct message to a team member on Slack. Requires Slack integration.",
    {
      userId: z.string().describe("Slack user ID (e.g. 'U0ABC12345')"),
      message: z.string().describe("Message text"),
    },
    async ({ userId, message }) => {
      if (!hasIntegration("slack")) {
        return { content: [{ type: "text", text: "Slack is not configured." }] };
      }
      try {
        await slack.dmUser(userId, message);
        return {
          content: [{ type: "text", text: `DM sent to ${userId}.\n\n— Alfred` }],
        };
      } catch (err) {
        return { content: [{ type: "text", text: `Error: ${err instanceof Error ? err.message : String(err)}` }] };
      }
    }
  );

  // Web Search
  server.tool(
    "alfred_web_search",
    "Search the web for prospects, competitors, research, or any topic. Requires Serper integration.",
    {
      query: z.string().describe("Search query"),
      numResults: z.number().optional().default(10).describe("Number of results (1-20)"),
    },
    async ({ query, numResults }) => {
      if (!hasIntegration("serper")) {
        return { content: [{ type: "text", text: "Web search is not configured. Add your Serper API key via `alfred-init`." }] };
      }
      try {
        const results = await search.search(query, numResults);
        return {
          content: [{
            type: "text",
            text: results.length === 0
              ? "No results found."
              : `${search.formatResults(results)}\n\n— Alfred`,
          }],
        };
      } catch (err) {
        return { content: [{ type: "text", text: `Error: ${err instanceof Error ? err.message : String(err)}` }] };
      }
    }
  );

  // Deploy: List Deployments
  server.tool(
    "alfred_list_deployments",
    "List recent Vercel deployments for your project. Requires Vercel integration.",
    {
      limit: z.number().optional().default(5).describe("Number of deployments to list"),
    },
    async ({ limit }) => {
      if (!hasIntegration("vercel")) {
        return { content: [{ type: "text", text: "Vercel is not configured." }] };
      }
      try {
        const deployments = await vercel.listDeployments(limit);
        const formatted = deployments
          .map((d) => `${d.state} | ${d.url} | ${d.created}`)
          .join("\n");
        return {
          content: [{ type: "text", text: `Recent deployments:\n\n${formatted}\n\n— Alfred` }],
        };
      } catch (err) {
        return { content: [{ type: "text", text: `Error: ${err instanceof Error ? err.message : String(err)}` }] };
      }
    }
  );

  // Generate Report
  server.tool(
    "alfred_generate_report",
    "Generate an agency operations report. Available types: morning-briefing, weekly-summary, stale-issues, team-workload.",
    {
      reportType: z.enum(["morning-briefing", "weekly-summary", "stale-issues", "team-workload"]).describe("Type of report to generate"),
    },
    async ({ reportType }) => {
      const config = loadConfig();

      try {
        if (reportType === "morning-briefing") {
          if (!hasIntegration("jira")) {
            return { content: [{ type: "text", text: "Jira required for morning briefing." }] };
          }
          const open = await jira.getOpenIssues();
          const stale = await jira.getStaleSince(2);
          const today = todayStr();

          const report = [
            `# ${config.companyName} — Morning Briefing`,
            `**${today}**\n`,
            `## Open Issues: ${open.length}`,
            ...open.slice(0, 15).map((i) => `- ${i.key}: ${i.fields.summary} (${i.fields.status.name}, ${jira.resolveAssignee(i)})`),
            open.length > 15 ? `\n...and ${open.length - 15} more` : "",
            `\n## Stale Issues (>2 days): ${stale.length}`,
            ...stale.map((i) => `- ${i.key}: ${i.fields.summary} — ${daysSince(i.fields.updated)} days stale (${jira.resolveAssignee(i)})`),
            `\n— Alfred`,
          ].filter(Boolean).join("\n");

          return { content: [{ type: "text", text: report }] };
        }

        if (reportType === "stale-issues") {
          if (!hasIntegration("jira")) {
            return { content: [{ type: "text", text: "Jira required for stale issues report." }] };
          }
          const stale = await jira.getStaleSince(2);
          if (stale.length === 0) {
            return { content: [{ type: "text", text: "No stale issues found. Everything is moving.\n\n— Alfred" }] };
          }
          const formatted = stale.map((i) =>
            `${i.key} | ${daysSince(i.fields.updated)}d stale | ${jira.resolveAssignee(i)} | ${i.fields.summary}`
          ).join("\n");
          return { content: [{ type: "text", text: `Stale issues (>2 days no update):\n\n${formatted}\n\n— Alfred` }] };
        }

        if (reportType === "team-workload") {
          if (!hasIntegration("jira")) {
            return { content: [{ type: "text", text: "Jira required for team workload report." }] };
          }
          const open = await jira.getOpenIssues();
          const workload: Record<string, { count: number; keys: string[] }> = {};
          for (const issue of open) {
            const name = jira.resolveAssignee(issue);
            if (!workload[name]) workload[name] = { count: 0, keys: [] };
            workload[name].count++;
            workload[name].keys.push(issue.key);
          }
          const formatted = Object.entries(workload)
            .sort((a, b) => b[1].count - a[1].count)
            .map(([name, data]) => `${name}: ${data.count} issues (${data.keys.slice(0, 5).join(", ")}${data.keys.length > 5 ? "..." : ""})`)
            .join("\n");
          return { content: [{ type: "text", text: `Team Workload:\n\n${formatted}\n\n— Alfred` }] };
        }

        if (reportType === "weekly-summary") {
          if (!hasIntegration("jira")) {
            return { content: [{ type: "text", text: "Jira required for weekly summary." }] };
          }
          const open = await jira.getOpenIssues();
          const completed = await jira.getCompletedSince(168); // 7 days
          const stale = await jira.getStaleSince(3);

          const report = [
            `# ${config.companyName} — Weekly Summary`,
            `**${todayStr()}**\n`,
            `## This Week`,
            `- Completed: ${completed.length} issues`,
            `- Still Open: ${open.length} issues`,
            `- Stale (>3 days): ${stale.length} issues`,
            completed.length > 0 ? `\n## Completed` : "",
            ...completed.slice(0, 10).map((i) => `- ${i.key}: ${i.fields.summary}`),
            stale.length > 0 ? `\n## Needs Attention` : "",
            ...stale.slice(0, 10).map((i) => `- ${i.key}: ${i.fields.summary} (${daysSince(i.fields.updated)}d stale)`),
            `\n— Alfred`,
          ].filter(Boolean).join("\n");

          return { content: [{ type: "text", text: report }] };
        }

        return { content: [{ type: "text", text: "Unknown report type." }] };
      } catch (err) {
        return { content: [{ type: "text", text: `Error generating report: ${err instanceof Error ? err.message : String(err)}` }] };
      }
    }
  );

  // ─── RESOURCES ────────────────────────────────────────────

  server.resource(
    "open-issues",
    "alfred://issues/open",
    async (uri) => {
      if (!hasIntegration("jira")) {
        return { contents: [{ uri: uri.href, mimeType: "text/plain", text: "Jira not configured." }] };
      }
      const issues = await jira.getOpenIssues();
      const data = issues.map((i) => ({
        key: i.key,
        summary: i.fields.summary,
        status: i.fields.status.name,
        assignee: jira.resolveAssignee(i),
        type: i.fields.issuetype.name,
        updated: i.fields.updated,
        staleDays: daysSince(i.fields.updated),
      }));
      return {
        contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  server.resource(
    "stale-issues",
    "alfred://issues/stale",
    async (uri) => {
      if (!hasIntegration("jira")) {
        return { contents: [{ uri: uri.href, mimeType: "text/plain", text: "Jira not configured." }] };
      }
      const issues = await jira.getStaleSince(2);
      const data = issues.map((i) => ({
        key: i.key,
        summary: i.fields.summary,
        status: i.fields.status.name,
        assignee: jira.resolveAssignee(i),
        staleDays: daysSince(i.fields.updated),
      }));
      return {
        contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(data, null, 2) }],
      };
    }
  );

  // ─── PROMPTS ──────────────────────────────────────────────

  server.prompt(
    "morning-briefing",
    "Generate a morning briefing for your agency. Pulls open issues, stale items, and team workload.",
    {},
    async () => {
      const config = loadConfig();
      return {
        messages: [{
          role: "user",
          content: {
            type: "text",
            text: `Generate a morning briefing for ${config.companyName}. Use the alfred_generate_report tool with reportType "morning-briefing" to pull the data, then present it in a clean, actionable format. Highlight blockers, stale issues, and priorities for today.`,
          },
        }],
      };
    }
  );

  server.prompt(
    "weekly-report",
    "Generate a weekly progress report summarizing completed work, open items, and stale issues.",
    {},
    async () => {
      const config = loadConfig();
      return {
        messages: [{
          role: "user",
          content: {
            type: "text",
            text: `Generate a weekly progress report for ${config.companyName}. Use alfred_generate_report with reportType "weekly-summary" to pull the data. Format it as an executive summary suitable for stakeholders.`,
          },
        }],
      };
    }
  );

  server.prompt(
    "client-update",
    "Draft a professional client status update based on current project data.",
    {
      clientName: z.string().describe("Client name for the update"),
      projectKey: z.string().optional().describe("Specific project key to focus on"),
    },
    async ({ clientName, projectKey }) => {
      return {
        messages: [{
          role: "user",
          content: {
            type: "text",
            text: `Draft a professional client status update for ${clientName}${projectKey ? ` on project ${projectKey}` : ""}. Use alfred_search_issues to find relevant issues. The tone should be confident, transparent, and action-oriented. Include: what was completed, what's in progress, any blockers, and next steps.`,
          },
        }],
      };
    }
  );

  server.prompt(
    "agency-health-check",
    "Run a full health check on your agency operations — issues, team workload, and stale items.",
    {},
    async () => {
      const config = loadConfig();
      return {
        messages: [{
          role: "user",
          content: {
            type: "text",
            text: `Run a full health check on ${config.companyName}. Use these tools in sequence:
1. alfred_generate_report with "team-workload" to see team distribution
2. alfred_generate_report with "stale-issues" to find blocked items
3. alfred_search_issues with "statusCategory != Done ORDER BY priority DESC" for priority view

Synthesize into: overall health score (green/yellow/red), top 3 risks, and recommended actions.`,
          },
        }],
      };
    }
  );

  // ─── SKILL PROMPTS (30+ agency skills) ──────────────────────

  registerAllPrompts(server);

  return server;
}

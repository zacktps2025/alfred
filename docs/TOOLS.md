# Alfred — MCP Tools Reference

> Complete documentation for every tool Alfred exposes to your AI copilot.

---

## Overview

Alfred exposes 9 tools via the Model Context Protocol (MCP). Your AI copilot calls these automatically when you ask questions about projects, team, or operations.

---

## Project Management (Jira)

### alfred_search_issues

Search your project board using JQL or natural language.

**Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `query` | string | Yes | JQL query or natural language (e.g., "open bugs", "assigned to me") |
| `maxResults` | number | No | Max results to return (1-25, default: 10) |

**Examples:**
```
"What are my open issues?"
"Show me all bugs assigned to Sarah"
"Find stale tasks with no update in 3 days"
```

**Requires:** Jira integration

---

### alfred_create_issue

Create a new task, bug, story, or epic.

**Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `summary` | string | Yes | Issue title |
| `description` | string | No | Detailed description |
| `issueType` | enum | No | Task, Bug, Story, or Epic (default: Task) |
| `assigneeAccountId` | string | No | Jira account ID of the assignee |

**Examples:**
```
"Create a task: Update homepage hero section"
"File a bug: Login button unresponsive on mobile"
"Create an epic for the Q2 website redesign"
```

**Requires:** Jira integration

---

### alfred_transition_issue

Move an issue to a new status.

**Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `issueKey` | string | Yes | Issue key (e.g., "PROJ-123") |
| `targetStatus` | string | Yes | Target status name (e.g., "In Progress", "Done") |

**Examples:**
```
"Move PROJ-123 to In Progress"
"Mark PROJ-456 as Done"
```

**Requires:** Jira integration

---

### alfred_comment_issue

Add a comment to an existing issue.

**Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `issueKey` | string | Yes | Issue key (e.g., "PROJ-123") |
| `comment` | string | Yes | Comment text |

**Examples:**
```
"Add a comment to PROJ-123: Client approved the mockup, proceeding to development"
```

**Requires:** Jira integration

---

## Team Communication (Slack)

### alfred_post_message

Post a message to a Slack channel.

**Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `channel` | string | Yes | Channel ID or name (e.g., "C0123456789" or "#general") |
| `message` | string | Yes | Message text (supports Slack markdown) |

**Examples:**
```
"Post to #team-updates: Sprint 14 starts today"
"Send a message to #general: Team standup in 15 minutes"
```

**Requires:** Slack integration

---

### alfred_dm_user

Send a direct message to a team member.

**Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | string | Yes | Slack user ID (e.g., "U0ABC12345") |
| `message` | string | Yes | Message text |

**Examples:**
```
"DM Sarah: Your task PROJ-123 has been stale for 3 days"
```

**Requires:** Slack integration

---

## Research (Web Search)

### alfred_web_search

Search the web for prospects, competitors, market research, or any topic.

**Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `query` | string | Yes | Search query |
| `numResults` | number | No | Number of results (1-20, default: 10) |

**Examples:**
```
"Search for e-commerce agencies in Toronto"
"Find recent articles about Meta Ads algorithm changes"
"Research competitor pricing for SEO agencies"
```

**Requires:** Serper integration

---

## Deployment (Vercel)

### alfred_list_deployments

List recent Vercel deployments for your project.

**Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `limit` | number | No | Number of deployments to list (default: 5) |

**Examples:**
```
"Show me recent deployments"
"What's the latest deployment status?"
```

**Requires:** Vercel integration

---

## Reporting

### alfred_generate_report

Generate agency operations reports from live data.

**Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `reportType` | enum | Yes | morning-briefing, weekly-summary, stale-issues, or team-workload |

**Report Types:**

| Type | What It Generates |
|------|------------------|
| `morning-briefing` | Open issues count, stale items, formatted for daily review |
| `weekly-summary` | Completed vs. open vs. stale, weekly velocity |
| `stale-issues` | All issues with no update in 48+ hours |
| `team-workload` | Issue distribution per team member |

**Examples:**
```
"Generate the morning briefing"
"Give me the weekly summary"
"Who has the most open issues?"
```

**Requires:** Jira integration

---

## MCP Resources

Resources are read-only data endpoints your AI can access:

| URI | Data | Format |
|-----|------|--------|
| `alfred://issues/open` | All open project issues | JSON |
| `alfred://issues/stale` | Issues with no update in 48+ hours | JSON |

---

## MCP Prompts

Prompts are one-click report templates:

| Prompt | Parameters | What It Triggers |
|--------|-----------|-----------------|
| `morning-briefing` | None | Generates daily ops briefing |
| `weekly-report` | None | Generates weekly progress summary |
| `client-update` | `clientName`, `projectKey` (optional) | Drafts client status update |
| `agency-health-check` | None | Full health assessment with scoring |

---

> Alfred — The Open-Source Agency Brain. alfredify.com

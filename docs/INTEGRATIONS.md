# Alfred — Integration Guide

> How to connect Alfred to your tools. Step-by-step for every integration.

---

## Current Integrations

| Integration | Status | Tools Enabled |
|-------------|--------|--------------|
| Jira | Available | search_issues, create_issue, transition_issue, comment_issue, generate_report |
| Slack | Available | post_message, dm_user |
| Serper | Available | web_search |
| Vercel | Available | list_deployments |
| Meta Ads | Coming v1.1 | Campaign data, ad copy generation |
| Google Ads | Coming v1.1 | Campaign data, keyword performance |
| QuickBooks | Coming v1.2 | Financial sync, invoice tracking |

---

## Jira

### What It Enables

- Search issues with JQL or natural language
- Create tasks, bugs, stories, and epics
- Transition issues between statuses
- Add comments to issues
- Generate reports (morning briefing, weekly summary, stale issues, team workload)
- Read open and stale issues via MCP resources

### Setup

1. **Get your Jira cloud URL**
   - Your URL looks like: `your-instance.atlassian.net`

2. **Generate an API token**
   - Go to: https://id.atlassian.com/manage-profile/security/api-tokens
   - Click "Create API token"
   - Give it a label (e.g., "Alfred")
   - Copy the token immediately — you can't see it again

3. **Find your project key**
   - Open your Jira project
   - The key is in the URL and issue names (e.g., `PROJ` in `PROJ-123`)

4. **Add to config**
   ```json
   {
     "jira": {
       "host": "your-instance.atlassian.net",
       "email": "you@company.com",
       "apiToken": "your-token-here",
       "project": "PROJ"
     }
   }
   ```

### Supported Jira Features

- Cloud Jira only (not Jira Server or Data Center)
- All standard issue types (Task, Bug, Story, Epic)
- Custom JQL queries
- Status transitions (works with any workflow)
- Issue comments

---

## Slack

### What It Enables

- Post messages to any channel
- Send direct messages to team members
- Reference team members by Slack user ID

### Setup

1. **Create a Slack app**
   - Go to: https://api.slack.com/apps
   - Click "Create New App" → "From scratch"
   - Name it "Alfred" and select your workspace

2. **Add bot permissions**
   - Navigate to: OAuth & Permissions
   - Add these Bot Token Scopes:
     - `chat:write` — post messages to channels
     - `chat:write.public` — post to channels the bot hasn't joined
     - `im:write` — send direct messages
     - `channels:read` — list channels
     - `channels:history` — read channel messages

3. **Install to workspace**
   - Click "Install to Workspace"
   - Authorize the permissions
   - Copy the **Bot User OAuth Token** (starts with `xoxb-`)

4. **Add to config**
   ```json
   {
     "slack": {
       "botToken": "xoxb-your-token-here",
       "defaultChannel": "C0123456789"
     }
   }
   ```

### Finding Channel and User IDs

- **Channel ID:** Right-click a channel name in Slack → "View channel details" → scroll to bottom
- **User ID:** Click a user's profile → "..." menu → "Copy member ID"

---

## Serper (Web Search)

### What It Enables

- Search the web for prospects, competitors, market research
- Find companies matching your ICP
- Research industry trends and news

### Setup

1. **Create an account**
   - Go to: https://serper.dev
   - Sign up (free tier: 2,500 queries/month)

2. **Get your API key**
   - Dashboard → API Key → Copy

3. **Add to config**
   ```json
   {
     "serper": {
       "apiKey": "your-serper-key-here"
     }
   }
   ```

---

## Vercel

### What It Enables

- List recent deployments
- Check deployment status and URLs
- Monitor your deployed projects

### Setup

1. **Generate a token**
   - Go to: https://vercel.com/account/tokens
   - Create a new token with appropriate scope

2. **Add to config**
   ```json
   {
     "vercel": {
       "token": "your-vercel-token",
       "projectName": "your-project-name"
     }
   }
   ```

---

## Coming Soon

### Meta Ads (v1.1 — April 2026)

- Pull campaign performance data
- Generate ad copy with the alfred-ads skill + live account context
- Campaign structure recommendations
- Creative fatigue detection
- ROAS analysis and forecasting

**Will require:** Meta Business Manager access + API token with `ads_read` permission.

### Google Ads (v1.1 — April 2026)

- Pull campaign and keyword performance
- Search term analysis
- Budget allocation recommendations
- Quality Score tracking

**Will require:** Google Ads API credentials (OAuth 2.0 + customer ID).

### QuickBooks (v1.2 — May 2026)

- Sync financial data
- Track invoice status
- Generate P&L reports
- Cash flow forecasting
- Margin analysis per client

**Will require:** QuickBooks Online OAuth credentials.

---

## Security Notes

- All credentials are stored locally in `~/.alfred/config.json`
- Alfred never transmits your credentials to any third-party server
- API tokens are used only for direct API calls to your connected services
- The config file should be treated as sensitive — don't commit it to git

---

> Alfred — The Open-Source Agency Brain. alfredify.com

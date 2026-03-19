# Alfred — Setup Guide

> Complete guide to installing and configuring Alfred for your agency.

---

## Quick Start

```bash
npx alfred-agency init
```

The wizard walks you through everything. If you prefer manual setup, read on.

---

## Requirements

- **Node.js 18+** or **Bun 1.0+**
- **Claude Code**, **Cursor**, or any MCP-compatible AI copilot
- At least one integration (Jira, Slack, or Serper) — Alfred works without them but is most powerful when connected

---

## Installation Methods

### Method 1: Interactive Wizard (Recommended)

```bash
npx alfred-agency init
```

This will:
1. Show Alfred's setup wizard
2. Ask what you want to install (MCP server, skills, OS templates, or all)
3. Walk you through integration setup
4. Configure your `~/.alfred/config.json`
5. Install skills to `~/.claude/skills/`
6. Generate OS templates in your project directory
7. Register Alfred as an MCP server

### Method 2: Manual MCP Registration

Add Alfred to Claude Code directly:

```bash
claude mcp add alfred npx alfred-agency
```

Or edit `~/.claude.json`:

```json
{
  "mcpServers": {
    "alfred": {
      "command": "npx",
      "args": ["alfred-agency"]
    }
  }
}
```

### Method 3: Clone and Run Locally

```bash
git clone https://github.com/alfredify/alfred.git
cd alfred
bun install
bun run dev
```

---

## Configuration

All configuration lives in `~/.alfred/config.json`. Here's the full schema:

```json
{
  "companyName": "Your Agency Name",
  "founderName": "Your Name",
  "productDescription": "What your agency does",
  "icpPrimary": "Who your ideal client is",
  "stage": "alpha",

  "brand": {
    "primaryColor": "#8535e9",
    "secondaryColor": "#6c2bd9",
    "darkColor": "#080a2d",
    "lightColor": "#fafafa",
    "headlineFont": "Kanit",
    "bodyFont": "Inter"
  },

  "jira": {
    "host": "your-instance.atlassian.net",
    "email": "you@company.com",
    "apiToken": "your-jira-api-token",
    "project": "PROJ"
  },

  "slack": {
    "botToken": "xoxb-your-slack-bot-token",
    "defaultChannel": "C0123456789"
  },

  "serper": {
    "apiKey": "your-serper-api-key"
  },

  "vercel": {
    "token": "your-vercel-token",
    "projectName": "your-project"
  },

  "team": [
    {
      "name": "Team Member",
      "role": "Developer",
      "slackId": "U0ABC12345",
      "jiraAccountId": "abc123"
    }
  ]
}
```

---

## Integration Setup

### Jira

1. Go to [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Create a new API token
3. Note your Jira cloud URL (e.g., `your-instance.atlassian.net`)
4. Note the project key you want Alfred to manage (e.g., `PROJ`)

### Slack

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Create a new app → "From scratch"
3. Add these Bot Token Scopes under OAuth & Permissions:
   - `chat:write` — post messages
   - `chat:write.public` — post to channels the bot isn't in
   - `im:write` — send DMs
   - `channels:read` — list channels
   - `channels:history` — read channel history
4. Install the app to your workspace
5. Copy the Bot User OAuth Token (starts with `xoxb-`)

### Serper (Web Search)

1. Go to [serper.dev](https://serper.dev)
2. Create an account (free tier: 2,500 queries/month)
3. Copy your API key

### Vercel

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Create a new token
3. Note the project name you want Alfred to monitor

---

## Verify Installation

After setup, restart Claude Code and try:

```
> What are my open Jira issues?
```

If Jira is connected, Alfred will search your board and return results.

```
> Generate a morning briefing
```

Alfred will pull open issues, stale items, and team workload into a formatted briefing.

---

## Troubleshooting

### "Jira is not configured"
Your `~/.alfred/config.json` is missing the `jira` section. Re-run `npx alfred-agency init` or add it manually.

### "Slack is not configured"
Same as above — add your Slack bot token to the config.

### Alfred tools don't appear in Claude Code
1. Make sure Alfred is registered: `claude mcp list` should show `alfred`
2. Restart Claude Code after adding the MCP server
3. Check that `npx alfred-agency` runs without errors

### Config file location
- macOS/Linux: `~/.alfred/config.json`
- Windows: `%USERPROFILE%\.alfred\config.json`

---

> Alfred — The Open-Source Agency Brain. alfredify.com

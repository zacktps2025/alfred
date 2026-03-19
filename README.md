<p align="center">
  <img src="https://alfredify.com/alfred-wizard.png" alt="Alfred" width="120" />
</p>

<h1 align="center">Alfred</h1>

<p align="center">
  <strong>The open-source agency brain that lives inside your AI.</strong><br>
  One install. Your AI copilot now manages projects, clients, ads, funnels, content, finances, and your entire agency.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/alfred-agency"><img src="https://img.shields.io/npm/v/alfred-agency.svg?style=flat-square&color=8535e9" alt="npm version" /></a>
  <a href="https://github.com/alfredify/alfred/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat-square" alt="License" /></a>
  <a href="https://alfredify.com"><img src="https://img.shields.io/badge/dashboard-alfredify.com-8535e9?style=flat-square" alt="Dashboard" /></a>
</p>

---

## What Is Alfred?

Alfred is an MCP server + skill system that turns your AI copilot (Claude Code, Cursor, Gemini CLI) into an agency operations machine.

**Without Alfred:** Your AI writes code and answers questions.

**With Alfred:** Your AI manages your Jira sprints, posts to your Slack channels, writes ad copy that converts, builds sales funnels, generates client reports, tracks margins, designs landing pages, and runs your entire agency ops.

Built for **SMMA founders, digital agency owners, freelancers, and anyone running a service business** who wants to stop context-switching between 12 tools and start letting AI do the heavy lifting.

---

## Install

```bash
npx alfred-agency init
```

That's it. Alfred's setup wizard walks you through everything.

### Manual Setup

If you prefer to configure manually:

```bash
# Add Alfred as an MCP server in Claude Code
claude mcp add alfred npx alfred-agency

# Or add to your Claude Code config (~/.claude.json)
{
  "mcpServers": {
    "alfred": {
      "command": "npx",
      "args": ["alfred-agency"]
    }
  }
}
```

---

## What You Get

### 9 MCP Tools

Your AI can now call these tools directly:

| Tool | What It Does |
|------|-------------|
| `alfred_search_issues` | Search your Jira/project board with JQL or natural language |
| `alfred_create_issue` | Create tasks, bugs, stories, epics |
| `alfred_transition_issue` | Move issues between statuses |
| `alfred_comment_issue` | Add comments to any issue |
| `alfred_post_message` | Post messages to Slack channels |
| `alfred_dm_user` | DM team members on Slack |
| `alfred_web_search` | Search the web for prospects, competitors, research |
| `alfred_list_deployments` | View your Vercel deployment history |
| `alfred_generate_report` | Generate morning briefings, weekly reports, stale issue alerts, team workload |

### 2 MCP Resources (Live Data)

| Resource | Data |
|----------|------|
| `alfred://issues/open` | All open project issues with assignees, statuses, and stale days |
| `alfred://issues/stale` | Issues with no update in 48+ hours |

### 4 MCP Prompts (One-Click Reports)

| Prompt | What It Generates |
|--------|------------------|
| `morning-briefing` | Daily ops briefing with open issues, stale items, priorities |
| `weekly-report` | End-of-week summary with completed work, open items, velocity |
| `client-update` | Professional client status update from live project data |
| `agency-health-check` | Full health assessment with team workload, risks, action items |

### 10 Agency Skills

Skills are intelligence modules that teach your AI how to think about agency work. They install to `~/.claude/skills/` and activate automatically when relevant.

| Skill | Domain | What Your AI Learns |
|-------|--------|-------------------|
| **alfred-ops** | Operations | Sprint planning, task delegation, stale detection, capacity management |
| **alfred-clients** | Client Management | Onboarding, health scoring, retention playbooks, communication protocols |
| **alfred-ads** | Paid Media | Campaign architecture, AIDA-P copy framework, A/B testing, performance analysis |
| **alfred-funnels** | Conversion | Funnel design, offer architecture, landing pages, CRO audits |
| **alfred-content** | Content Production | LinkedIn posts, blogs, emails, video scripts, repurposing engine |
| **alfred-sales** | Sales & Outreach | Cold email sequences, proposals, discovery calls, objection handling |
| **alfred-reports** | Reporting | Client updates, morning briefings, KPI dashboards, financial summaries |
| **alfred-systems** | Systems & Automation | SOPs, workflow design, agent architecture, tool stack optimization |
| **alfred-finance** | Financial Intelligence | Pricing strategy, margin analysis, invoicing, P&L management |
| **alfred-design** | UI/UX | Typography systems, color palettes, responsive design, performance targets |

---

## Integrations

Alfred connects to the tools you already use:

| Integration | What Alfred Can Do | Setup |
|-------------|-------------------|-------|
| **Jira** | Search, create, transition, comment on issues | Cloud URL + API token |
| **Slack** | Post to channels, DM team members | Bot token |
| **Serper** | Web search for prospects, competitors, research | API key |
| **Vercel** | List deployments, check status | API token |
| **Meta Ads** | Campaign performance, ad copy generation | *Coming v1.1* |
| **Google Ads** | Campaign data, performance reporting | *Coming v1.1* |
| **QuickBooks** | Financial sync, invoice tracking | *Coming v1.2* |

### Connect During Setup

The `alfred-init` wizard prompts you for each integration. You can skip any and add them later.

### Connect Later

Edit your config at `~/.alfred/config.json` or re-run:

```bash
npx alfred-agency init
```

---

## Use Cases

### SMMA / Digital Agency Owner

> "Hey Alfred, what's the status of all my client projects?"

Alfred pulls your Jira board, identifies stale tasks, and generates a briefing.

> "Write a Meta ad for my client's fitness coaching program. $47/month offer, targeting women 25-40."

Alfred uses the `alfred-ads` skill to write AIDA-P formatted ad copy with hooks, primary text, headlines, and CTA.

> "Create a 5-email welcome sequence for leads who download our marketing audit template."

Alfred uses the `alfred-funnels` skill to architect the sequence with timing, subject lines, and body copy.

### Freelancer / Consultant

> "Generate a proposal for a $3K/month SEO retainer for a local dental practice."

Alfred uses `alfred-sales` to structure the proposal — executive summary, approach, pricing, next steps.

> "What should I charge for a full website redesign? My competitor charges $8K."

Alfred uses `alfred-finance` to analyze pricing strategy, margin targets, and competitive positioning.

### Agency Ops Manager

> "Give me the morning briefing."

Alfred generates: open issues, stale items, team workload, blockers, and today's priorities.

> "Post to #team-updates: Sprint 14 starts today. Focus areas: Client X website launch, Client Y ad refresh."

Alfred posts directly to your Slack channel.

---

## The Skills in Action

### alfred-ads — Write Ad Copy That Converts

```
You: Write Meta primary text for a $2K/month agency retainer targeting e-commerce brands.

Alfred (using alfred-ads skill):

HOOK: "Your ad account is printing money — for Meta, not for you."

PRIMARY TEXT:
"Your ad account is printing money — for Meta, not for you.

We audit 3-5 e-commerce ad accounts per week. The pattern is always the same:
→ Broad audiences burning budget on window shoppers
→ Creative fatigue going undetected for weeks
→ No testing framework — just vibes

Our clients see 40-60% ROAS improvement in 90 days. Not from spending more.
From spending smarter.

We manage everything: creative strategy, audience architecture, daily optimization,
and weekly reporting you actually understand.

$2K/month. Cancel anytime. Results in 30 days or we refund month one."

CTA: "Book Your Free Ad Account Audit"
```

### alfred-funnels — Design Converting Funnels

```
You: Design a lead magnet funnel for a marketing agency targeting SaaS companies.

Alfred (using alfred-funnels skill):

FUNNEL: Lead Magnet → Nurture → Application

LEAD MAGNET: "The SaaS Growth Audit Template"
 - Format: Interactive spreadsheet + video walkthrough
 - Promise: "Find the 3 biggest leaks in your growth engine in 15 minutes"

LANDING PAGE:
 1. Hero: "Your SaaS is leaking revenue. Find out where."
 2. Problem: 3 specific pain points SaaS founders face
 3. Solution: What the audit template reveals
 4. Social proof: "Used by 200+ SaaS companies"
 5. CTA: "Get Your Free Growth Audit Template"

NURTURE SEQUENCE (5 emails, 10 days):
 Day 0: Deliver the template + quick-start video
 Day 2: "Did you find Leak #1?" — expand on the first insight
 Day 5: Case study — SaaS company that fixed their leaks
 Day 7: "The leaks compound" — cost of inaction
 Day 10: "We fix this for a living" — application CTA
```

---

## OS Templates

Alfred ships with founding-team operating templates that install to your project root:

| Template | What It Creates |
|----------|----------------|
| `CLAUDE.md` | An operating manual for your AI — tells Claude Code how your company works, who does what, and what rules to follow |
| `MEMORY.md` | Strategic memory that persists across AI sessions — key facts, decisions, team info |
| `DECISIONS.md` | Decision log — what you decided, why, and what it forecloses |
| `PEOPLE.md` | Team directory — Slack IDs, Jira IDs, roles, communication preferences |

These aren't just config files. They're the operating system for your founding team's AI-augmented workflow.

---

## Example Configurations

Alfred ships with preset configs for common agency types:

```bash
# During setup, choose your agency type:
npx alfred-agency init

# Or use a preset directly:
cp node_modules/alfred-agency/examples/agency/config.json ~/.alfred/config.json
```

| Preset | Optimized For |
|--------|--------------|
| `agency` | Full-service digital agency (ads + content + design + dev) |
| `saas` | SaaS company with marketing team |
| `consultancy` | Solo consultant or small advisory firm |

---

## Roadmap

### v1.0 — The Brain (Now)

- 9 MCP tools (Jira, Slack, web search, Vercel, reporting)
- 10 agency skills (ops, clients, ads, funnels, content, sales, reports, systems, finance, design)
- 4 MCP prompts (morning briefing, weekly report, client update, health check)
- OS templates (CLAUDE.md, MEMORY.md, DECISIONS.md, PEOPLE.md)
- 16-bit wizard setup experience

### v1.1 — The Ad Machine (April 2026)

- Meta Ads integration (campaign data, performance analysis, copy generation)
- Google Ads integration (campaign data, keyword performance)
- Ad Account Auditor agent
- Creative Fatigue Detector
- ROAS forecasting tools

### v1.2 — The Money Brain (May 2026)

- QuickBooks integration (financial sync, invoice tracking)
- Profitability calculator per client
- Cash flow forecasting
- Automated invoice reminders
- Monthly P&L generation

### v2.0 — The Full OS (Summer 2026)

- 100 skills across 10 categories
- Multi-client management
- Scheduled autonomous agents
- Team collaboration features
- Full-stack agency automation

---

## How It Works

Alfred is a [Model Context Protocol](https://modelcontextprotocol.io/) server. MCP is a standard that lets AI copilots use external tools and data sources.

```
Your AI Copilot (Claude Code / Cursor / Gemini CLI)
          │
          ├── asks Alfred for data ──→ MCP Tools (Jira, Slack, Search)
          │
          ├── reads Alfred's data ──→ MCP Resources (open issues, stale items)
          │
          ├── uses Alfred's templates ──→ MCP Prompts (briefings, reports)
          │
          └── thinks with Alfred's brain ──→ Skills (ads, funnels, sales, ops...)
```

When you ask your AI a question about agency work, it automatically:
1. Checks if an Alfred tool can fetch the data
2. References the relevant Alfred skill for domain expertise
3. Generates output using real data + agency intelligence

---

## Contributing

Alfred is open-source under the Apache 2.0 license. Contributions welcome.

```bash
# Clone the repo
git clone https://github.com/alfredify/alfred.git
cd alfred

# Install dependencies
bun install

# Run in dev mode
bun run dev

# Test with MCP Inspector
bun run inspect
```

### Ways to Contribute

- **New skills**: Write a SKILL.md for a domain Alfred doesn't cover yet
- **New integrations**: Add a lib client for a tool agencies use
- **Bug fixes**: Open an issue or submit a PR
- **Docs**: Improve setup guides, add tutorials, write case studies

---

## Full Dashboard

Alfred is the open-source brain. **Alfredify** is the full agency dashboard.

When you outgrow the terminal, Alfredify gives you:
- Visual project management across all clients
- Ad account dashboards with automated reporting
- Financial tracking (invoicing, margins, P&L)
- Team management with workload balancing
- Client portal with branded reports
- Scheduled automations (morning briefings, stale alerts, weekly reports)

**[alfredify.com](https://alfredify.com)** — The full agency OS.

---

## License

Apache 2.0 — use it, modify it, build on it. See [LICENSE](LICENSE) for details.

---

<p align="center">
  <strong>Alfred — The Open-Source Agency Brain</strong><br>
  <em>Built by <a href="https://alfredify.com">Alfredify</a> for digital wizards everywhere.</em>
</p>

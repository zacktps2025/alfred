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
  <a href="https://github.com/zacktps2025/alfred/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat-square" alt="License" /></a>
  <a href="https://alfredify.com"><img src="https://img.shields.io/badge/dashboard-alfredify.com-8535e9?style=flat-square" alt="Dashboard" /></a>
  <a href="https://smithery.ai/server/@alfredify/alfred"><img src="https://smithery.ai/badge/@alfredify/alfred" alt="Smithery" /></a>
</p>

---

## What Is Alfred?

Alfred is an MCP server + skill system that turns your AI copilot (Claude Code, Cursor, Gemini CLI) into an agency operations machine.

**Without Alfred:** Your AI writes code and answers questions.

**With Alfred:** Your AI manages your Jira sprints, posts to Slack, writes ad copy that converts, builds funnels, generates client reports, designs landing pages, writes proposals, runs cold outreach, and operates your entire agency.

Built for **SMMA founders, digital agency owners, freelancers, and anyone running a service business** who wants to stop context-switching between 12 tools and start letting AI do the heavy lifting.

---

## Install

```bash
npx alfred-agency init
```

That's it. Alfred's setup wizard walks you through everything.

### Manual Setup

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

### 36 MCP Prompts — The Arsenal

This is what makes Alfred different from every other MCP server. 36 battle-tested agency workflows, each producing structured, actionable output:

<details>
<summary><strong>Ads — 6 prompts</strong> (Meta, Google, TikTok, YouTube, creative briefs, campaign architecture)</summary>

| Prompt | What It Generates |
|--------|------------------|
| `meta-ad-copy` | 5 Meta ad variations — AIDA-P framework, hooks, primary text, headlines, descriptions, CTAs |
| `google-ad-copy` | 15 RSA headlines + 4 descriptions + extensions, character-count validated |
| `tiktok-ad-script` | 3 native scripts in different formats — UGC, talking head, problem/solution |
| `youtube-ad-script` | Pre-roll, mid-roll, and bumper scripts with hook-story-offer framework |
| `ad-creative-brief` | Complete brief for designers — visual direction, messaging, deliverables checklist |
| `campaign-structure` | Full campaign architecture — naming conventions, budget splits, audiences, kill/scale rules |

</details>

<details>
<summary><strong>Sales — 6 prompts</strong> (cold outreach, proposals, case studies, scripts)</summary>

| Prompt | What It Generates |
|--------|------------------|
| `cold-email` | 5-email outreach sequence — PAS/AIDA/BAB frameworks, subject line A/B variants |
| `cold-dm` | Platform-native DM sequences for Instagram, LinkedIn, and X/Twitter |
| `proposal` | Full client proposal — exec summary, scope, timeline, 3-tier pricing, terms |
| `case-study` | 3 formats: full narrative (600 words), one-pager, and social proof snippets |
| `sales-script` | Discovery call script — SPIN questions, objection handling matrix, closing framework |
| `client-update` | Professional client status update pulled from live project data |

</details>

<details>
<summary><strong>Content — 9 prompts</strong> (calendars, captions, blogs, video, email, repurposing)</summary>

| Prompt | What It Generates |
|--------|------------------|
| `content-calendar` | 30-day calendar with hooks, formats, pillar distribution, batch production schedule |
| `caption` | 3 variations per platform — Instagram, LinkedIn, X/Twitter, TikTok |
| `repurpose` | 1 piece of content → 11+ pieces across every platform + distribution schedule |
| `blog-post` | SEO-optimized post with meta tags, headers, internal links, CTA, social teasers |
| `video-script` | Short-form (Reels/TikTok), long-form (YouTube), and VSL scripts with B-roll lists |
| `carousel` | Slide-by-slide copy for Instagram/LinkedIn carousels with design notes |
| `email-sequence` | Complete automation — welcome, nurture, abandoned cart, re-engagement sequences |
| `twitter-thread` | Viral threads — story, listicle, contrarian, breakdown formats |
| `newsletter` | Full edition — 5 subject lines, body, P.S. line, social teaser |

</details>

<details>
<summary><strong>Ops — 7 prompts</strong> (SOPs, onboarding, reporting, meeting notes)</summary>

| Prompt | What It Generates |
|--------|------------------|
| `morning-briefing` | Daily ops briefing from live Jira data |
| `weekly-report` | End-of-week summary — completed, open, blocked, velocity |
| `sop` | Step-by-step Standard Operating Procedure with quality checklists |
| `client-onboarding` | Full package — access checklist, kickoff agenda, 30-day plan, welcome message |
| `meeting-notes` | Structured summary — decisions, action items, owners, deadlines, follow-ups |
| `data-story` | Raw metrics → compelling narrative with benchmarks and recommendations |
| `client-report` | Professional monthly performance report with KPIs, trends, and action plan |

</details>

<details>
<summary><strong>Strategy — 5 prompts</strong> (funnels, lead magnets, brand voice, landing pages, health checks)</summary>

| Prompt | What It Generates |
|--------|------------------|
| `funnel` | Complete funnel blueprint — traffic, landing page, nurture, conversion, retargeting, economics |
| `lead-magnet` | 3 lead magnet concepts with titles, outlines, and landing page copy |
| `brand-voice` | Voice guide from content samples — tone scale, vocabulary, do/don't, platform adaptations |
| `landing-page-copy` | Full page copy — hero, problem, solution, how it works, social proof, FAQ, CTA |
| `agency-health` | 8-dimension scorecard with scores (1-10), top risks, 90-day action plan |

</details>

### 10 Agency Skills

Skills are intelligence modules — deep domain knowledge that teaches your AI how to think about agency work:

| Skill | Domain | What Your AI Learns |
|-------|--------|-------------------|
| **alfred-ops** | Operations | Sprint planning, stale detection, capacity management, delegation matrix |
| **alfred-clients** | Clients | Onboarding (72-hour rule), health scoring, retention, churn indicators |
| **alfred-ads** | Paid Media | Campaign architecture, AIDA-P copy, A/B testing protocol, performance benchmarks |
| **alfred-funnels** | Conversion | Funnel types, offer architecture, landing page blueprint, CRO audit |
| **alfred-content** | Content | LinkedIn/blog/email/video frameworks, repurposing engine, content calendar |
| **alfred-sales** | Sales | SPIN framework, cold outreach, proposals, objection handling, follow-up sequences |
| **alfred-reports** | Reporting | Client reports, KPI dashboards, morning briefings, 3-second rule |
| **alfred-systems** | Systems | SOP qualification matrix, automation spectrum, agent architecture |
| **alfred-finance** | Finance | Pricing (3x multiplier), margin targets, invoicing, P&L templates |
| **alfred-design** | UI/UX | Typography systems, color palettes, responsive breakpoints, performance targets |

---

## Integrations

| Integration | What Alfred Can Do | Setup |
|-------------|-------------------|-------|
| **Jira** | Search, create, transition, comment on issues | Cloud URL + API token |
| **Slack** | Post to channels, DM team members | Bot token |
| **Serper** | Web search for prospects, competitors, research | API key |
| **Vercel** | List deployments, check status | API token |
| **Meta Ads** | Campaign performance, ad copy generation | *Coming v1.1* |
| **Google Ads** | Campaign data, performance reporting | *Coming v1.1* |
| **QuickBooks** | Financial sync, invoice tracking | *Coming v1.2* |

---

## Use Cases

### "Write me Meta ads"

```
You: Write Meta ad copy for a $2K/month agency retainer targeting e-commerce brands.

Alfred generates 5 complete variations:

VARIATION 1 — Pain Point Hook:
"Your ad account is printing money — for Meta, not for you."
→ Full primary text (125 words)
→ 3 headlines (each under 27 chars)
→ 2 descriptions
→ CTA: Book Your Free Audit
→ Creative direction note

VARIATION 2 — Social Proof Hook
VARIATION 3 — Contrarian Hook
VARIATION 4 — Curiosity Hook
VARIATION 5 — Direct Offer Hook
```

### "Turn this into content for every platform"

```
You: Repurpose this blog post about agency pricing.

Alfred generates 11 pieces:
 1. LinkedIn post (professional insight)
 2. Instagram caption (storytelling + hashtags)
 3. X/Twitter thread (8 tweets)
 4. Single tweet (most quotable line)
 5. TikTok script (30 seconds)
 6. Email newsletter snippet
 7. Carousel (8 slides, copy + design notes)
 8. Quote graphic text
 9. Blog expansion section
10. Podcast talking points
11. Community discussion post
 +  10-day distribution schedule
```

### "Run the morning briefing"

```
You: Morning briefing.

Alfred pulls live Jira data:
 • 14 open issues (3 critical, 5 high, 6 medium)
 • 4 stale issues (no update in 48+ hours) — with assignee pings
 • Team workload: Sarah (6), Marcus (4), Jake (3), Unassigned (1)
 • Today's priorities: [ranked by urgency]
```

### "Write a cold email sequence"

```
You: Cold email sequence targeting SaaS founders doing $1M-$10M ARR.

Alfred generates a 5-email sequence:
 Email 1 (Day 1): The PAS Opener — pain, agitation, soft CTA
 Email 2 (Day 3): The Value Add — useful insight, no ask
 Email 3 (Day 6): The Proof — case study with specific numbers
 Email 4 (Day 10): The Breakup Tease — scarcity angle
 Email 5 (Day 14): The Permission Close — "should I stop emailing?"

Each with: Subject line A/B variants, full body copy, personalization tokens
```

---

## OS Templates

Alfred ships with founding-team operating templates:

| Template | Purpose |
|----------|---------|
| `CLAUDE.md` | Operating manual for your AI — company info, rules, team, integrations |
| `MEMORY.md` | Strategic memory that persists across AI sessions |
| `DECISIONS.md` | Decision log — what, why, what it forecloses |
| `PEOPLE.md` | Team directory — IDs, roles, communication preferences |

---

## Architecture

```
Your AI Copilot (Claude Code / Cursor / Gemini CLI)
          |
          |--- calls 9 tools -----------> Jira, Slack, Search, Vercel
          |
          |--- reads 2 resources -------> Open issues, stale items
          |
          |--- invokes 36 prompts ------> Ads, sales, content, ops, funnels...
          |
          |--- thinks with 10 skills ---> Deep agency domain knowledge
```

---

## Roadmap

| Version | Name | What Ships |
|---------|------|-----------|
| **v1.0** | The Brain | 9 tools, 36 prompts, 10 skills, OS templates, wizard setup |
| **v1.1** | The Ad Machine | Meta Ads API, Google Ads API, ad auditor, creative fatigue detector |
| **v1.2** | The Money Brain | QuickBooks, profitability calculator, cash flow, invoice automation |
| **v2.0** | The Full OS | 100 skills, multi-client management, scheduled agents, team collab |

---

## Contributing

```bash
git clone https://github.com/zacktps2025/alfred.git
cd alfred && bun install
bun run dev        # Dev mode with watch
bun run lint       # Type check
bun run inspect    # MCP Inspector
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## Full Dashboard

Alfred is the open-source brain. **[Alfredify](https://alfredify.com)** is the full agency dashboard — visual project management, ad dashboards, financial tracking, team management, client portal, and scheduled automations.

---

## License

Apache 2.0 — use it, modify it, build on it. See [LICENSE](LICENSE).

---

<p align="center">
  <strong>Alfred — The Open-Source Agency Brain</strong><br>
  <em>9 tools. 36 prompts. 10 skills. One install.</em><br>
  <em>Built by <a href="https://alfredify.com">Alfredify</a> for digital wizards everywhere.</em>
</p>

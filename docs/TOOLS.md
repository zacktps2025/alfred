# Alfred — Complete Reference

> Every tool, resource, prompt, and skill Alfred gives your AI copilot.

---

## Quick Numbers

| Category | Count | What They Do |
|----------|-------|-------------|
| **Tools** | 9 | Direct actions — search, create, post, deploy |
| **Resources** | 2 | Live data feeds your AI reads automatically |
| **Prompts** | 36 | Battle-tested agency workflows with structured output |
| **Skills** | 10 | Deep domain knowledge modules that teach your AI how to think |

---

## 9 MCP Tools

Your AI calls these directly when you ask it to do things.

### Project Management (Jira)

#### `alfred_search_issues`

Search your project board using JQL or natural language.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `query` | string | Yes | JQL query or natural language (e.g., "open bugs", "assigned to me") |
| `maxResults` | number | No | Max results to return (1-25, default: 10) |

```
"What are my open issues?"
"Show me all bugs assigned to Sarah"
"Find stale tasks with no update in 3 days"
```

#### `alfred_create_issue`

Create a new task, bug, story, or epic.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `summary` | string | Yes | Issue title |
| `description` | string | No | Detailed description |
| `issueType` | enum | No | Task, Bug, Story, or Epic (default: Task) |
| `assigneeAccountId` | string | No | Jira account ID of the assignee |

```
"Create a task: Update homepage hero section"
"File a bug: Login button unresponsive on mobile"
"Create an epic for the Q2 website redesign"
```

#### `alfred_transition_issue`

Move an issue to a new status.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `issueKey` | string | Yes | Issue key (e.g., "PROJ-123") |
| `targetStatus` | string | Yes | Target status name (e.g., "In Progress", "Done") |

```
"Move PROJ-123 to In Progress"
"Mark PROJ-456 as Done"
```

#### `alfred_comment_issue`

Add a comment to an existing issue.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `issueKey` | string | Yes | Issue key (e.g., "PROJ-123") |
| `comment` | string | Yes | Comment text |

```
"Add a comment to PROJ-123: Client approved the mockup"
```

---

### Team Communication (Slack)

#### `alfred_post_message`

Post a message to a Slack channel.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `channel` | string | Yes | Channel ID or name |
| `message` | string | Yes | Message text (supports Slack markdown) |

```
"Post to #team-updates: Sprint 14 starts today"
```

#### `alfred_dm_user`

Send a direct message to a team member.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | string | Yes | Slack user ID |
| `message` | string | Yes | Message text |

```
"DM Sarah: Your task PROJ-123 has been stale for 3 days"
```

---

### Research (Web Search)

#### `alfred_web_search`

Search the web for prospects, competitors, or research.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `query` | string | Yes | Search query |
| `numResults` | number | No | Number of results (1-20, default: 10) |

```
"Search for e-commerce agencies in Toronto"
"Find recent articles about Meta Ads algorithm changes"
```

**Requires:** Serper integration

---

### Deployment (Vercel)

#### `alfred_list_deployments`

List recent Vercel deployments.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `limit` | number | No | Number of deployments (default: 5) |

```
"Show me recent deployments"
"What's the latest deployment status?"
```

---

### Reporting

#### `alfred_generate_report`

Generate agency operations reports from live data.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `reportType` | enum | Yes | morning-briefing, weekly-summary, stale-issues, or team-workload |

| Report Type | What It Generates |
|-------------|------------------|
| `morning-briefing` | Open issues count, stale items, formatted for daily review |
| `weekly-summary` | Completed vs. open vs. stale, weekly velocity |
| `stale-issues` | All issues with no update in 48+ hours |
| `team-workload` | Issue distribution per team member |

---

## 2 MCP Resources

Read-only data endpoints your AI accesses automatically:

| URI | Data | Format |
|-----|------|--------|
| `alfred://issues/open` | All open project issues with assignees, statuses, stale days | JSON |
| `alfred://issues/stale` | Issues with no update in 48+ hours | JSON |

---

## 36 MCP Prompts — The Arsenal

Prompts are structured workflows. You say what you need, Alfred generates complete, actionable output.

### Ads — 6 Prompts

#### `meta-ad-copy`
Generate 5 Meta ad variations using the AIDA-P framework.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `product` | string | Yes | Product/service to advertise |
| `audience` | string | Yes | Target audience |
| `tone` | enum | No | professional, casual, bold, luxury (default: professional) |
| `offer` | string | No | Special offer or CTA |

**Output:** 5 complete variations — each with hook, primary text (125 words), 3 headlines (under 27 chars), 2 descriptions, CTA, and creative direction notes.

#### `google-ad-copy`
Generate Google Ads RSA copy — 15 headlines + 4 descriptions, character-count validated.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `product` | string | Yes | Product/service |
| `keywords` | string | Yes | Target keywords (comma-separated) |
| `landingPage` | string | No | Landing page URL |

**Output:** 15 headlines (30 chars each), 4 descriptions (90 chars each), extensions (sitelinks, callouts, structured snippets), pinning recommendations.

#### `tiktok-ad-script`
Write 3 TikTok ad scripts in different native formats.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `product` | string | Yes | Product/service |
| `audience` | string | Yes | Target audience |
| `duration` | enum | No | 15s, 30s, 60s (default: 30s) |

**Output:** 3 scripts — UGC testimonial, talking head authority, problem/solution. Each with hook (first 3 seconds), scene-by-scene breakdown, on-screen text, music notes.

#### `youtube-ad-script`
Write YouTube pre-roll, mid-roll, and bumper ad scripts.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `product` | string | Yes | Product/service |
| `audience` | string | Yes | Target audience |
| `style` | enum | No | educational, testimonial, direct-response (default: direct-response) |

**Output:** 15-second pre-roll, 60-second mid-roll, 6-second bumper — each with hook-story-offer framework, B-roll suggestions, CTA timing.

#### `ad-creative-brief`
Generate a complete creative brief for your design team.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `campaign` | string | Yes | Campaign name/objective |
| `audience` | string | Yes | Target audience |
| `platforms` | string | No | Target platforms |
| `budget` | string | No | Production budget |

**Output:** Objective, audience profile, key message, visual direction (mood board description, color palette, typography), messaging matrix, deliverables checklist with specs.

#### `campaign-structure`
Architect a complete paid media campaign from scratch.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `goal` | string | Yes | Campaign goal |
| `budget` | string | Yes | Monthly budget |
| `platforms` | string | Yes | Advertising platforms |
| `audience` | string | Yes | Target audience |

**Output:** Campaign naming convention, budget allocation by platform/funnel stage, audience segments, ad set structure, creative matrix, KPI targets, kill/scale rules (pause below X ROAS, scale above Y).

---

### Sales — 6 Prompts

#### `cold-email`
Generate a 5-email cold outreach sequence.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `audience` | string | Yes | Target audience |
| `service` | string | Yes | What you're selling |
| `tone` | enum | No | professional, casual, bold (default: professional) |
| `socialProof` | string | No | Results/case studies to reference |

**Output:** 5 emails (Day 1/3/6/10/14) — PAS opener, value-add, proof, breakup tease, permission close. Each with subject line A/B variants, full body, personalization tokens.

#### `cold-dm`
Create platform-native DM outreach sequences.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `audience` | string | Yes | Target audience |
| `service` | string | Yes | What you offer |
| `platform` | enum | No | instagram, linkedin, twitter, all (default: all) |

**Output:** 3-message sequences per platform. Instagram: casual, story-reply angles. LinkedIn: professional, mutual connection angles. X/Twitter: quote-tweet engagement, value-first DMs.

#### `proposal`
Generate a complete client proposal.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `clientName` | string | Yes | Client/company name |
| `service` | string | Yes | Service being proposed |
| `budget` | string | No | Client's stated budget |
| `timeline` | string | No | Expected timeline |

**Output:** Executive summary, problem statement, proposed solution, detailed scope, 3-tier pricing (Good/Better/Best), timeline with milestones, terms, next steps.

#### `case-study`
Create case studies in 3 formats from one set of results.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `clientName` | string | Yes | Client name (or anonymized) |
| `service` | string | Yes | Service delivered |
| `results` | string | Yes | Key results and metrics |

**Output:** Full narrative (600 words with hero metrics, challenge, solution, results), one-pager (designed for PDF), social proof snippets (testimonial-ready quotes for ads/landing pages).

#### `sales-script`
Build a complete discovery call framework.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `service` | string | Yes | Service being sold |
| `audience` | string | Yes | Target buyer profile |
| `price` | string | No | Price point or range |

**Output:** Opening framework, SPIN questions (Situation, Problem, Implication, Need-payoff), objection handling matrix (10 common objections with responses), closing framework, follow-up sequence.

#### `client-update`
Draft a professional client status update from live project data.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `clientName` | string | Yes | Client name |
| `projectKey` | string | No | Jira project key to pull live data |

**Output:** This week's progress, completed items, in-progress items, blockers, next week's plan. Pulls from Jira if project key provided.

---

### Content — 9 Prompts

#### `content-calendar`
Generate a 30-day content calendar.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `niche` | string | Yes | Industry/niche |
| `platforms` | string | Yes | Target platforms |
| `goal` | string | No | Content goal |
| `postsPerWeek` | number | No | Posting frequency (default: 5) |

**Output:** 30 days of content — each post with hook, format (carousel/reel/text/story), pillar category, caption brief. Includes batch production schedule and platform-specific timing.

#### `caption`
Write platform-optimized captions in 3 variations.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `topic` | string | Yes | What the post is about |
| `platforms` | string | Yes | Target platforms |
| `tone` | enum | No | professional, casual, bold, educational (default: professional) |
| `cta` | string | No | Desired call-to-action |

**Output:** 3 caption variations per platform — Instagram (storytelling + hashtag sets), LinkedIn (professional insight + formatting), X/Twitter (punchy + thread-worthy), TikTok (native + trending hooks).

#### `repurpose`
Turn one piece of content into 11+ pieces across every platform.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | string | Yes | Original content to repurpose |
| `sourceType` | enum | No | blog, podcast, video, tweet, newsletter (default: blog) |

**Output:** 11 pieces — LinkedIn post, Instagram caption, X/Twitter thread (8 tweets), single tweet, TikTok script (30s), email snippet, carousel (8 slides + design notes), quote graphic text, blog expansion, podcast talking points, community post. Plus 10-day distribution schedule.

#### `blog-post`
Write an SEO-optimized blog post.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `topic` | string | Yes | Blog topic |
| `keywords` | string | Yes | Target SEO keywords |
| `audience` | string | No | Target reader |
| `wordCount` | number | No | Target word count (default: 1500) |

**Output:** Meta title + description, H1/H2/H3 structure, full article with internal link suggestions, 3 CTAs, social teaser copy for 3 platforms.

#### `video-script`
Write video scripts for short-form and long-form.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `topic` | string | Yes | Video topic |
| `format` | enum | No | short-form, long-form, vsl (default: short-form) |
| `duration` | string | No | Target duration |
| `style` | enum | No | educational, storytelling, sales, entertainment (default: educational) |

**Output:** Short-form (Reels/TikTok 30-60s), long-form (YouTube 8-12min), and VSL scripts — each with hook, scene breakdown, B-roll suggestions, on-screen text cues, music/SFX notes, CTA timing.

#### `carousel`
Design Instagram/LinkedIn carousel copy — slide by slide.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `topic` | string | Yes | Carousel topic |
| `platform` | enum | No | instagram, linkedin (default: instagram) |
| `slides` | number | No | Number of slides (default: 8) |

**Output:** Cover slide (hook headline), content slides with copy + design notes (text placement, background, visual element), CTA slide, caption, hashtag set.

#### `email-sequence`
Build complete email automation sequences.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | enum | Yes | welcome, nurture, abandoned-cart, re-engagement, launch |
| `product` | string | Yes | Product/service |
| `audience` | string | No | Target audience |

**Output:** 5-7 email sequence — subject lines (A/B variants), preview text, full body copy, CTA buttons, send timing, segmentation rules, automation triggers.

#### `twitter-thread`
Write viral X/Twitter threads in multiple formats.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `topic` | string | Yes | Thread topic |
| `format` | enum | No | story, listicle, contrarian, breakdown (default: listicle) |
| `tweetCount` | number | No | Number of tweets (default: 10) |

**Output:** Opening hook tweet, body tweets with natural flow, engagement CTA, closing tweet with strong takeaway. Thread formatted for copy-paste.

#### `newsletter`
Write a complete newsletter edition.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `topic` | string | Yes | Edition topic |
| `audience` | string | Yes | Subscriber audience |
| `tone` | enum | No | casual, professional, bold (default: casual) |

**Output:** 5 subject lines (A/B test ready), opening hook, body sections with headers, key takeaway, P.S. line, social teaser copy, preview text.

---

### Ops — 7 Prompts

#### `morning-briefing`
Generate daily ops briefing from live Jira data.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| *(none)* | — | — | Pulls data automatically from Jira |

**Output:** Open issue count by priority, stale items with assignee pings, team workload distribution, today's priorities ranked by urgency.

#### `weekly-report`
Generate end-of-week progress summary.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| *(none)* | — | — | Pulls data automatically from Jira |

**Output:** Completed this week, still in progress, blocked items, velocity trend, next week's priorities.

#### `sop`
Create a step-by-step Standard Operating Procedure.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `process` | string | Yes | Process to document |
| `audience` | enum | No | team-member, contractor, client (default: team-member) |

**Output:** Purpose, scope, prerequisites, step-by-step instructions with screenshots/notes, quality checklist, exception handling, version history template.

#### `client-onboarding`
Generate a complete client onboarding package.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `clientName` | string | Yes | Client name |
| `service` | string | Yes | Service being delivered |
| `teamLead` | string | No | Team lead name |

**Output:** Access checklist (all accounts and permissions needed), kickoff meeting agenda, 30-day onboarding timeline, welcome message (ready to send), expectations doc.

#### `meeting-notes`
Structure meeting notes from raw notes or transcript.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `notes` | string | Yes | Raw notes or transcript |
| `meetingType` | enum | No | standup, client-call, strategy, review (default: strategy) |

**Output:** Attendees, agenda items covered, key decisions (with rationale), action items (with owners + deadlines), follow-up schedule, parking lot items.

#### `data-story`
Turn raw metrics into a compelling narrative.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `data` | string | Yes | Raw data/metrics to interpret |
| `audience` | enum | No | executive, client, team (default: client) |

**Output:** Key insight headline, context (what was expected), narrative (what happened and why), benchmark comparison, recommendations, visual suggestion (chart type + axes).

#### `client-report`
Generate a professional monthly performance report.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `clientName` | string | Yes | Client name |
| `data` | string | Yes | Performance data/metrics |
| `period` | string | No | Reporting period |

**Output:** Executive summary (3-second rule — key number first), KPI dashboard table, trend analysis, wins this period, challenges + mitigation, next period's plan, appendix with raw data.

#### `landing-page-copy`
Write complete landing page copy — every section.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `product` | string | Yes | Product/service |
| `audience` | string | Yes | Target audience |
| `goal` | enum | No | lead-gen, sales, waitlist, booking (default: lead-gen) |

**Output:** Hero (headline + subhead + CTA), problem section, solution section, how-it-works (3 steps), features/benefits, social proof section, pricing (if applicable), FAQ (5-8 questions), final CTA block.

---

### Strategy — 4 Prompts

#### `funnel`
Design a complete funnel — traffic source to conversion.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `goal` | string | Yes | Funnel goal |
| `audience` | string | Yes | Target audience |
| `budget` | string | No | Traffic budget |
| `funnelType` | enum | No | lead-magnet, direct-offer, application, webinar, challenge (default: lead-magnet) |

**Output:** Visual funnel map, traffic strategy (sources, CPC estimates, budget), landing page brief, lead capture mechanism, 5-email nurture sequence, conversion event plan, retargeting strategy (3 audiences), funnel economics table (ROAS projection), implementation checklist.

#### `lead-magnet`
Generate 3 lead magnet concepts with complete briefs.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `audience` | string | Yes | Target audience |
| `problem` | string | Yes | Main problem your audience faces |
| `service` | string | Yes | Your service that the lead magnet leads into |

**Output:** 3 concepts (Checklist, Template, Mini Training) — each with title, format, outline, expected opt-in rate. Plus recommendation on which to build first and a 3-email follow-up sequence brief.

#### `brand-voice`
Extract a brand voice guide from existing content samples.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | string | Yes | 3-5 examples of existing brand content |
| `brandName` | string | Yes | Brand/client name |

**Output:** Voice summary, tone scale (5 dimensions scored 1-10 with evidence), vocabulary lists (words they use / words they avoid), do/don't table, 3 example rewrites (generic → on-brand), platform adaptations (web, social, email, ads).

#### `agency-health`
Run a comprehensive agency health assessment.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `revenue` | string | No | Current MRR |
| `clients` | string | No | Number of clients + avg retainer |
| `team` | string | No | Team size and structure |
| `challenges` | string | No | Biggest challenges |
| `stage` | string | No | Agency stage (startup, growth, scale) |

**Output:** Overall health rating (GREEN/YELLOW/RED), 8-dimension scorecard (revenue growth, client retention, team utilization, pipeline, profitability, delivery, brand, founder dependency — each scored 1-10), top 3 risks, top 3 opportunities, 90-day action plan (month-by-month), benchmark comparison.

---

## 10 Skills — Domain Knowledge

Skills are intelligence modules. They teach your AI how to *think* about agency work, not just what to output.

| Skill File | Domain | What Your AI Learns |
|-----------|--------|-------------------|
| `alfred-ops` | Operations | Sprint planning, stale detection, capacity management, delegation matrix, velocity tracking |
| `alfred-clients` | Client Management | Onboarding (72-hour rule), health scoring (5 dimensions), retention strategy, churn indicators, upsell timing |
| `alfred-ads` | Paid Media | Campaign architecture, AIDA-P copy framework, A/B testing protocol, performance benchmarks, budget pacing |
| `alfred-funnels` | Conversion | Funnel types (5 architectures), offer mechanics, landing page blueprint, CRO audit methodology |
| `alfred-content` | Content | LinkedIn/blog/email/video/carousel frameworks, repurposing engine, content calendar systems, platform algorithms |
| `alfred-sales` | Sales | SPIN framework, cold outreach sequences, proposals (3-tier pricing), objection handling, follow-up cadences |
| `alfred-reports` | Reporting | Client reports (3-second rule), KPI dashboards, morning briefings, data storytelling, executive summaries |
| `alfred-systems` | Systems | SOP qualification matrix, automation spectrum, agent architecture, tool consolidation framework |
| `alfred-finance` | Finance | Pricing (3x multiplier rule), margin targets (60-70%), invoicing workflows, P&L templates, cash flow forecasting |
| `alfred-design` | UI/UX | Typography systems (3 scales), color palettes (semantic mapping), responsive breakpoints, performance targets |

---

## Integration Requirements

| Tool | Requires | How to Set Up |
|------|----------|--------------|
| Jira tools | Jira Cloud + API token | `npx alfred-agency init` → Jira section |
| Slack tools | Slack Bot token | `npx alfred-agency init` → Slack section |
| Web search | Serper API key | `npx alfred-agency init` → Serper section |
| Vercel tools | Vercel API token | `npx alfred-agency init` → Vercel section |
| Prompts | No integration needed | Work out of the box |
| Skills | No integration needed | Always loaded |

---

> Alfred — The Open-Source Agency Brain. [alfredify.com](https://alfredify.com)

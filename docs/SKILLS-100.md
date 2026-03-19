# Alfred — The 100 Skills & Agents That Revolutionize Agency AI

> One install. `npx alfred-agency`. Every skill an agency needs, embedded in your AI copilot.

This is the master roadmap for what Alfred ships to every agency founder on Earth.

---

## How to Read This

- **Skill** = a capability the MCP server exposes as a tool, resource, or prompt
- **Agent** = a higher-order skill that chains multiple tools, uses reasoning, and operates autonomously
- **Priority** = Wave 1 (ship first, highest impact), Wave 2 (fast follow), Wave 3 (moat builders)
- **Status** = BUILT / SCAFFOLDED / PLANNED

---

## Category 1 — Client Acquisition & Sales (Skills 1–12)

The agency dies without new clients. These skills turn Alfred into a 24/7 biz dev machine.

| # | Skill/Agent | What It Does | Type | Wave |
|---|-------------|-------------|------|------|
| 1 | **B2B Lead Prospector** | Searches the web for businesses matching your ICP. Returns company name, website, decision-maker name, email pattern, LinkedIn, estimated revenue, tech stack. | Agent | 1 |
| 2 | **Cold Email Writer** | Generates personalized cold outreach emails from a lead profile. Multiple frameworks (AIDA, PAS, BAB). A/B variants. Follow-up sequences (3–5 touch). | Skill | 1 |
| 3 | **Cold DM Writer** | Same as cold email but optimized for Instagram DM, LinkedIn InMail, and X/Twitter DM — shorter, punchier, platform-native tone. | Skill | 1 |
| 4 | **Proposal Generator** | Takes a prospect brief (industry, budget, goals) and outputs a branded PDF proposal with scope, timeline, pricing tiers, case study reference, and contract-ready terms. | Agent | 1 |
| 5 | **Sales Call Script Builder** | Generates a discovery call script from ICP + service offering. Objection handling matrix. Closing framework. Customizable by vertical. | Skill | 1 |
| 6 | **Lead Scorer** | Takes a list of leads and scores them (1–100) based on ICP fit, company size, tech stack signals, urgency indicators. Outputs a ranked CSV. | Skill | 2 |
| 7 | **LinkedIn Profile Optimizer** | Audits a founder's LinkedIn profile and rewrites headline, about, featured section, and experience for agency owner positioning. | Skill | 2 |
| 8 | **Case Study Writer** | Takes raw project data (client, problem, approach, results) and outputs a formatted case study — narrative version, one-pager version, and social proof snippet. | Skill | 1 |
| 9 | **Testimonial Request Drafter** | Generates personalized "ask for testimonial" messages for happy clients. Includes specific prompts so the client writes something actually useful. | Skill | 2 |
| 10 | **Competitor Intelligence Scanner** | Researches a competitor agency — their services, pricing (if public), client list, tech stack, job postings, social presence. Returns a competitive brief. | Agent | 2 |
| 11 | **RFP Response Generator** | Takes an RFP document and generates a complete response aligned to the scoring criteria, pulling from your agency's capabilities, case studies, and team bios. | Agent | 3 |
| 12 | **Pipeline Forecast** | Reads your deal pipeline (from CRM or Jira) and generates a revenue forecast — weighted by stage probability, average deal cycle, and close rate. | Agent | 3 |

---

## Category 2 — Paid Advertising (Skills 13–28)

This is the bread and butter of SMMA. Alfred should be the best ad ops copilot on the planet.

| # | Skill/Agent | What It Does | Type | Wave |
|---|-------------|-------------|------|------|
| 13 | **Meta Ad Copy Generator** | Writes primary text, headlines, and descriptions for Meta (Facebook/Instagram) ads. Multiple hooks, angles, and CTA variants per brief. | Skill | 1 |
| 14 | **Google Ad Copy Generator** | Writes responsive search ads (15 headlines + 4 descriptions), display ad copy, and Performance Max asset groups from a brief. | Skill | 1 |
| 15 | **TikTok Ad Script Writer** | Writes native-feeling TikTok ad scripts — hook (0–3s), body, CTA. UGC style, founder talking head, problem/solution, before/after formats. | Skill | 1 |
| 16 | **YouTube Ad Script Writer** | Pre-roll (15s, 30s) and mid-roll scripts. Hook-story-offer framework. Bumper ad variants. | Skill | 2 |
| 17 | **Ad Creative Brief Generator** | Takes campaign goals and outputs a complete creative brief for designers/videographers — visual direction, copy, dimensions, CTA, target audience context. | Skill | 1 |
| 18 | **Ad Account Auditor** | Connects to Meta/Google Ads API, pulls campaign data, and generates a full audit — wasted spend, audience overlap, creative fatigue, bidding inefficiencies, structure issues. | Agent | 2 |
| 19 | **Campaign Structure Planner** | Given a budget, objective, and audience, outputs the optimal campaign/adset/ad structure — naming conventions, audience splits, budget allocation, testing framework. | Skill | 1 |
| 20 | **Ad Performance Analyzer** | Reads campaign metrics and generates insights — what's working, what to kill, what to scale, creative winners/losers, audience insights. Plain English, not just numbers. | Agent | 1 |
| 21 | **Audience Builder** | Suggests custom audiences, lookalikes, interest stacks, and exclusions based on ICP and product. Platform-specific (Meta interest targeting vs. Google in-market). | Skill | 2 |
| 22 | **UTM Builder & Tracker** | Generates consistent UTM parameters for all campaigns. Maintains a UTM registry so nothing conflicts. | Skill | 2 |
| 23 | **Ad Spend Allocator** | Given total monthly budget across platforms, recommends optimal split based on historical performance, industry benchmarks, and campaign objectives. | Agent | 3 |
| 24 | **Creative Fatigue Detector** | Monitors ad frequency and CTR trends. Alerts when creatives are fatiguing. Suggests refresh timing and new angle directions. | Agent | 2 |
| 25 | **Landing Page Copy Writer** | Writes complete landing page copy — hero, benefits, social proof, FAQ, CTA sections. Matched to the ad that drives traffic to it. | Skill | 1 |
| 26 | **A/B Test Designer** | Designs statistically valid A/B tests for ads — what to test, hypothesis, sample size needed, duration, success criteria. Prevents the "test everything randomly" trap. | Skill | 2 |
| 27 | **ROAS Calculator & Forecaster** | Models expected ROAS from inputs (AOV, conversion rate, CPC, budget). Scenario planning: "what if CPC rises 20%?" | Skill | 2 |
| 28 | **Platform Migration Planner** | Guides an agency through moving a client from one ad platform to another — budget reallocation, audience translation, creative adaptation, timeline. | Agent | 3 |

---

## Category 3 — Content & Social Media (Skills 29–44)

Agencies run content for clients. Alfred should make one person do the work of five.

| # | Skill/Agent | What It Does | Type | Wave |
|---|-------------|-------------|------|------|
| 29 | **Social Media Calendar Builder** | Generates a 30-day content calendar from brand voice, pillars, and goals. Platform-specific (IG, TikTok, LinkedIn, X, Facebook). Includes post types, hooks, and CTA rotation. | Agent | 1 |
| 30 | **Caption Writer** | Writes platform-native captions — Instagram (long-form storytelling + hashtags), X (thread or single), LinkedIn (professional hook + insight), TikTok (short punchy + hashtags). | Skill | 1 |
| 31 | **Hashtag Researcher** | Analyzes a topic/niche and returns optimal hashtag sets — high reach, medium competition, niche specific. Grouped by tier. Platform-aware. | Skill | 2 |
| 32 | **Content Repurposer** | Takes one piece of content (blog, podcast transcript, video script) and outputs 10+ pieces — social posts, email snippet, tweet thread, LinkedIn post, carousel outline, short-form video script. | Agent | 1 |
| 33 | **Blog Post Writer** | Writes SEO-optimized blog posts from a keyword or topic brief. Includes meta title, description, headers, internal link suggestions, and CTA. | Skill | 1 |
| 34 | **Email Newsletter Writer** | Writes newsletter editions from topic + brand voice. Subject line variants, preview text, body, CTA. Multiple formats (curated, editorial, promotional). | Skill | 1 |
| 35 | **Video Script Writer** | Short-form (Reels/TikTok/Shorts) and long-form (YouTube) scripts. Hook frameworks, B-roll suggestions, caption/subtitle text. | Skill | 1 |
| 36 | **Carousel Designer Script** | Writes the slide-by-slide copy for Instagram/LinkedIn carousels — hook slide, content slides, CTA slide. Ready to drop into Canva or Figma. | Skill | 1 |
| 37 | **Brand Voice Extractor** | Analyzes a client's existing content (website, social, emails) and extracts a brand voice guide — tone, vocabulary, do/don't, example rewrites. | Agent | 2 |
| 38 | **Content Audit Runner** | Analyzes a client's last 30/60/90 days of content across platforms. Identifies top performers, underperformers, gaps in content mix, posting frequency issues. | Agent | 2 |
| 39 | **Trend Spotter** | Searches trending topics, sounds, formats on TikTok/IG/X. Returns relevant trends for a specific niche with suggested content angles. | Agent | 2 |
| 40 | **X/Twitter Thread Writer** | Writes viral-format threads — hook tweet, body tweets, CTA tweet. Multiple frameworks (story, listicle, contrarian take, breakdown). | Skill | 1 |
| 41 | **Podcast Show Notes Writer** | Takes a podcast transcript or summary and outputs show notes, episode description, timestamps, key quotes, social promotion snippets. | Skill | 2 |
| 42 | **UGC Brief Creator** | Writes a brief for UGC creators — script outline, talking points, visual direction, do/don't, brand requirements, payment terms template. | Skill | 2 |
| 43 | **Content Pillar Architect** | Designs a content pillar strategy from scratch — 3–5 pillars, content types per pillar, distribution cadence, example posts per pillar. | Agent | 2 |
| 44 | **Comment & DM Response Bank** | Generates a library of on-brand responses for common comments and DMs — FAQs, pricing questions, collaboration requests, complaints, praise. | Skill | 2 |

---

## Category 4 — Client Reporting & Analytics (Skills 45–56)

Agencies live and die on proving ROI. Alfred should make reporting effortless and impressive.

| # | Skill/Agent | What It Does | Type | Wave |
|---|-------------|-------------|------|------|
| 45 | **Client Report Generator** | Pulls data from ad platforms + analytics and generates a branded monthly report — KPIs, trends, wins, recommendations, next month plan. | Agent | 1 |
| 46 | **KPI Dashboard Builder** | Generates a live dashboard config (compatible with common tools) or a structured data view of all client KPIs. | Skill | 2 |
| 47 | **Metric Explainer** | Takes a metric (CTR, ROAS, CPA, etc.) and the client's actual numbers, and generates a plain-English explanation a non-technical client can understand. | Skill | 1 |
| 48 | **Anomaly Detector** | Monitors metrics and flags anomalies — sudden spend spikes, conversion drops, CTR crashes. Generates an alert with possible causes and recommended actions. | Agent | 2 |
| 49 | **Attribution Modeler** | Helps set up and explain attribution models — last click, first click, linear, data-driven. Recommends the right model for the client's funnel. | Skill | 3 |
| 50 | **Competitor Ad Spy** | Searches Meta Ad Library, Google Ads Transparency Center for competitor ads. Returns active creatives, copy, landing pages, estimated spend. | Agent | 2 |
| 51 | **Weekly Win Summary** | Auto-generates a short "wins of the week" for each client — biggest metric improvements, milestones hit, new records. Perfect for client Slack/email updates. | Skill | 1 |
| 52 | **Monthly Strategy Memo** | Takes last month's data + next month's goals and writes a strategic memo — what worked, what we're changing, why, expected impact. | Agent | 2 |
| 53 | **Churn Risk Scorer** | Analyzes client engagement signals (response time, satisfaction, results trend, contract timeline) and flags churn risk with recommended save actions. | Agent | 3 |
| 54 | **GA4 Event Planner** | Designs a GA4 event tracking plan for a client's website — custom events, conversions, parameters, data layer requirements. | Skill | 2 |
| 55 | **ROI Calculator** | Calculates true ROI including agency fees, ad spend, cost of goods. Outputs a client-friendly P&L for their marketing investment. | Skill | 2 |
| 56 | **Data Storyteller** | Takes raw data (CSV, JSON, metrics) and writes a narrative — turns numbers into a story with context, comparisons, and implications. | Skill | 1 |

---

## Category 5 — Project & Operations Management (Skills 57–68)

The agency's internal engine. Alfred replaces the ops manager.

| # | Skill/Agent | What It Does | Type | Wave |
|---|-------------|-------------|------|------|
| 57 | **Morning Briefing** | Generates a daily ops briefing — open tasks, stale issues, deadlines, team workload, blockers. | Agent | 1 |
| 58 | **Weekly Report** | End-of-week summary — completed, in-progress, blocked, velocity trend, team highlights. | Agent | 1 |
| 59 | **Stale Issue Watchdog** | Continuously monitors for tasks that haven't been updated. Pings assignees. Escalates after N days. | Agent | 1 |
| 60 | **Sprint Planner** | Takes a backlog and team capacity, recommends sprint scope. Balances client work vs. internal projects. Flags overcommitment. | Agent | 2 |
| 61 | **SOP Writer** | Takes a process description (or records a workflow) and generates a step-by-step SOP — numbered steps, screenshots placeholders, responsible roles, exception handling. | Skill | 1 |
| 62 | **Client Onboarding Checklist Generator** | Creates a customized onboarding checklist for a new client — access requests, kickoff agenda, first 30-day plan, deliverable schedule. | Skill | 1 |
| 63 | **Meeting Notes Summarizer** | Takes meeting transcript or notes and outputs — decisions made, action items (with owners + deadlines), open questions, follow-ups needed. | Skill | 1 |
| 64 | **Resource Allocator** | Maps team capacity vs. client demands. Identifies overloaded team members, underutilized capacity, and hiring triggers. | Agent | 2 |
| 65 | **QA Checklist Generator** | Generates a QA/review checklist for any deliverable type — ad creative, landing page, email campaign, report. Prevents common mistakes. | Skill | 2 |
| 66 | **Time Tracker Analyzer** | Reads time tracking data and generates insights — profitability per client, team utilization rates, scope creep indicators, efficiency trends. | Agent | 3 |
| 67 | **Handoff Document Generator** | When a project transitions between team members, generates a complete handoff doc — context, status, pending items, key contacts, access info. | Skill | 2 |
| 68 | **Capacity Forecaster** | Projects team capacity 4–8 weeks out based on current pipeline, retainer schedules, and planned projects. Identifies hiring needs before they become emergencies. | Agent | 3 |

---

## Category 6 — Financial Operations (Skills 69–78)

Most agencies are terrible at money. Alfred fixes that.

| # | Skill/Agent | What It Does | Type | Wave |
|---|-------------|-------------|------|------|
| 69 | **Invoice Generator** | Creates professional invoices from project data — line items, hours, retainer amounts, taxes, payment terms. Multiple templates. | Skill | 2 |
| 70 | **Profitability Calculator** | Per-client profitability analysis — revenue vs. time spent vs. direct costs. Identifies which clients are profitable and which are underwater. | Agent | 2 |
| 71 | **Pricing Strategy Advisor** | Analyzes your services, costs, market rates, and value delivered. Recommends pricing models (retainer, performance, project, hybrid) with specific numbers. | Agent | 2 |
| 72 | **Cash Flow Forecaster** | Projects 30/60/90 day cash flow from retainer schedule, project milestones, expected closes, and fixed costs. Flags cash crunches before they hit. | Agent | 3 |
| 73 | **Proposal Pricing Calculator** | Takes scope of work and calculates pricing — hours estimate, margin target, competitive benchmark, discount scenarios. | Skill | 2 |
| 74 | **Expense Categorizer** | Takes raw transaction data and categorizes expenses — software, ads, contractors, payroll, office. Ready for bookkeeper or QuickBooks import. | Skill | 3 |
| 75 | **Revenue Recognition Tracker** | For project-based work, tracks when revenue should be recognized — milestone-based, time-based, deliverable-based. Keeps books clean. | Agent | 3 |
| 76 | **Contract Template Generator** | Generates client contracts from service type + terms — MSA, SOW, NDA, retainer agreement. Customizable clauses. Not legal advice, but a solid first draft. | Skill | 2 |
| 77 | **Late Payment Chaser** | Generates escalating follow-up emails for overdue invoices — friendly reminder (Day 1), firm follow-up (Day 7), final notice (Day 14). | Skill | 2 |
| 78 | **Monthly P&L Generator** | Compiles revenue, COGS, operating expenses, and net margin into a monthly P&L statement. Trends over time. Investor-grade formatting. | Agent | 3 |

---

## Category 7 — SEO & Website (Skills 79–86)

Every agency either does SEO or should. Alfred makes it accessible.

| # | Skill/Agent | What It Does | Type | Wave |
|---|-------------|-------------|------|------|
| 79 | **Keyword Research Agent** | Takes a topic/niche and returns keyword clusters — volume, difficulty, intent, SERP features, recommended content type per keyword. | Agent | 2 |
| 80 | **On-Page SEO Auditor** | Audits a URL for on-page SEO — title, meta, headers, content length, keyword usage, internal links, image alt text, schema, Core Web Vitals. | Agent | 2 |
| 81 | **Technical SEO Checker** | Crawl-based analysis — broken links, redirect chains, canonical issues, sitemap validation, robots.txt review, indexation status. | Agent | 3 |
| 82 | **Local SEO Optimizer** | Audits and optimizes Google Business Profile — NAP consistency, category selection, review response drafts, local citation opportunities. | Agent | 2 |
| 83 | **Schema Markup Generator** | Generates JSON-LD structured data for any page type — LocalBusiness, FAQ, HowTo, Product, Article, Event, Organization. | Skill | 2 |
| 84 | **Meta Tag Writer** | Writes SEO-optimized meta titles and descriptions for a batch of pages. Character count validated. CTR-optimized with power words. | Skill | 1 |
| 85 | **Internal Link Strategist** | Analyzes site structure and recommends internal linking opportunities — orphan pages, hub-spoke models, anchor text optimization. | Agent | 3 |
| 86 | **SEO Content Brief Generator** | Creates a detailed content brief from a target keyword — outline, word count target, competitor analysis, questions to answer, semantic keywords to include. | Skill | 2 |

---

## Category 8 — Funnel & CRO (Skills 87–93)

Agencies build funnels. Alfred should be the funnel architect.

| # | Skill/Agent | What It Does | Type | Wave |
|---|-------------|-------------|------|------|
| 87 | **Funnel Architect** | Designs a complete funnel — traffic source → landing page → lead magnet → email sequence → sales page → upsell. Outputs every component as a brief. | Agent | 2 |
| 88 | **Landing Page Auditor** | Reviews a landing page URL and scores it — headline strength, CTA clarity, social proof, page speed, mobile UX, trust signals. Actionable fixes. | Agent | 2 |
| 89 | **Email Sequence Builder** | Writes complete email automation sequences — welcome (5 emails), abandoned cart (3), post-purchase (4), re-engagement (3), webinar follow-up (5). | Agent | 1 |
| 90 | **CTA Optimizer** | Analyzes existing CTAs and generates higher-converting alternatives. Tests button copy, placement suggestions, urgency/scarcity frameworks. | Skill | 2 |
| 91 | **Lead Magnet Creator** | Generates lead magnet concepts + content — checklists, templates, mini-courses, calculators, swipe files. Matched to ICP and funnel stage. | Skill | 2 |
| 92 | **Webinar Planner** | Designs a complete webinar — title, outline, slide structure, registration page copy, email sequence, follow-up offers, replay strategy. | Agent | 3 |
| 93 | **Conversion Rate Analyzer** | Takes funnel metrics (traffic, opt-in rate, sales rate) and identifies the biggest bottleneck. Recommends specific fixes with expected impact. | Skill | 2 |

---

## Category 9 — Team & HR (Skills 94–98)

Agencies scale with people. Alfred helps manage them.

| # | Skill/Agent | What It Does | Type | Wave |
|---|-------------|-------------|------|------|
| 94 | **Job Description Writer** | Writes role-specific JDs for agency positions — media buyer, account manager, designer, strategist, closer. Includes comp benchmarks and culture fit signals. | Skill | 2 |
| 95 | **Interview Question Generator** | Generates role-specific interview questions — technical skills, culture fit, scenario-based, red flag detectors. Scoring rubric included. | Skill | 3 |
| 96 | **Employee Onboarding Planner** | Creates a 30/60/90 day onboarding plan for a new hire — tool access, training schedule, first projects, check-in cadence, success metrics. | Skill | 2 |
| 97 | **Performance Review Writer** | Takes performance notes and outputs a structured review — strengths, growth areas, specific examples, goals for next period, development plan. | Skill | 3 |
| 98 | **Team Health Pulse** | Weekly anonymous-style check — workload satisfaction, blocker identification, morale indicators. Aggregates into actionable insights for founders. | Agent | 3 |

---

## Category 10 — Agency Growth & Strategy (Skills 99–100)

The meta-layer. Alfred helps the agency think about itself.

| # | Skill/Agent | What It Does | Type | Wave |
|---|-------------|-------------|------|------|
| 99 | **Agency Health Scorecard** | Monthly assessment across 8 dimensions — revenue growth, client retention, team utilization, pipeline health, profitability, delivery quality, brand strength, founder dependency. Scores each 1–10 with specific improvement actions. | Agent | 2 |
| 100 | **Niche Down Advisor** | Analyzes your current client mix, results, and market opportunity. Recommends the most profitable niche to double down on — with TAM estimate, positioning language, and transition plan. | Agent | 3 |

---

## Wave Summary

| Wave | Count | Timeline | Theme |
|------|-------|----------|-------|
| **Wave 1** | 28 skills | Ship with v1.0 | Core agency ops — the stuff every agency does daily |
| **Wave 2** | 47 skills | v1.1–v1.3 | Depth — makes Alfred indispensable |
| **Wave 3** | 25 skills | v2.0+ | Moat — things no competitor will match |

## Wave 1 Skills (Ship First — 28)

1, 2, 3, 4, 5, 8, 13, 14, 15, 17, 19, 20, 25, 29, 30, 32, 33, 34, 35, 36, 40, 45, 47, 51, 56, 57, 58, 59, 61, 62, 63, 84, 89

## The Strategic Unlock

Every one of these skills works standalone via `npx alfred-agency`. Free. Open-source.

But when you connect them to **Alfredify** (the dashboard at alfredify.com), they compound:
- Skills share context (the content agent knows what the ad agent wrote)
- Data persists (reports build on historical data, not just snapshots)
- Multi-client management (run all 100 skills across 20 clients from one dashboard)
- Team collaboration (assign skills to team members, review outputs, approve before publish)
- Automation (skills run on schedules, not just on-demand)

**Alfred (free, open-source) is the drug. Alfredify (paid SaaS) is the prescription.**

---

*Generated March 19, 2026 — Alfred by Alfredify*

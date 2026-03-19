# Alfred — Skills Catalog

> Every skill Alfred installs, what it teaches your AI, and when it activates.

---

## What Are Skills?

Skills are intelligence modules — markdown files that teach your AI copilot how to think about specific agency domains. They install to `~/.claude/skills/` and activate automatically when your question matches their domain.

They don't just give your AI templates. They give it **frameworks, decision logic, benchmarks, and anti-patterns** — the same knowledge a senior agency operator has built over years.

---

## The 10 Core Skills

### 1. alfred-ops — Agency Operations

**Activates when:** Managing projects, sprints, tasks, team capacity, or operations.

**What your AI learns:**
- 4-layer task decomposition (Epic → Story → Task → Subtask)
- Stale detection protocol (48h → reminder, 72h → escalation, 5d → blocker)
- Sprint planning with 70% capacity rule
- Project health scoring (Green / Yellow / Red)
- Delegation decision matrix (urgency vs. complexity)
- Daily standup and weekly review frameworks

---

### 2. alfred-clients — Client Management

**Activates when:** Onboarding clients, checking health scores, managing relationships, drafting communications.

**What your AI learns:**
- 72-hour onboarding window (kickoff within 3 business days of signing)
- Communication protocol with frequency rules by channel
- 5-dimension health scoring (25-point scale): responsiveness, satisfaction, results, scope clarity, payment
- Client retention playbooks (quarterly business reviews, surprise overdelivery)
- Change order protocol and scope management
- Contract essentials checklist

---

### 3. alfred-ads — Paid Media Intelligence

**Activates when:** Writing ad copy, planning campaigns, analyzing performance, optimizing spend.

**What your AI learns:**
- 3-layer campaign architecture (Campaign → Ad Set → Ad)
- AIDA-P copy framework (Attention → Interest → Desire → Action → Proof)
- Platform-specific rules (Meta primary text limits, Google headline rules)
- Hook formulas (question, statistic, bold claim, story, pattern interrupt)
- A/B testing protocol (one variable, 1000+ impressions, 95% confidence)
- Performance benchmarks by objective (lead gen, e-commerce, brand awareness)
- Monthly reporting structure

---

### 4. alfred-funnels — Conversion Architecture

**Activates when:** Designing funnels, writing landing pages, creating offers, auditing conversion rates.

**What your AI learns:**
- 4 funnel types: lead magnet, direct offer, application, webinar
- Irresistible offer formula (Outcome + Time + Effort + Risk + Bonus)
- 8-section landing page blueprint
- Lead magnet design rules (must be consumable in under 10 minutes)
- CRO audit checklist by funnel stage
- Email sequence architecture (welcome, abandon, re-engage)

---

### 5. alfred-content — Content Production

**Activates when:** Writing social posts, blogs, emails, video scripts, or repurposing content.

**What your AI learns:**
- 3 core content rules (problem-first, one idea per piece, founder voice)
- Forbidden AI-sounding words (elevate, seamless, unleash, next-gen, etc.)
- LinkedIn post structure with 12 hook formulas
- Blog architecture: Problem → Context → Solution → Implication
- Email campaign rules (subject < 50 chars, one CTA, 200-word sweet spot)
- VSL script structure with timing guidelines
- 1-to-7 repurposing method (one piece → 7 derivative pieces)
- Weekly content cadence template

---

### 6. alfred-sales — Sales & Outreach

**Activates when:** Prospecting, writing cold outreach, following up, drafting proposals, handling objections.

**What your AI learns:**
- ICP filter (Budget / Need / Authority / Timeline / Fit)
- SPIN outreach framework (Situation → Problem → Implication → Need-Payoff)
- Cold email template (under 100 words, one CTA, lowercase subject)
- 6-touchpoint follow-up sequence (Day 0 to Day 30)
- Proposal structure (6 sections, send within 24 hours)
- 5 common objection responses with scripts
- 30-minute discovery call framework

---

### 7. alfred-reports — Reporting Intelligence

**Activates when:** Generating reports, creating dashboards, writing client updates, tracking KPIs.

**What your AI learns:**
- 5 report templates (client update, morning briefing, weekly internal, monthly performance, financial summary)
- The 3-second rule (headline insight visible in 3 seconds)
- KPI framework — agency-level and client-level by service type
- Reporting rules: lead with takeaway, compare to something, never include vanity metrics without context
- Visual hierarchy (green = on track, yellow = watch, red = action needed)

---

### 8. alfred-systems — Systems & Automation

**Activates when:** Writing SOPs, designing workflows, building automations, choosing tools, optimizing processes.

**What your AI learns:**
- SOP qualification criteria (done 3+ times, done by 2+ people, or has 5+ steps)
- SOP template structure
- Automation decision framework (5 questions before automating anything)
- 5 automation levels (manual with checklist → fully autonomous)
- Agent architecture design principles
- Tool stack decision framework (max 8 tools in core stack)
- The 5 Whys for process problems

---

### 9. alfred-finance — Financial Intelligence

**Activates when:** Setting prices, analyzing margins, managing invoices, forecasting cash flow, building P&L.

**What your AI learns:**
- 3 pricing models (hourly, project-based, monthly retainer) with formulas
- Rate benchmarking table by service type and seniority
- Margin analysis (50%+ gross margin target, 20%+ net margin target)
- Invoice management protocol (5-stage collection escalation)
- P&L structure for agencies
- When to hire, when to raise prices, when to fire a client

---

### 10. alfred-design — Agency UI/UX

**Activates when:** Designing landing pages, building dashboards, choosing colors, planning layouts.

**What your AI learns:**
- 3 laws of agency design (conversion over decoration, speed is a feature, mobile dominates)
- Typography system with mobile/desktop sizing scale
- Color system (5 required colors: primary, dark, light, accent, muted)
- Spacing system based on 4px/8px increments
- Landing page above-the-fold requirements
- CTA button design specs
- Responsive breakpoint strategy (5 breakpoints)
- Performance targets (LCP < 2.5s, CLS < 0.1, page weight < 1MB)
- Anti-patterns to avoid

---

## How Skills Activate

Skills activate automatically when your question matches their domain. You don't need to invoke them — your AI copilot reads the skill files at the start of each session and applies the relevant knowledge.

**Example:**
- "Write a Meta ad for my client" → `alfred-ads` activates
- "How should I price this retainer?" → `alfred-finance` activates
- "Design a funnel for lead generation" → `alfred-funnels` activates
- "What's the team workload look like?" → `alfred-ops` activates

---

## Skill File Format

Each skill is a markdown file with YAML frontmatter:

```markdown
---
name: alfred-example
description: What this skill covers. Use when [trigger conditions].
---

# Skill Title — Subtitle

> One-line philosophy

## When to Activate
[Trigger conditions]

## Frameworks
[Domain-specific knowledge, decision logic, templates]

---
> Alfred — The Open-Source Agency Brain. Full dashboard: alfredify.com
```

Skills follow the [Agent Skills](https://docs.anthropic.com/en/docs/claude-code/skills) format and work across Claude Code, Cursor, and other MCP-compatible tools.

---

## Creating Custom Skills

You can create your own skills and add them to `~/.claude/skills/`:

1. Create a directory: `~/.claude/skills/my-skill/`
2. Add a `SKILL.md` file with the frontmatter format above
3. Restart Claude Code

Your custom skills will coexist with Alfred's built-in skills.

---

> Alfred — The Open-Source Agency Brain. alfredify.com

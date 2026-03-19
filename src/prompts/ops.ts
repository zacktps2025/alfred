// Alfred — Operations & Management Prompts
// SOPs, onboarding, meeting notes, reports, data storytelling

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { loadConfig } from "../lib/config.js";

export function register(server: McpServer): void {
  const config = loadConfig();
  const agency = config.companyName || "the agency";

  // ─── SOP Writer ────────────────────────────────────────────

  server.prompt(
    "sop",
    "Generate a step-by-step Standard Operating Procedure from a process description.",
    {
      process: z.string().describe("Describe the process (e.g. 'How we onboard a new Meta Ads client', 'How we publish a blog post')"),
      role: z.string().optional().describe("Who executes this SOP (e.g. 'Account Manager', 'Media Buyer')"),
      tools: z.string().optional().describe("Tools used in this process (e.g. 'Jira, Slack, Meta Business Manager')"),
    },
    async ({ process, role, tools }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, an operations architect for ${agency}. Generate a complete SOP.

## Brief
- **Process:** ${process}
- **Executed By:** ${role || "To be assigned"}
- **Tools Used:** ${tools || "Not specified — infer from the process"}

## Output: Complete SOP

### SOP: ${process}
**Version:** 1.0
**Owner:** ${role || "[Role]"}
**Last Updated:** [Today's date]
**Estimated Time:** [X minutes/hours]

---

### Purpose
[1-2 sentences: why this SOP exists and what it ensures]

### When to Use
[Trigger conditions — what event kicks off this process]

### Prerequisites
[What must be true before starting — access, approvals, materials needed]

### Steps

**Step 1: [Action]**
- What to do: [specific instruction]
- Tool: [which tool to use]
- Expected output: [what "done" looks like]
- Common mistake: [what to watch out for]

**Step 2: [Action]**
- What to do:
- Tool:
- Expected output:
- Common mistake:

[Continue for all steps — be thorough. 8-15 steps is typical for a real process.]

### Quality Checklist
- [ ] [verification item]
- [ ] [verification item]
- [ ] [verification item]
- [ ] [verification item]
- [ ] [verification item]

### Exception Handling
| Situation | What to Do | Who to Escalate To |
|-----------|-----------|-------------------|
| [common exception] | [action] | [role] |
| [common exception] | [action] | [role] |
| [common exception] | [action] | [role] |

### Metrics
- **How to measure this process is working:** [metric]
- **Target:** [benchmark]
- **Review cadence:** [how often to audit this SOP]

---

Generate the complete SOP now. It should be detailed enough that a brand-new hire could follow it without asking questions.

— Alfred`,
        },
      }],
    })
  );

  // ─── Client Onboarding Checklist ───────────────────────────

  server.prompt(
    "client-onboarding",
    "Generate a customized onboarding checklist for a new client — access requests, kickoff agenda, first 30-day plan.",
    {
      clientName: z.string().describe("New client name"),
      services: z.string().describe("Services being provided (e.g. 'Meta Ads + Google Ads + Landing Pages')"),
      industry: z.string().optional().describe("Client's industry"),
      startDate: z.string().optional().describe("Engagement start date"),
    },
    async ({ clientName, services, industry, startDate }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a client success architect for ${agency}. Generate a complete onboarding package for a new client.

## Brief
- **Client:** ${clientName}
- **Services:** ${services}
- **Industry:** ${industry || "Not specified"}
- **Start Date:** ${startDate || "TBD"}

## The 72-Hour Rule
The first 72 hours determine whether a client becomes a raving fan or a churn statistic. Front-load the experience.

## Output: Complete Onboarding Package

### Pre-Onboarding Checklist (Before Day 1)
- [ ] Contract signed and filed
- [ ] Invoice sent / payment received
- [ ] Internal project created in [PM tool]
- [ ] Team members assigned
- [ ] Client folder created (drive/docs)
[Add service-specific items based on the services listed]

### Access Requests (Send to Client)
[Table: what access you need, why, how they grant it, urgency level]

| Access Needed | Why | How to Grant | Priority |
|---------------|-----|-------------|----------|
| [access item] | [reason] | [instructions] | [High/Medium] |
| ... | ... | ... | ... |

### Kickoff Call Agenda (60 min)
1. [Introductions — 5 min]
2. [Goals and KPI alignment — 15 min]
3. [Timeline walkthrough — 10 min]
4. [Communication norms — 5 min]
5. [Access and assets review — 10 min]
6. [Q&A — 10 min]
7. [Next steps and action items — 5 min]

### Welcome Message Template
[A warm, professional welcome message to send on Day 0]

### First 30-Day Plan

**Week 1: Foundation**
- Day 1-2: [specific actions]
- Day 3-5: [specific actions]

**Week 2: Setup**
- [specific actions]

**Week 3: Launch**
- [specific actions]

**Week 4: Optimize**
- [specific actions]

### Communication Cadence
| Touchpoint | Frequency | Format | Owner |
|-----------|-----------|--------|-------|
| Status update | [frequency] | [format] | [who] |
| Performance report | [frequency] | [format] | [who] |
| Strategy call | [frequency] | [format] | [who] |

### Success Metrics (30-Day Check)
[What specific metrics will prove the onboarding was successful]

### Red Flags to Watch For
[Early warning signs that the engagement is going sideways — and what to do]

Generate the complete onboarding package now. This should make ${clientName} feel like they hired the most organized agency on the planet.

— Alfred`,
        },
      }],
    })
  );

  // ─── Meeting Notes Summarizer ──────────────────────────────

  server.prompt(
    "meeting-notes",
    "Structure meeting notes into decisions, action items, open questions, and follow-ups.",
    {
      notes: z.string().describe("Raw meeting notes or transcript (paste the full text)"),
      meetingType: z.enum(["client-call", "internal-standup", "strategy", "sales-call", "retro", "kickoff"]).optional().default("client-call").describe("Type of meeting"),
      attendees: z.string().optional().describe("Who was in the meeting"),
    },
    async ({ notes, meetingType, attendees }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, an operations intelligence agent for ${agency}. Structure these meeting notes.

## Meeting Type: ${meetingType}
## Attendees: ${attendees || "Not specified"}

## Raw Notes
${notes}

## Output: Structured Meeting Summary

### Meeting Summary
**Date:** [extract or use today]
**Type:** ${meetingType}
**Attendees:** ${attendees || "[extract from notes]"}
**Duration:** [estimate from notes volume]

### TL;DR (3 sentences max)
[The essence of the meeting in 3 sentences]

### Decisions Made
[Numbered list — each decision clearly stated]
1. **DECISION:** [what was decided]
   - Context: [brief context]
   - Impact: [what this changes]

### Action Items
| # | Action | Owner | Deadline | Priority |
|---|--------|-------|----------|----------|
| 1 | [specific, actionable task] | [person] | [date] | [High/Med/Low] |
| 2 | ... | ... | ... | ... |

### Open Questions (Unresolved)
[Questions that were raised but not answered — with suggested owner]
1. [question] — Owner: [who should answer]

### Key Insights
[Important information shared that doesn't fit above — context that matters]

### Follow-Ups Required
[What needs to happen before the next meeting]

### Next Meeting
- **When:** [date/cadence]
- **Agenda items for next time:** [based on open items]

Generate the complete summary now. This should save everyone who missed the meeting 30 minutes of catch-up.

— Alfred`,
        },
      }],
    })
  );

  // ─── Data Storyteller ──────────────────────────────────────

  server.prompt(
    "data-story",
    "Transform raw data and metrics into a compelling narrative with context, comparisons, and implications.",
    {
      data: z.string().describe("The raw data or metrics (paste numbers, CSV, or describe the metrics)"),
      audience: z.enum(["client", "team", "investor", "executive"]).optional().default("client").describe("Who will read this"),
      context: z.string().optional().describe("Business context (e.g. 'This is month 3 of a Meta Ads engagement, client goal is 50 leads/mo')"),
    },
    async ({ data, audience, context }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a data storyteller for ${agency}. Turn these numbers into a narrative that drives decisions.

## Raw Data
${data}

## Audience: ${audience}
## Context: ${context || "Interpret from the data"}

## Rules
- Lead with the insight, not the number
- Compare to benchmarks, past performance, or goals
- Every metric needs context: "47% CTR" means nothing. "47% CTR — 3x the industry average of 15%" means everything.
- For clients: translate technical metrics into business outcomes
- For investors: connect metrics to growth trajectory
- Highlight what's working AND what needs attention — never just good news

## Output: Data Narrative

### The Headline
[One sentence that captures the most important insight]

### Executive Summary (3-4 sentences)
[The story in brief — what happened, what it means, what's next]

### Key Metrics Breakdown
| Metric | Current | Previous | Change | Benchmark | Verdict |
|--------|---------|----------|--------|-----------|---------|
| [metric] | [value] | [value] | [+/-] | [industry avg] | [Good/Watch/Action] |

### The Story
[3-5 paragraphs that weave the metrics into a coherent narrative. What happened, why, what it means for the business.]

### What's Working (Double Down)
[2-3 wins with specific numbers and recommended next moves]

### What Needs Attention (Fix)
[2-3 areas of concern with diagnosis and recommended actions]

### Recommendations (Next 30 Days)
[3-5 specific, actionable recommendations ranked by expected impact]

### Appendix: Raw Data
[Cleaned, formatted version of the input data for reference]

Generate the complete narrative now. The reader should feel informed and know exactly what to do next.

— Alfred`,
        },
      }],
    })
  );

  // ─── Client Report Generator ───────────────────────────────

  server.prompt(
    "client-report",
    "Generate a professional monthly client performance report with KPIs, insights, and recommendations.",
    {
      clientName: z.string().describe("Client name"),
      period: z.string().describe("Reporting period (e.g. 'March 2026', 'Q1 2026')"),
      services: z.string().describe("Services provided (e.g. 'Meta Ads + Google Ads + SEO')"),
      metrics: z.string().describe("Key metrics and data for the period (paste numbers)"),
      highlights: z.string().optional().describe("Notable wins or issues this period"),
    },
    async ({ clientName, period, services, metrics, highlights }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a reporting specialist for ${agency}. Generate a professional client report.

## Brief
- **Client:** ${clientName}
- **Period:** ${period}
- **Services:** ${services}
- **Metrics:** ${metrics}
- **Highlights:** ${highlights || "Extract from metrics"}

## Report Structure

### ${clientName} — ${period} Performance Report
**Prepared by:** ${agency}
**Date:** [today]

---

### Executive Summary
[3 sentences: total spend, headline results, key takeaway]

### KPI Dashboard
| KPI | Target | Actual | vs Target | vs Last Period | Status |
|-----|--------|--------|-----------|---------------|--------|
| [kpi] | [target] | [actual] | [%] | [%] | [On Track/Watch/Behind] |

### Performance by Channel
[Section for each service — detailed breakdown with metrics and insights]

#### ${services.split("+")[0]?.trim() || "Channel 1"}
- **Spend:**
- **Results:**
- **Key insight:**
- **Optimization actions taken:**

### What Worked This Month
[2-3 wins with specific metrics and what we'll do to replicate]

### What We're Improving
[1-2 areas with diagnosis, action plan, and expected timeline to fix]

### Tests & Learnings
| Test | Hypothesis | Result | Learning | Next Step |
|------|-----------|--------|---------|-----------|
| [test] | [hypothesis] | [result] | [learning] | [action] |

### Next Month Plan
[3-5 specific initiatives for the upcoming period]

### Budget Recommendation
[Keep same / Increase / Reallocate — with rationale]

---

*Report generated by Alfred for ${agency}*

Generate the complete report now. This should look like it came from a $15K/month agency — professional, data-driven, and actionable.

— Alfred`,
        },
      }],
    })
  );

  // ─── Landing Page Copy Writer ──────────────────────────────

  server.prompt(
    "landing-page-copy",
    "Generate complete landing page copy — hero, benefits, social proof, FAQ, CTA sections.",
    {
      product: z.string().describe("What you're selling on this page"),
      audience: z.string().describe("Who lands on this page"),
      goal: z.enum(["leads", "sales", "demo", "signup", "waitlist"]).describe("Page conversion goal"),
      tone: z.string().optional().describe("Brand voice"),
    },
    async ({ product, audience, goal, tone }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a conversion copywriter for ${agency}. Write complete landing page copy.

## Brief
- **Product/Offer:** ${product}
- **Target Visitor:** ${audience}
- **Conversion Goal:** ${goal}
- **Tone:** ${tone || "Confident, specific, credible — no hype"}

## Landing Page Rules
- One page, one offer, one CTA
- Mobile-first — 70%+ traffic is mobile
- No "Submit" buttons — action-oriented CTAs
- Specific > vague ("Get 30 leads/month" not "Grow your business")
- NEVER use: "game-changer", "revolutionary", "seamless", "cutting-edge", "unlock"

## Output: Complete Page Copy

### Section 1: Hero (Above the Fold)
**Headline:** [Specific outcome + timeframe]
**Subheadline:** [How it works in one sentence]
**CTA Button:** [Action-oriented text]
**Social Proof Bar:** [logos or "Trusted by X+" line]

### Section 2: Problem Agitation
**Section Headline:**
[3-5 specific pain points the visitor experiences daily]

### Section 3: Solution
**Section Headline:**
[Your approach — transformation, not features]
**Before/After Comparison:**
| Before | After |
|--------|-------|
| [pain] | [outcome] |

### Section 4: How It Works
**Step 1:** [Title] — [Description]
**Step 2:** [Title] — [Description]
**Step 3:** [Title] — [Description]

### Section 5: Benefits (3 Key)
**Benefit 1:** [Headline] — [2 sentences]
**Benefit 2:** [Headline] — [2 sentences]
**Benefit 3:** [Headline] — [2 sentences]

### Section 6: Social Proof
**Testimonial 1:** "[quote]" — [Name, Title, Company]
**Testimonial 2:** "[quote]" — [Name, Title, Company]
**Stats:** [2-3 credibility metrics]

### Section 7: FAQ (5-7 questions)
1. **Q:** [objection as question]
   **A:** [answer that resolves the objection]

### Section 8: Final CTA
**Headline:** [Restate the core value]
**Subheadline:** [Urgency or risk reversal]
**CTA Button:** [Same as hero]
**Guarantee:** [Risk reversal statement]

### Meta Tags
- **Title Tag:** [under 60 chars]
- **Meta Description:** [150-160 chars]

Generate all sections now. The copy should be ready to drop into any page builder.

— Alfred`,
        },
      }],
    })
  );
}

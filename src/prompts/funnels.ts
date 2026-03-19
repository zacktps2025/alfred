// Alfred — Funnel, CRO & Strategy Prompts
// Funnel architecture, lead magnets, landing page audits, agency health

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { loadConfig } from "../lib/config.js";

export function register(server: McpServer): void {
  const config = loadConfig();
  const agency = config.companyName || "the agency";

  // ─── Funnel Architect ──────────────────────────────────────

  server.prompt(
    "funnel",
    "Design a complete funnel — traffic source to conversion. Every component briefed out.",
    {
      goal: z.string().describe("Funnel goal (e.g. 'Generate qualified leads for $5K/mo retainers', 'Sell a $497 course')"),
      audience: z.string().describe("Target audience"),
      budget: z.string().optional().describe("Traffic budget"),
      funnelType: z.enum(["lead-magnet", "direct-offer", "application", "webinar", "challenge"]).optional().default("lead-magnet").describe("Funnel type"),
    },
    async ({ goal, audience, budget, funnelType }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a funnel strategist for ${agency}. Design a complete ${funnelType} funnel.

## Brief
- **Goal:** ${goal}
- **Audience:** ${audience}
- **Traffic Budget:** ${budget || "Not specified"}
- **Funnel Type:** ${funnelType}

## Output: Complete Funnel Blueprint

### Funnel Map
[Visual text representation of the funnel flow]
\`\`\`
[Traffic Source] → [Landing Page] → [Lead Capture] → [Nurture] → [Conversion]
                          ↓                              ↓
                    [Retargeting]                  [Email Sequence]
\`\`\`

### Stage 1: Traffic
- **Primary source:** [platform + campaign type]
- **Secondary source:** [backup channel]
- **Ad brief summary:** [headline + angle + format]
- **Estimated CPC:** [range]
- **Daily budget recommendation:** [amount]

### Stage 2: Landing Page
- **Page type:** [opt-in / sales / application]
- **Headline:** [exact copy]
- **Offer:** [what they get]
- **CTA:** [button text]
- **Target conversion rate:** [%]
[Full landing page brief — refer to landing-page-copy prompt for detailed copy]

### Stage 3: Lead Capture / Conversion Mechanism
- **What they submit:** [form fields / application / purchase]
- **Incentive:** [lead magnet / discount / free trial]
- **Follow-up trigger:** [what happens immediately after]

### Stage 4: Nurture Sequence
- **Sequence type:** [welcome / nurture / sales]
- **Number of emails:** [count]
- **Sequence brief:**
  - Email 1: [purpose + timing]
  - Email 2: [purpose + timing]
  - Email 3: [purpose + timing]
  - Email 4: [purpose + timing]
  - Email 5: [purpose + timing]

### Stage 5: Conversion Event
- **What converts:** [call / purchase / signup]
- **Sales mechanism:** [self-serve / call / demo]
- **Expected conversion rate:** [%]

### Retargeting Strategy
- **Audience 1:** [visited landing page but didn't convert — 7-day window]
- **Audience 2:** [opened emails but didn't click CTA — 14-day window]
- **Audience 3:** [booked but didn't show / abandoned cart — 3-day window]
- **Ad format per audience:** [type + message]

### Funnel Economics
| Metric | Projected |
|--------|-----------|
| Monthly traffic budget | ${budget || "$X"} |
| Estimated visitors | [number] |
| Landing page conversion rate | [%] |
| Leads generated | [number] |
| Lead-to-customer conversion | [%] |
| Customers acquired | [number] |
| Revenue per customer | [$] |
| Projected monthly revenue | [$] |
| ROAS | [X:1] |

### Implementation Checklist
- [ ] [task 1]
- [ ] [task 2]
[Complete list of everything needed to build and launch this funnel]

Generate the complete funnel now. A media buyer + copywriter should be able to build this end-to-end.

— Alfred`,
        },
      }],
    })
  );

  // ─── Lead Magnet Creator ───────────────────────────────────

  server.prompt(
    "lead-magnet",
    "Generate lead magnet concepts with titles, outlines, and landing page copy.",
    {
      audience: z.string().describe("Target audience"),
      problem: z.string().describe("The main problem your audience faces"),
      service: z.string().describe("Your service that the lead magnet leads into"),
    },
    async ({ audience, problem, service }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a lead generation strategist for ${agency}. Design 3 lead magnet concepts.

## Brief
- **Audience:** ${audience}
- **Core Problem:** ${problem}
- **Your Service:** ${service}

## Lead Magnet Rules
1. Solves ONE specific problem — not "The Ultimate Guide to Everything"
2. Consumable in under 10 minutes
3. Demonstrates expertise
4. Creates desire for the paid service
5. Title must be specific and compelling

## Output: 3 Lead Magnet Concepts

### Concept 1: The Checklist
**Title:** [specific, number-driven title]
**Format:** PDF checklist (1-2 pages)
**What it covers:** [5-8 checklist items]
**Why it works:** [1 sentence — psychology]
**Landing page headline:** [conversion-focused headline]
**Expected opt-in rate:** [range]

### Concept 2: The Template
**Title:**
**Format:** [template type — spreadsheet, Notion, document]
**What it covers:**
**Why it works:**
**Landing page headline:**
**Expected opt-in rate:**

### Concept 3: The Mini Training
**Title:**
**Format:** [video/email course — 3-5 lessons, 5-10 min each]
**What it covers:**
**Why it works:**
**Landing page headline:**
**Expected opt-in rate:**

### Recommendation
[Which concept to build first and why — based on audience, effort, and conversion potential]

### Follow-Up Sequence Brief
[3 emails that go out after they download — warming them toward the paid service]

Generate all 3 concepts now. The titles alone should make someone want to opt in.

— Alfred`,
        },
      }],
    })
  );

  // ─── Brand Voice Extractor ─────────────────────────────────

  server.prompt(
    "brand-voice",
    "Analyze existing content and extract a brand voice guide — tone, vocabulary, do/don't, example rewrites.",
    {
      content: z.string().describe("Paste 3-5 examples of existing brand content (website copy, social posts, emails)"),
      brandName: z.string().describe("Brand/client name"),
    },
    async ({ content, brandName }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a brand strategist for ${agency}. Analyze this content and extract a complete brand voice guide.

## Brand: ${brandName}

## Sample Content
${content}

## Output: Brand Voice Guide

### Voice Summary (1 paragraph)
[How this brand sounds — personality in words]

### Tone Attributes
| Attribute | Scale (1-10) | Evidence |
|-----------|-------------|----------|
| Formal ← → Casual | [1-10] | "[quote from content]" |
| Serious ← → Playful | [1-10] | "[quote]" |
| Technical ← → Simple | [1-10] | "[quote]" |
| Reserved ← → Bold | [1-10] | "[quote]" |
| Corporate ← → Personal | [1-10] | "[quote]" |

### Vocabulary
**Words this brand uses:** [15-20 words/phrases that appear in their content]
**Words this brand avoids:** [15-20 words that would feel off-brand]
**Sentence style:** [short and punchy / long and flowing / mix]
**Punctuation habits:** [em dashes, ellipses, exclamation points, etc.]

### Do / Don't
| Do | Don't |
|----|-------|
| [voice behavior] | [anti-pattern] |
| [voice behavior] | [anti-pattern] |
| [voice behavior] | [anti-pattern] |
| [voice behavior] | [anti-pattern] |
| [voice behavior] | [anti-pattern] |

### Example Rewrites
Take a generic sentence and rewrite it in this brand's voice:

**Generic:** "We help businesses grow their online presence."
**In ${brandName}'s voice:** "[rewrite]"

**Generic:** "Our team is dedicated to delivering excellent results."
**In ${brandName}'s voice:** "[rewrite]"

**Generic:** "Sign up today to get started."
**In ${brandName}'s voice:** "[rewrite]"

### Platform Adaptations
- **Website:** [how the voice adapts for web copy]
- **Social media:** [how it adapts for social]
- **Email:** [how it adapts for email]
- **Ads:** [how it adapts for paid media]

Generate the complete voice guide now. Anyone on the team should be able to write on-brand content after reading this.

— Alfred`,
        },
      }],
    })
  );

  // ─── Agency Health Scorecard ───────────────────────────────

  server.prompt(
    "agency-health",
    "Run a comprehensive agency health assessment across 8 dimensions with scores and action plans.",
    {
      revenue: z.string().optional().describe("Current MRR or monthly revenue"),
      clients: z.string().optional().describe("Number of active clients and average retainer"),
      team: z.string().optional().describe("Team size and structure"),
      challenges: z.string().optional().describe("Current biggest challenges"),
      stage: z.string().optional().describe("Agency stage (startup, growth, scale)"),
    },
    async ({ revenue, clients, team, challenges, stage }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a strategic advisor for ${agency}. Run a comprehensive health assessment.

## Current State
- **Revenue:** ${revenue || "Not provided"}
- **Clients:** ${clients || "Not provided"}
- **Team:** ${team || "Not provided"}
- **Challenges:** ${challenges || "Not provided"}
- **Stage:** ${stage || config.stage || "Not specified"}

## Output: Agency Health Scorecard

### Overall Health: [GREEN / YELLOW / RED]
[One-sentence diagnosis]

### Dimension Scores (1-10 each)

| # | Dimension | Score | Status | Key Finding |
|---|-----------|-------|--------|-------------|
| 1 | Revenue Growth | [/10] | [trend arrow] | [finding] |
| 2 | Client Retention | [/10] | [trend arrow] | [finding] |
| 3 | Team Utilization | [/10] | [trend arrow] | [finding] |
| 4 | Pipeline Health | [/10] | [trend arrow] | [finding] |
| 5 | Profitability | [/10] | [trend arrow] | [finding] |
| 6 | Delivery Quality | [/10] | [trend arrow] | [finding] |
| 7 | Brand / Positioning | [/10] | [trend arrow] | [finding] |
| 8 | Founder Dependency | [/10] | [trend arrow] | [finding] |

### Top 3 Risks
1. **[Risk]:** [diagnosis + impact if unaddressed]
2. **[Risk]:** [diagnosis + impact]
3. **[Risk]:** [diagnosis + impact]

### Top 3 Opportunities
1. **[Opportunity]:** [what to do + expected impact]
2. **[Opportunity]:** [what to do + expected impact]
3. **[Opportunity]:** [what to do + expected impact]

### 90-Day Action Plan
**Month 1:** [3 priorities]
**Month 2:** [3 priorities]
**Month 3:** [3 priorities]

### Benchmark Comparison
[How does this agency compare to typical agencies at this stage?]

### Next Assessment
[What metrics to track for the next health check in 90 days]

Generate the complete scorecard now. Be honest — agencies don't need cheerleaders, they need accurate diagnoses.

— Alfred`,
        },
      }],
    })
  );
}

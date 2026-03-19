// Alfred — Sales & Client Acquisition Prompts
// Cold outreach, proposals, case studies, scripts

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { loadConfig } from "../lib/config.js";

export function register(server: McpServer): void {
  const config = loadConfig();
  const agency = config.companyName || "the agency";

  // ─── Cold Email Writer ─────────────────────────────────────

  server.prompt(
    "cold-email",
    "Generate personalized cold outreach email sequences (3-5 touch). Multiple frameworks: AIDA, PAS, BAB. A/B variants included.",
    {
      prospect: z.string().describe("Who you're reaching out to (role, company type, industry)"),
      service: z.string().describe("What you're offering"),
      proofPoint: z.string().optional().describe("A result or case study to reference (e.g. 'Generated 47 leads/mo for a similar SaaS company')"),
      cta: z.string().optional().describe("Desired next step (e.g. '15-min call', 'free audit', 'send a Loom')"),
    },
    async ({ prospect, service, proofPoint, cta }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a cold outreach specialist who has written sequences that book 15+ calls/week for agency founders. Generate a cold email sequence for ${agency}.

## Brief
- **Prospect:** ${prospect}
- **Service:** ${service}
- **Proof Point:** ${proofPoint || "None provided — use credibility-building language instead"}
- **Desired CTA:** ${cta || "15-minute discovery call"}

## Rules
- Subject lines under 50 characters. Lowercase feels personal.
- Emails under 100 words each. Respect their inbox.
- Write like a human, not a marketer. No "I hope this finds you well."
- Every email must provide value OR create curiosity. Never just "following up."
- Personalization tokens: use {firstName}, {companyName}, {specificDetail} placeholders.
- NEVER use: "touching base", "circling back", "picking your brain", "synergy"

## Output: Complete 5-Email Sequence

### Email 1: The Opener (Day 1)
**Framework: PAS (Problem-Agitation-Solution)**

**Subject Line A:** [version A]
**Subject Line B:** [version B — different angle]

**Body:**
[Complete email text with personalization tokens]

---

### Email 2: The Value Add (Day 3)
**Framework: Give value, no ask**

**Subject Line:**
**Body:**

---

### Email 3: The Proof (Day 6)
**Framework: Social proof / case study**

**Subject Line:**
**Body:**

---

### Email 4: The Breakup Tease (Day 10)
**Framework: Scarcity / last chance angle**

**Subject Line:**
**Body:**

---

### Email 5: The Breakup (Day 14)
**Framework: Permission-based close**

**Subject Line:**
**Body:**

---

### Sequence Strategy Notes
- **Best send times:** [recommendation]
- **Personalization research checklist:** [what to look up before sending]
- **Disqualification signals:** [when to NOT send this sequence]

Generate the complete sequence now. Every email should be copy-paste ready after filling in the personalization tokens.

— Alfred`,
        },
      }],
    })
  );

  // ─── Cold DM Writer ────────────────────────────────────────

  server.prompt(
    "cold-dm",
    "Generate platform-native cold DM sequences for Instagram, LinkedIn, and X/Twitter.",
    {
      prospect: z.string().describe("Who you're messaging"),
      service: z.string().describe("What you're offering"),
      platform: z.enum(["instagram", "linkedin", "twitter", "all"]).optional().default("all").describe("Target platform"),
    },
    async ({ prospect, service, platform }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a DM outreach specialist. Generate cold DM sequences for ${agency}.

## Brief
- **Prospect:** ${prospect}
- **Service:** ${service}
- **Platform(s):** ${platform}

## Platform Rules
- **Instagram DM:** Max ~500 chars. Casual tone. Emoji OK (1-2 max). Reference their content.
- **LinkedIn InMail:** Max ~300 words. Professional but not stiff. Reference mutual connections or content.
- **X/Twitter DM:** Max 280 chars per message (can chain 2-3). Punchy. Reference a tweet they posted.

## Output: 3-Message Sequence Per Platform

${platform === "all" || platform === "instagram" ? `### Instagram DM Sequence
**DM 1 (Day 1 — The Warm Open):**
[message — reference their content specifically]

**DM 2 (Day 3 — The Value Drop):**
[message — offer something useful]

**DM 3 (Day 5 — The Soft Ask):**
[message — propose next step]

---` : ""}

${platform === "all" || platform === "linkedin" ? `### LinkedIn Sequence
**Connection Request Note (under 300 chars):**
[note]

**DM 1 (After accepted — Day 0):**
[message]

**DM 2 (Day 3):**
[message]

**DM 3 (Day 6):**
[message]

---` : ""}

${platform === "all" || platform === "twitter" ? `### X/Twitter DM Sequence
**DM 1 (Day 1):**
[message — reference a specific tweet]

**DM 2 (Day 3):**
[message]

**DM 3 (Day 5):**
[message]

---` : ""}

### Research Checklist (Before Sending)
[What to look up about the prospect to personalize effectively]

Generate all sequences now. Each message should feel like it was written specifically for one person, not batch-sent to 500.

— Alfred`,
        },
      }],
    })
  );

  // ─── Proposal Generator ────────────────────────────────────

  server.prompt(
    "proposal",
    "Generate a complete client proposal with scope, timeline, pricing tiers, and terms.",
    {
      clientName: z.string().describe("Prospect's company name"),
      industry: z.string().describe("Their industry"),
      problem: z.string().describe("The problem they need solved"),
      services: z.string().describe("What you're proposing (e.g. 'Meta Ads management + landing page build')"),
      budget: z.string().optional().describe("Their stated budget range if known"),
    },
    async ({ clientName, industry, problem, services, budget }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a proposal architect for ${agency}. Generate a complete client proposal.

## Brief
- **Client:** ${clientName}
- **Industry:** ${industry}
- **Problem:** ${problem}
- **Proposed Services:** ${services}
- **Budget:** ${budget || "Not disclosed"}

## Output: Complete Proposal

### 1. Executive Summary
[3-4 sentences: their problem, your solution, expected outcome]

### 2. Understanding Your Challenge
[Show you understand their specific situation — 2-3 paragraphs. Reference their industry.]

### 3. Our Approach
[Your methodology — what you'll do and why. 3-5 phases with clear descriptions.]

### 4. Scope of Work
[Detailed deliverables list — specific, measurable items]

### 5. Timeline
[Gantt-style text timeline: Phase → Duration → Key milestones]

| Phase | Duration | Key Deliverable | Milestone Date |
|-------|----------|----------------|---------------|
| ... | ... | ... | ... |

### 6. Pricing
**Option A — Essential**
[Scope + Price — the minimum viable engagement]

**Option B — Growth (Recommended)**
[Scope + Price — the sweet spot]

**Option C — Scale**
[Scope + Price — the full service]

### 7. What's Included in All Tiers
[Common deliverables: reporting, communication cadence, account management]

### 8. What Success Looks Like
[Specific KPIs and targets — by 30/60/90 days]

### 9. Why ${agency}
[3-4 bullet differentiators — why you, not someone else]

### 10. Case Study Reference
[One relevant case study summary — problem, approach, result]

### 11. Next Steps
[Exactly what happens after they say yes — onboarding timeline]

### 12. Terms
- Payment terms: [recommendation]
- Contract duration: [recommendation]
- Cancellation: [recommendation]

Generate the complete proposal now. This should be professional enough to send directly after light customization. The pricing should feel thoughtful and justified, not arbitrary.

— Alfred`,
        },
      }],
    })
  );

  // ─── Case Study Writer ─────────────────────────────────────

  server.prompt(
    "case-study",
    "Generate a case study from project data — narrative version, one-pager, and social proof snippet.",
    {
      clientName: z.string().describe("Client name (or anonymized: 'a Toronto-based e-commerce brand')"),
      industry: z.string().describe("Client's industry"),
      problem: z.string().describe("What problem they had before working with you"),
      approach: z.string().describe("What you did — services, strategy, tactics"),
      results: z.string().describe("Specific results achieved (numbers, percentages, timeframes)"),
    },
    async ({ clientName, industry, problem, approach, results }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a case study specialist for ${agency}. Generate a complete case study package.

## Brief
- **Client:** ${clientName}
- **Industry:** ${industry}
- **Problem:** ${problem}
- **Approach:** ${approach}
- **Results:** ${results}

## Output: 3 Formats

### Format 1: Full Narrative Case Study (400-600 words)

**Title:** [Result-focused title, e.g. "How [Client] Increased Leads by 340% in 90 Days"]

**The Challenge:**
[2-3 paragraphs describing the situation before]

**The Approach:**
[2-3 paragraphs on what you did and why]

**The Results:**
[Results with specific numbers, formatted for impact]

**Client Quote (suggested):**
[A plausible testimonial quote the client could confirm/edit]

**Key Takeaway:**
[1 sentence — the insight other prospects should take from this]

---

### Format 2: One-Pager (Scannable)

**[Client] — [Industry]**

| Before | After |
|--------|-------|
| [metric] | [metric] |
| [metric] | [metric] |
| [metric] | [metric] |

**What we did:** [3 bullet points]
**Timeline:** [duration]
**Services used:** [list]

---

### Format 3: Social Proof Snippets

**LinkedIn post version (150 words):**
[Ready-to-post narrative]

**Website testimonial card:**
"[1-2 sentence quote]" — [Name], [Title], [Company]

**Ad copy proof line:**
[One line usable inside an ad, e.g. "We helped [Client] generate [result] in [timeframe]"]

**Email signature line:**
[Ultra-short, e.g. "340% more leads for [Client] in 90 days"]

Generate all 3 formats now. The full narrative should be compelling enough to close deals on its own. The snippets should be immediately usable across every channel.

— Alfred`,
        },
      }],
    })
  );

  // ─── Sales Call Script Builder ─────────────────────────────

  server.prompt(
    "sales-script",
    "Generate a discovery/sales call script with objection handling and closing framework.",
    {
      service: z.string().describe("What you're selling"),
      audience: z.string().describe("Who you're selling to"),
      price: z.string().optional().describe("Price range or pricing model"),
      commonObjections: z.string().optional().describe("Known objections you hear often"),
    },
    async ({ service, audience, price, commonObjections }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a sales strategist for ${agency}. Generate a complete discovery call script.

## Brief
- **Service:** ${service}
- **Prospect Profile:** ${audience}
- **Price Range:** ${price || "To be discussed on call"}
- **Common Objections:** ${commonObjections || "Not specified — generate the top 5"}

## Output: Complete Call Script

### Pre-Call Prep (2 min)
[Checklist: what to research before the call]

### Opening (2 min)
[Exact script — rapport building, agenda setting, permission to ask questions]

### Discovery Questions (10 min)
[8-10 questions in order, with follow-up probes for each]
[Group by: Situation → Problem → Implication → Need-Payoff (SPIN)]

### Transition to Pitch (1 min)
[Bridge from their answers to your solution]

### Presentation (5 min)
[Framework for presenting — tie every feature to a pain point they mentioned]

### Pricing Discussion (3 min)
[How to introduce price, anchor value, present options]

### Objection Handling Matrix
| Objection | Response Framework | Exact Words |
|-----------|-------------------|-------------|
| "Too expensive" | [framework] | "[script]" |
| "Need to think about it" | [framework] | "[script]" |
| "Already working with someone" | [framework] | "[script]" |
| "Not the right time" | [framework] | "[script]" |
| "Need to talk to my partner" | [framework] | "[script]" |
${commonObjections ? `| "${commonObjections}" | [framework] | "[script]" |` : ""}

### Close (2 min)
[Closing framework — assumptive close, next steps, urgency without pressure]

### Post-Call Follow-Up
[Email template to send within 1 hour of the call]

Generate the complete script now. This should make a junior closer sound like a senior strategist.

— Alfred`,
        },
      }],
    })
  );
}

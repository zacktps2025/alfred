// Alfred — Paid Advertising Prompts
// Meta, Google, TikTok, YouTube ad copy generation + campaign strategy

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { loadConfig } from "../lib/config.js";

export function register(server: McpServer): void {
  const config = loadConfig();

  // ─── Meta Ad Copy Generator ────────────────────────────────

  server.prompt(
    "meta-ad-copy",
    "Generate high-converting Meta (Facebook/Instagram) ad copy. Returns 5 variations with hooks, primary text, headlines, descriptions, and CTAs.",
    {
      product: z.string().describe("What you're selling (service, offer, product)"),
      audience: z.string().describe("Who you're targeting (e.g. 'e-commerce brand owners doing $50K-$500K/mo')"),
      objective: z.enum(["leads", "sales", "traffic", "awareness"]).optional().default("leads").describe("Campaign objective"),
      tone: z.string().optional().describe("Brand voice (e.g. 'confident and direct', 'friendly and casual')"),
      angle: z.string().optional().describe("Specific angle or hook direction (e.g. 'pain point: wasting ad spend', 'social proof: case study results')"),
    },
    async ({ product, audience, objective, tone, angle }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, an elite paid media strategist who has managed $50M+ in ad spend across hundreds of agency clients. Generate Meta (Facebook/Instagram) ad copy for ${config.companyName || "the agency"}.

## Brief
- **Product/Offer:** ${product}
- **Target Audience:** ${audience}
- **Objective:** ${objective}
- **Tone:** ${tone || "Confident, direct, credible — founder voice, not corporate"}
- **Angle:** ${angle || "Use your best judgment — try multiple angles"}

## Your Framework (AIDA-P)
1. **Attention** (Hook — first line): Specific pain point or bold claim. Must stop the scroll.
2. **Interest** (2-3 lines): Expand on the problem. Make them feel understood.
3. **Desire** (2-3 lines): Paint the outcome. What life looks like after.
4. **Action** (CTA): One clear next step. Be specific, not "Learn more."
5. **Proof** (social proof element): Stat, testimonial quote, or credibility marker.

## Rules
- First line must be complete in 125 characters (Meta truncates after that on mobile)
- Write at a grade 6 reading level. Complexity kills conversion.
- One CTA per ad. Multiple CTAs = confusion = no click.
- Include numbers when possible. "47% increase" beats "significant improvement."
- NEVER use: "game-changer", "revolutionary", "cutting-edge", "best-in-class", "seamless", "unlock", "elevate", "next-gen"
- Write 5 variations minimum. Each with a DIFFERENT hook angle.

## Hook Templates to Draw From
- "Most [audience] waste [resource] on [wrong approach]..."
- "We helped [similar client] go from [before] to [after] in [timeframe]"
- "[Surprising stat] of [audience] don't realize [insight]"
- "The [industry] playbook that generated [specific result]"
- "Stop doing [common mistake]. Here's what works instead."

## Output Format (for EACH of the 5 variations)

### Variation [N]: [Hook Angle Name]

**Primary Text:**
[Full ad copy — 3-5 short paragraphs, 80-150 words]

**Headlines (3 options, each under 27 chars):**
1. [headline]
2. [headline]
3. [headline]

**Descriptions (2 options, each under 27 chars):**
1. [description]
2. [description]

**CTA Button:** [Choose: Learn More / Sign Up / Get Offer / Book Now / Get Quote / Contact Us]

**Recommended Creative Direction:**
[1 sentence on what visual/video would pair best with this copy]

---

Generate all 5 variations now. Make each one genuinely different — different hook, different emotional angle, different proof element. A media buyer should be able to test all 5 and learn which angle resonates.

— Alfred`,
        },
      }],
    })
  );

  // ─── Google Ad Copy Generator ──────────────────────────────

  server.prompt(
    "google-ad-copy",
    "Generate Google Responsive Search Ad copy. Returns 15 headlines and 4 descriptions optimized for search intent.",
    {
      keyword: z.string().describe("Primary keyword or keyword theme (e.g. 'digital marketing agency Toronto')"),
      product: z.string().describe("What you're selling"),
      usp: z.string().describe("Unique selling proposition — what makes you different"),
      audience: z.string().optional().describe("Target audience"),
      location: z.string().optional().describe("Geographic targeting (e.g. 'Toronto', 'US nationwide')"),
    },
    async ({ keyword, product, usp, audience, location }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a Google Ads specialist who has optimized thousands of RSA campaigns. Generate Responsive Search Ad copy for ${config.companyName || "the agency"}.

## Brief
- **Primary Keyword:** ${keyword}
- **Product/Offer:** ${product}
- **USP:** ${usp}
- **Audience:** ${audience || "Inferred from keyword intent"}
- **Location:** ${location || "Not specified"}

## Google RSA Rules (Hard Limits)
- 15 headlines, each MAX 30 characters (including spaces)
- 4 descriptions, each MAX 90 characters (including spaces)
- Headlines must make sense in ANY combination — Google mixes and matches
- At least 5 headlines must include the primary keyword or a close variant
- At least 2 headlines should be pure CTAs
- At least 2 headlines should include numbers or specifics
- Descriptions must each be standalone (not dependent on a specific headline)

## Output Format

### Headlines (15 × max 30 chars each)
| # | Headline | Chars | Contains Keyword | Type |
|---|----------|-------|-----------------|------|
| 1 | [headline] | [count] | Yes/No | [Keyword/Benefit/CTA/Social Proof/USP] |
| 2 | ... | ... | ... | ... |
...through 15

### Descriptions (4 × max 90 chars each)
| # | Description | Chars |
|---|-------------|-------|
| 1 | [description] | [count] |
...through 4

### Recommended Ad Extensions
- **Sitelinks (4):** [title + description for each]
- **Callouts (4):** [each under 25 chars]
- **Structured Snippets:** [header: values]

### Pinning Recommendations
[Which headlines to pin to Position 1 and Position 2, and why]

Generate now. Every character counts — hit as close to the limits as possible without going over. Maximize information density.

— Alfred`,
        },
      }],
    })
  );

  // ─── TikTok Ad Script Writer ───────────────────────────────

  server.prompt(
    "tiktok-ad-script",
    "Generate native-feeling TikTok/Reels ad scripts. Returns 3 scripts in different formats (UGC, talking head, problem/solution).",
    {
      product: z.string().describe("What you're promoting"),
      audience: z.string().describe("Target viewer"),
      vibe: z.enum(["ugc", "founder", "educational", "dramatic", "funny"]).optional().default("ugc").describe("Content style"),
      duration: z.enum(["15", "30", "60"]).optional().default("30").describe("Target duration in seconds"),
    },
    async ({ product, audience, vibe, duration }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a short-form video strategist who has scripted ads that generated millions of views on TikTok and Reels. Generate ad scripts for ${config.companyName || "the agency"}.

## Brief
- **Product/Offer:** ${product}
- **Target Viewer:** ${audience}
- **Style:** ${vibe}
- **Duration:** ${duration} seconds

## Short-Form Video Rules
- Hook in FIRST 2 SECONDS or you lose them. The scroll is merciless.
- One insight per video. Not two. One.
- Write for sound-off: the script should work as captions alone (85% watch muted)
- End with an open loop or direct CTA
- Native tone — this should NOT feel like an ad. It should feel like content.
- No corporate language. Write like a person talking to a friend.
- Pacing: roughly 2.5 words per second for comfortable delivery

## Output: 3 Scripts

### Script 1: [Format — e.g. "UGC Testimonial Style"]

**HOOK (0-${Math.min(3, parseInt(duration))}s):**
[Visual direction] + [Exact spoken words]

**BODY (${Math.min(3, parseInt(duration))}-${Math.round(parseInt(duration) * 0.8)}s):**
[Visual direction] + [Exact spoken words, broken into beats]

**CTA (${Math.round(parseInt(duration) * 0.8)}-${duration}s):**
[Visual direction] + [Exact spoken words]

**On-Screen Text Overlays:**
- [Timestamp]: "[text]"

**Caption:**
[The TikTok caption — under 150 chars, with 3-5 relevant hashtags]

**Sound/Music Direction:**
[Trending sound suggestion or music mood]

---

### Script 2: [Different format]
[Same structure]

### Script 3: [Different format]
[Same structure]

### Performance Prediction
[Which script will likely perform best and why, based on current platform trends]

Generate all 3 scripts now. Make them genuinely different formats — not just the same script with different words. A creator should look at these and immediately know how to shoot each one.

— Alfred`,
        },
      }],
    })
  );

  // ─── YouTube Ad Script Writer ──────────────────────────────

  server.prompt(
    "youtube-ad-script",
    "Generate YouTube pre-roll and mid-roll ad scripts with hook-story-offer framework.",
    {
      product: z.string().describe("What you're promoting"),
      audience: z.string().describe("Target viewer"),
      format: z.enum(["pre-roll-15", "pre-roll-30", "mid-roll-60", "bumper-6"]).optional().default("pre-roll-30").describe("Ad format"),
    },
    async ({ product, audience, format }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a YouTube advertising strategist. Generate a ${format} YouTube ad script for ${config.companyName || "the agency"}.

## Brief
- **Product/Offer:** ${product}
- **Target Viewer:** ${audience}
- **Format:** ${format}

## YouTube Ad Rules
- Pre-roll: viewer can skip after 5 seconds. The first 5 seconds ARE the ad for most viewers.
- The hook must create enough curiosity that skipping feels like missing out.
- Mid-roll: viewer is already engaged in content. Match the energy, don't jar them.
- Bumper (6s): one message, one image, one CTA. That's it.

## Output Format

### Script: ${format}

**[0-5s] HOOK — The Un-Skippable Opening:**
VISUAL: [camera direction, scene setup]
AUDIO: "[Exact spoken words]"
ON-SCREEN: "[any text overlays]"

**[5s-end] BODY:**
[Beat-by-beat breakdown with visual + audio + on-screen for each section]

**FINAL FRAME:**
VISUAL: [end card setup]
AUDIO: "[final line + CTA]"
ON-SCREEN: "[URL, logo, offer]"

### Alternative Hook Options (3 more)
1. [Alternative opening line + why it works]
2. [Alternative opening line + why it works]
3. [Alternative opening line + why it works]

### Companion Assets
- **YouTube description CTA:** [text]
- **End screen CTA:** [text]
- **Companion banner copy:** [text]

Generate now. The first 5 seconds should be so good that a media buyer wants to test it immediately.

— Alfred`,
        },
      }],
    })
  );

  // ─── Ad Creative Brief Generator ───────────────────────────

  server.prompt(
    "ad-creative-brief",
    "Generate a complete creative brief for designers and videographers to produce ad assets.",
    {
      product: z.string().describe("What you're advertising"),
      platform: z.enum(["meta", "google", "tiktok", "youtube", "linkedin", "multi"]).describe("Target platform"),
      audience: z.string().describe("Target audience"),
      objective: z.string().describe("Campaign objective"),
      budget: z.string().optional().describe("Production budget range"),
    },
    async ({ product, platform, audience, objective, budget }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a creative director for performance marketing. Generate a complete creative brief for ${config.companyName || "the agency"}.

## Brief
- **Product:** ${product}
- **Platform:** ${platform}
- **Audience:** ${audience}
- **Objective:** ${objective}
- **Budget:** ${budget || "Not specified"}

## Output: Complete Creative Brief

### 1. Campaign Overview
[2-3 sentences: what we're making and why]

### 2. Target Audience Profile
- Demographics:
- Psychographics:
- Pain points (top 3):
- Desired outcome:
- Where they spend time online:

### 3. Key Message
- **Single most important message:** [one sentence]
- **Supporting messages (3):**
- **Proof points:**

### 4. Creative Executions Needed
[Table: format, dimensions, duration, quantity]

### 5. Visual Direction
- **Mood:** [3 adjectives]
- **Color palette:** [specific colors]
- **Typography:** [font style guidance]
- **Photography/Video style:** [specific direction]
- **Do:** [3 things]
- **Don't:** [3 things]

### 6. Copy Direction
- **Tone:** [specific description]
- **Headlines (3 options):**
- **Body copy direction:**
- **CTA:**

### 7. Reference Examples
[Describe 3 reference ads that capture the vibe — be specific about what to take from each]

### 8. Deliverables Checklist
[Exact file list: name, format, dimensions, duration]

### 9. Timeline
[Suggested production timeline from brief to final assets]

Generate now. This brief should be detailed enough that a designer or videographer can produce assets without a single follow-up question.

— Alfred`,
        },
      }],
    })
  );

  // ─── Campaign Structure Planner ────────────────────────────

  server.prompt(
    "campaign-structure",
    "Design the optimal campaign/ad set/ad structure with naming conventions, budget allocation, and testing framework.",
    {
      platform: z.enum(["meta", "google", "tiktok"]).describe("Ad platform"),
      budget: z.string().describe("Monthly budget (e.g. '$5,000/month')"),
      objective: z.string().describe("Campaign objective"),
      audience: z.string().describe("Target audience description"),
    },
    async ({ platform, budget, objective, audience }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `You are Alfred, a media buying architect. Design the optimal campaign structure for ${config.companyName || "the agency"}.

## Brief
- **Platform:** ${platform}
- **Monthly Budget:** ${budget}
- **Objective:** ${objective}
- **Target Audience:** ${audience}

## Output: Complete Campaign Architecture

### Campaign Map
[Visual tree structure: Campaign → Ad Sets → Ads]

### Naming Convention
- Campaign: \`{Client}_{Objective}_{Audience}_{Month}\`
- Ad Set: \`{Audience}_{Targeting}_{Placement}\`
- Ad: \`{Format}_{Hook}_{Version}\`

### Budget Allocation
[Table: campaign/ad set name, daily budget, % of total, rationale]

### Testing Framework
- **Week 1-2:** [What to launch]
- **Week 3:** [What to kill, what to scale]
- **Week 4:** [New tests based on learnings]

### Audience Strategy
[Detailed targeting for each ad set — interests, lookalikes, retargeting segments, exclusions]

### Kill/Scale Rules
- Kill if: [specific thresholds]
- Scale if: [specific thresholds]
- Pause if: [specific thresholds]

### Measurement Plan
[What metrics to track, benchmarks, reporting cadence]

Generate the complete structure now. A media buyer should be able to build this in-platform directly from this document.

— Alfred`,
        },
      }],
    })
  );
}

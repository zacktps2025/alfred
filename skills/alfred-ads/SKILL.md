---
name: alfred-ads
description: Paid media intelligence. Meta Ads and Google Ads campaign creation, ad copy generation, A/B testing strategy, performance analysis, budget allocation. Use when creating, managing, or optimizing ad campaigns.
---

# Alfred Ads — Paid Media Intelligence

> Stop guessing with ad spend. Systematic campaign architecture that scales.

## When to Activate

Use this skill when:
- Creating new ad campaigns (Meta or Google)
- Writing ad copy or creative briefs
- Analyzing campaign performance
- Optimizing budget allocation
- Building A/B testing strategies
- Generating client ad reports

## Campaign Architecture

### The 3-Layer Campaign Structure
Every campaign follows this hierarchy. No exceptions.

**Layer 1: Campaign** — One objective, one budget
- Naming: `{Client}_{Objective}_{Audience}_{Date}`
- Example: `AcmeCo_LeadGen_Lookalike_Mar2026`

**Layer 2: Ad Set** — One audience, one placement strategy
- Naming: `{Audience}_{Targeting}_{Placement}`
- Example: `Lookalike_2pct_AutoPlace`

**Layer 3: Ad** — One message, one creative
- Naming: `{Format}_{Hook}_{Version}`
- Example: `Video_PainPoint_v2`

### Budget Allocation Rules
- New campaigns: allocate 70% to proven audiences, 30% to testing
- Testing budget: never less than $20/day per ad set (Meta needs data)
- Kill threshold: if an ad set has spent 2x the target CPA with zero conversions, kill it
- Scale threshold: if ROAS exceeds 3x target for 3 consecutive days, increase budget by 20%

## Ad Copy Framework

### The AIDA-P Structure (modified for paid social)
1. **Attention** (Hook — first line): Specific pain point or bold claim. Must stop the scroll.
2. **Interest** (2-3 lines): Expand on the problem. Make them feel understood.
3. **Desire** (2-3 lines): Paint the outcome. What life looks like after.
4. **Action** (CTA): One clear next step. Not "Learn more" — be specific.
5. **Proof** (social proof element): Stat, testimonial quote, or credibility marker.

### Hook Templates (Use as Starting Points)
- "Most [audience] waste [resource] on [wrong approach]..."
- "We helped [similar client] go from [before] to [after] in [timeframe]"
- "[Surprising stat] of [audience] don't realize [insight]"
- "The [industry] playbook that generated [specific result]"
- "Stop doing [common mistake]. Here's what works instead."

### Copy Rules
- First line must be complete in 125 characters (Meta truncates)
- Write at a grade 6 reading level. Complexity kills conversion.
- One CTA per ad. Multiple CTAs = confusion = no click.
- Include numbers when possible. "47% increase" beats "significant improvement."
- Never use: "game-changer", "revolutionary", "cutting-edge", "best-in-class"
- Write 5 variations minimum. Let the algorithm pick the winner.

### Platform-Specific Guidelines

**Meta Ads:**
- Primary text: 125 chars visible, 1000 max. Front-load the hook.
- Headline: 27 chars visible on mobile. Be ruthless with brevity.
- Description: often hidden. Don't rely on it.
- Image: 1080x1080 or 1080x1350. Text overlay under 20% of image area.
- Video: first 3 seconds determine if they watch. Hook immediately.

**Google Ads (Search):**
- Headline 1: Include primary keyword. 30 chars.
- Headline 2: Value proposition or benefit. 30 chars.
- Headline 3: CTA or differentiator. 30 chars.
- Description: Expand on benefits, include social proof. 90 chars each.
- Include all relevant ad extensions (sitelinks, callouts, structured snippets).

## A/B Testing Protocol

### What to Test (in priority order)
1. **Hook/headline** — highest impact on CTR
2. **Creative format** — video vs. image vs. carousel
3. **Audience** — different segments of your ICP
4. **CTA** — different offers or next steps
5. **Landing page** — same ad, different destinations

### Testing Rules
- Test ONE variable at a time. If you change the hook AND the image, you learn nothing.
- Minimum sample: 1000 impressions per variation before drawing conclusions
- Minimum duration: 3 days (Meta's algorithm needs time to optimize)
- Statistical significance: don't call a winner until one variant outperforms by 20%+
- Document every test and result. Build an institutional knowledge base of what works.

### The Testing Cadence
- Week 1-2: Launch 3-5 ad variations per ad set
- Week 3: Kill bottom 50%. Scale top performers.
- Week 4: Launch new tests based on learnings from top performers.
- Monthly: Review all test results. Update the playbook.

## Performance Analysis

### Key Metrics by Objective

**Lead Generation:**
| Metric | Good | Needs Work | Alarm |
|--------|------|------------|-------|
| CPL (Cost per Lead) | < $15 | $15-30 | > $30 |
| CTR | > 2% | 1-2% | < 1% |
| Conversion Rate | > 10% | 5-10% | < 5% |

**E-Commerce:**
| Metric | Good | Needs Work | Alarm |
|--------|------|------------|-------|
| ROAS | > 4x | 2-4x | < 2x |
| CPC | < $1.50 | $1.50-3 | > $3 |
| Add to Cart Rate | > 8% | 4-8% | < 4% |

**Brand Awareness:**
| Metric | Good | Needs Work | Alarm |
|--------|------|------------|-------|
| CPM | < $8 | $8-15 | > $15 |
| Frequency | < 2.5 | 2.5-4 | > 4 |
| Video View Rate | > 25% | 15-25% | < 15% |

### Monthly Performance Report Structure
1. Executive summary (3 sentences: spend, results, key takeaway)
2. Spend breakdown by platform/campaign
3. Top 3 performing ads (with screenshots and metrics)
4. Bottom 3 performing ads (with diagnosis)
5. Tests run and learnings
6. Recommendations for next month
7. Budget reallocation proposal if needed

## Common Mistakes (Anti-Patterns)

- **Broad targeting on day 1**: Start narrow, expand when profitable
- **Changing ads daily**: Give the algorithm 3-5 days to optimize
- **Optimizing for clicks instead of conversions**: Clicks are vanity. Conversions are money.
- **No exclusion audiences**: Always exclude existing customers from acquisition campaigns
- **Same creative for 3+ months**: Creative fatigue is real. Refresh monthly.
- **No UTM parameters**: If you can't track where conversions come from, you can't optimize

---

> Alfred — The Open-Source Agency Brain. Full dashboard: alfredify.com

// Alfred — Prompt Registry
// Registers all agency skill prompts on the MCP server.
// Total: 30+ prompts across 5 categories.

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { register as registerAds } from "./ads.js";
import { register as registerSales } from "./sales.js";
import { register as registerContent } from "./content.js";
import { register as registerOps } from "./ops.js";
import { register as registerFunnels } from "./funnels.js";

/**
 * Register all Alfred prompts on the server.
 * Each module adds prompts for its category:
 *
 * Ads (6):       meta-ad-copy, google-ad-copy, tiktok-ad-script, youtube-ad-script,
 *                ad-creative-brief, campaign-structure
 *
 * Sales (6):     cold-email, cold-dm, proposal, case-study, sales-script,
 *                (+ client-update from server.ts core)
 *
 * Content (9):   content-calendar, caption, repurpose, blog-post, video-script,
 *                carousel, email-sequence, twitter-thread, newsletter
 *
 * Ops (7):       sop, client-onboarding, meeting-notes, data-story, client-report,
 *                landing-page-copy, (+ morning-briefing, weekly-report from server.ts core)
 *
 * Funnels (4):   funnel, lead-magnet, brand-voice, agency-health
 */
export function registerAllPrompts(server: McpServer): void {
  registerAds(server);
  registerSales(server);
  registerContent(server);
  registerOps(server);
  registerFunnels(server);
}

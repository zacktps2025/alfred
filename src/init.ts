#!/usr/bin/env node

// Alfred — Interactive Setup Wizard
// The wise wizard guides digital wizards through their agency brain setup
// Run: npx alfred-agency init

import { createInterface } from "readline";
import { existsSync, mkdirSync, cpSync, readdirSync } from "fs";
import { homedir } from "os";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pc from "picocolors";
import {
  LOGO,
  box,
  statusLine,
  sectionHeader,
  success,
  warn,
  info,
  dim,
  footer,
  wizardSays,
  wizardGreeting,
  wizardSetupComplete,
  wizardCasting,
  getWizard,
} from "./branding.js";
import { loadConfig, saveConfig, getConfigFile, hasIntegration } from "./lib/config.js";
import { DEFAULT_CONFIG, type AlfredConfig } from "./types/config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILLS_SOURCE = join(__dirname, "..", "skills");
const TEMPLATES_SOURCE = join(__dirname, "..", "templates");
const CLAUDE_SKILLS_DIR = join(homedir(), ".claude", "skills");

// ─── Interactive readline helpers ────────────────────────────

function createRl() {
  return createInterface({ input: process.stdin, output: process.stderr });
}

async function ask(rl: ReturnType<typeof createRl>, question: string, defaultValue?: string): Promise<string> {
  return new Promise((resolve) => {
    const prompt = defaultValue ? `  ${question} ${dim(`(${defaultValue})`)}: ` : `  ${question}: `;
    rl.question(prompt, (answer) => {
      resolve(answer.trim() || defaultValue || "");
    });
  });
}

async function choose(rl: ReturnType<typeof createRl>, question: string, options: string[]): Promise<number> {
  console.error(`\n  ${question}\n`);
  options.forEach((opt, i) => {
    console.error(`  ${i === 0 ? pc.magenta(">") : " "} [${i + 1}] ${opt}`);
  });
  const answer = await ask(rl, "Choice", "1");
  const idx = parseInt(answer) - 1;
  return idx >= 0 && idx < options.length ? idx : 0;
}

async function confirm(rl: ReturnType<typeof createRl>, question: string, defaultYes = true): Promise<boolean> {
  const hint = defaultYes ? "Y/n" : "y/N";
  const answer = await ask(rl, `${question} (${hint})`);
  if (!answer) return defaultYes;
  return answer.toLowerCase().startsWith("y");
}

// ─── Spell animation (simple terminal "casting" effect) ──────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function castSpell(label: string): Promise<void> {
  const frames = [".", "..", "...", "....", ".....", "......"];
  for (const frame of frames) {
    process.stderr.write(`\r  ${pc.magenta("*")} ${label} ${pc.dim(frame)}`);
    await sleep(120);
  }
  process.stderr.write(`\r  ${pc.green("+")} ${label}${" ".repeat(20)}\n`);
}

// ─── Skill installer ─────────────────────────────────────────

function installSkills(): number {
  if (!existsSync(SKILLS_SOURCE)) {
    console.error(warn("Skills directory not found in package. Skipping skill installation."));
    return 0;
  }

  if (!existsSync(CLAUDE_SKILLS_DIR)) {
    mkdirSync(CLAUDE_SKILLS_DIR, { recursive: true });
  }

  let count = 0;
  const entries = readdirSync(SKILLS_SOURCE, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const src = join(SKILLS_SOURCE, entry.name);
      const dest = join(CLAUDE_SKILLS_DIR, entry.name);
      cpSync(src, dest, { recursive: true });
      count++;
    }
  }

  // Also install agent skills
  const agentsDir = join(SKILLS_SOURCE, "agents");
  if (existsSync(agentsDir)) {
    const agents = readdirSync(agentsDir, { withFileTypes: true });
    for (const agent of agents) {
      if (agent.isDirectory()) {
        const src = join(agentsDir, agent.name);
        const dest = join(CLAUDE_SKILLS_DIR, `alfred-${agent.name}`);
        cpSync(src, dest, { recursive: true });
        count++;
      }
    }
  }

  return count;
}

// ─── Main wizard ─────────────────────────────────────────────

export async function runInit(): Promise<void> {
  const rl = createRl();

  // === Act 1: The Summoning ===
  console.error(LOGO);
  console.error(wizardGreeting());
  console.error(dim("v1.0.0"));
  console.error("");

  // Check existing config
  const existing = existsSync(getConfigFile());
  if (existing) {
    console.error(wizardSays("I sense an existing configuration... shall we reconfigure your powers?", "idle"));
    const overwrite = await confirm(rl, "Reconfigure?", false);
    if (!overwrite) {
      console.error(wizardSays("Very well. Let me check on your enchantments...", "cast"));
      await showHealthCheck();
      rl.close();
      return;
    }
  }

  // === Act 2: Choose Your Path ===

  console.error(wizardSays("Tell me, wizard... what powers do you seek?", "idle"));

  const installChoice = await choose(rl, "What shall I bestow upon you?", [
    "The Full Arsenal (MCP server + skills + OS template)",
    "The Agency Brain (MCP server only — tools for your AI)",
    "The Spellbook (skills only — marketing, ads, design, funnels)",
    "The Operating Tome (CLAUDE.md agency template only)",
  ]);

  const installMcp = installChoice === 0 || installChoice === 1;
  const installSkillsFlag = installChoice === 0 || installChoice === 2;
  const installTemplates = installChoice === 0 || installChoice === 3;

  // === Act 3: Identity ===

  console.error(wizardSays("Now... tell me about your domain.", "idle"));
  console.error(sectionHeader("Your Agency"));

  const config: AlfredConfig = { ...DEFAULT_CONFIG };

  config.companyName = await ask(rl, "What is your agency called?", "My Agency");
  config.founderName = await ask(rl, "And your name, wizard?");
  config.productDescription = await ask(rl, "What does your agency do? (one line)");
  config.icpPrimary = await ask(rl, "Who are your ideal clients? (e.g. 'e-commerce brands')");

  const stageChoice = await choose(rl, "Where are you on your quest?", [
    "Just starting (idea stage)",
    "Testing with first clients (alpha)",
    "Growing and refining (beta)",
    "Scaling the operation (growth)",
  ]);
  config.stage = (["idea", "alpha", "beta", "growth"] as const)[stageChoice];

  // === Act 4: Brand Customization ===

  console.error(sectionHeader("Your Colors"));

  const customBrand = await confirm(rl, "Customize your brand colors and fonts?", false);
  if (customBrand) {
    config.brand.primaryColor = await ask(rl, "Primary color (hex)", "#8535e9");
    config.brand.secondaryColor = await ask(rl, "Secondary color (hex)", "#6466f0");
    config.brand.darkColor = await ask(rl, "Dark color (hex)", "#080a2d");
    config.brand.headlineFont = await ask(rl, "Headline font", "Kanit");
    config.brand.bodyFont = await ask(rl, "Body font", "Inter");
  }

  // === Act 5: Connecting the Realms ===

  if (installMcp) {
    console.error(wizardSays("Time to connect your tools. Each connection strengthens your power.", "cast"));
    console.error(sectionHeader("Integrations"));
    console.error(dim("Skip any you don't use yet — you can add them later with `alfred-init`.\n"));

    // Jira
    const connectJira = await confirm(rl, "Connect Jira (project management)?", true);
    if (connectJira) {
      const host = await ask(rl, "Jira cloud hostname (e.g. mycompany.atlassian.net)");
      const email = await ask(rl, "Jira email");
      const apiToken = await ask(rl, "Jira API token");
      const project = await ask(rl, "Jira project key (e.g. PROJ)", "SCRUM");
      if (host && email && apiToken) {
        config.jira = { host, email, apiToken, project };
      }
    }

    // Slack
    const connectSlack = await confirm(rl, "Connect Slack (team communication)?", true);
    if (connectSlack) {
      const botToken = await ask(rl, "Slack bot token (xoxb-...)");
      const defaultChannel = await ask(rl, "Default channel ID (optional)");
      if (botToken) {
        config.slack = { botToken, defaultChannel: defaultChannel || undefined };
      }
    }

    // Serper (web search)
    const connectSearch = await confirm(rl, "Connect web search (Serper — for prospecting)?", false);
    if (connectSearch) {
      const apiKey = await ask(rl, "Serper API key");
      if (apiKey) {
        config.serper = { apiKey };
      }
    }

    // Vercel
    const connectVercel = await confirm(rl, "Connect Vercel (deployments)?", false);
    if (connectVercel) {
      const token = await ask(rl, "Vercel token");
      const projectName = await ask(rl, "Vercel project name");
      if (token) {
        config.vercel = { token, projectName: projectName || undefined };
      }
    }
  }

  // === Act 6: Team ===

  const addTeam = await confirm(rl, "Register team members?", false);
  if (addTeam) {
    console.error(dim("Add your team (press Enter with empty name when done)\n"));
    while (true) {
      const name = await ask(rl, "Team member name");
      if (!name) break;
      const slackId = await ask(rl, `  ${name}'s Slack ID (optional)`);
      const jiraAccountId = await ask(rl, `  ${name}'s Jira account ID (optional)`);
      const role = await ask(rl, `  ${name}'s role (optional)`);
      config.team.push({
        name,
        slackId: slackId || undefined,
        jiraAccountId: jiraAccountId || undefined,
        role: role || undefined,
      });
    }
  }

  // === Act 7: Casting the Spells ===

  console.error(wizardCasting("Enchanting your workspace..."));
  console.error("");

  // Save config
  saveConfig(config);
  await castSpell("Configuration inscribed");

  // Install skills
  if (installSkillsFlag) {
    const count = installSkills();
    if (count > 0) {
      await castSpell(`${count} skills bound to your spellbook`);
    } else {
      console.error(warn("No skills found to install."));
    }
  }

  // Install templates
  if (installTemplates) {
    if (existsSync(TEMPLATES_SOURCE)) {
      await castSpell("OS templates prepared");
      console.error(dim(`  Templates at: ${TEMPLATES_SOURCE}`));
      console.error(dim("  Copy CLAUDE.md.template to your project and customize it."));
    }
  }

  // === Act 8: The Grand Reveal ===

  await showHealthCheck(config);

  // MCP config hint
  if (installMcp) {
    console.error(sectionHeader("Final Incantation"));
    console.error(dim("Register Alfred with your AI copilot:\n"));
    console.error(`  ${pc.bold("claude mcp add alfred npx alfred-agency")}\n`);
    console.error(dim("Or add to ~/.claude.json:"));
    console.error(dim(JSON.stringify({
      mcpServers: {
        alfred: {
          command: "npx",
          args: ["-y", "alfred-agency"],
        },
      },
    }, null, 2).split("\n").map(l => `  ${l}`).join("\n")));
  }

  console.error("");
  console.error(wizardSetupComplete());
  console.error(footer());
  rl.close();
}

async function showHealthCheck(config?: AlfredConfig): Promise<void> {
  const cfg = config ?? loadConfig();

  const connectedCount =
    (cfg.jira ? 1 : 0) +
    (cfg.slack ? 1 : 0) +
    (cfg.serper ? 1 : 0) +
    (cfg.vercel ? 1 : 0);

  const lines = [
    `${pc.bold(`Alfred v1.0.0 — ${cfg.companyName}`)}`,
    "",
    `${pc.dim("Tools:")} 9 available | ${connectedCount} connected`,
    "",
    statusLine("Jira (projects)", cfg.jira ? "ok" : "skip"),
    statusLine("Slack (comms)", cfg.slack ? "ok" : "skip"),
    statusLine("Web Search (prospecting)", cfg.serper ? "ok" : "skip"),
    statusLine("Vercel (deploys)", cfg.vercel ? "ok" : "skip"),
    statusLine("Meta Ads", "coming"),
    statusLine("Google Ads", "coming"),
    statusLine("QuickBooks", "coming"),
    "",
    `${pc.dim("Team:")} ${cfg.team.length} member${cfg.team.length !== 1 ? "s" : ""}`,
    `${pc.dim("Stage:")} ${cfg.stage}`,
  ];

  console.error("\n" + box(lines));

  // Validate live connections
  if (cfg.jira) {
    try {
      const { getOpenIssues } = await import("./lib/jira.js");
      const issues = await getOpenIssues();
      console.error(success(`Jira: ${issues.length} open issues found`));
    } catch (err) {
      console.error(warn(`Jira: connection failed — ${err instanceof Error ? err.message : String(err)}`));
    }
  }

  if (cfg.slack) {
    try {
      const { listChannels } = await import("./lib/slack.js");
      const channels = await listChannels();
      console.error(success(`Slack: ${channels.length} channels accessible`));
    } catch (err) {
      console.error(warn(`Slack: connection failed — ${err instanceof Error ? err.message : String(err)}`));
    }
  }
}

// Allow direct execution
if (import.meta.url === `file://${process.argv[1]}`) {
  runInit().catch((err) => {
    console.error("[alfred] Init failed:", err);
    process.exit(1);
  });
}

// Alfred — Configuration Manager
// Reads/writes user config from ~/.alfred/config.json

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import { DEFAULT_CONFIG, type AlfredConfig } from "../types/config.js";

const CONFIG_DIR = join(homedir(), ".alfred");
const CONFIG_FILE = join(CONFIG_DIR, "config.json");

let _config: AlfredConfig | null = null;

/** Ensure the config directory exists */
function ensureConfigDir(): void {
  if (!existsSync(CONFIG_DIR)) {
    mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

/** Load config from disk, or return defaults */
export function loadConfig(): AlfredConfig {
  if (_config) return _config;

  if (existsSync(CONFIG_FILE)) {
    try {
      const raw = readFileSync(CONFIG_FILE, "utf-8");
      const parsed: AlfredConfig = { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
      _config = parsed;
      return parsed;
    } catch {
      console.error("[alfred] Failed to parse config, using defaults");
    }
  }

  _config = { ...DEFAULT_CONFIG };
  return _config;
}

/** Save config to disk */
export function saveConfig(config: AlfredConfig): void {
  ensureConfigDir();
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
  _config = config;
}

/** Check if a specific integration is configured */
export function hasIntegration(name: "jira" | "slack" | "serper" | "vercel" | "metaAds" | "googleAds"): boolean {
  const config = loadConfig();
  const integration = config[name];
  return integration !== undefined && integration !== null;
}

/** Get the config directory path */
export function getConfigDir(): string {
  return CONFIG_DIR;
}

/** Get the config file path */
export function getConfigFile(): string {
  return CONFIG_FILE;
}

/** Resolve a team member name from Jira account ID */
export function resolveTeamMember(accountId: string | null | undefined): string {
  if (!accountId) return "Unassigned";
  const config = loadConfig();
  const member = config.team.find(m => m.jiraAccountId === accountId);
  return member?.name ?? "Unknown";
}

/** Calculate days since a date string */
export function daysSince(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
}

/** Get formatted today string */
export function todayStr(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

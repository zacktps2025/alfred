// Alfred — Slack API Client
// Configurable credentials via ~/.alfred/config.json

import { loadConfig } from "./config.js";
import type { SlackMessage } from "../types/tools.js";

function getToken(): string {
  const config = loadConfig();
  if (!config.slack?.botToken) throw new Error("Slack is not configured. Run `alfred-init` to set up.");
  return config.slack.botToken;
}

async function callSlack(method: string, body: object): Promise<unknown> {
  const res = await fetch(`https://slack.com/api/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as { ok: boolean; error?: string };
  if (!data.ok) {
    throw new Error(`Slack ${method} failed: ${data.error}`);
  }
  return data;
}

/** Post a message to a channel */
export async function postMessage(channel: string, text: string): Promise<void> {
  await callSlack("chat.postMessage", { channel, text });
}

/** Send a DM to a user by their Slack user ID */
export async function dmUser(userId: string, text: string): Promise<void> {
  await callSlack("chat.postMessage", { channel: userId, text });
}

/** Read recent messages from a channel */
export async function getChannelHistory(
  channel: string,
  oldest?: string,
  limit = 50
): Promise<SlackMessage[]> {
  const body: Record<string, unknown> = { channel, limit: Math.min(limit, 200) };
  if (oldest) body.oldest = oldest;
  const data = (await callSlack("conversations.history", body)) as {
    messages?: SlackMessage[];
  };
  return (data.messages ?? []).filter((m) => m.type === "message" && !("subtype" in m));
}

/** List channels the bot has access to */
export async function listChannels(): Promise<{ id: string; name: string }[]> {
  const data = (await callSlack("conversations.list", {
    types: "public_channel,private_channel",
    limit: 100,
  })) as {
    channels?: { id: string; name: string }[];
  };
  return data.channels ?? [];
}

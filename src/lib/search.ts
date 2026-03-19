// Alfred — Web Search Client (Serper API)
// Configurable API key via ~/.alfred/config.json

import { loadConfig } from "./config.js";
import type { SearchResult } from "../types/tools.js";

function getKey(): string {
  const config = loadConfig();
  if (!config.serper?.apiKey) throw new Error("Serper is not configured. Run `alfred-init` to set up.");
  return config.serper.apiKey;
}

/** Run a Google search via Serper */
export async function search(query: string, num = 20): Promise<SearchResult[]> {
  const res = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "X-API-KEY": getKey(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ q: query, num }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Serper search failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as { organic?: SearchResult[] };
  return data.organic ?? [];
}

/** Format search results as readable text */
export function formatResults(results: SearchResult[]): string {
  return results
    .map((r, i) => `[${i + 1}] ${r.title}\nURL: ${r.link}\nSnippet: ${r.snippet}`)
    .join("\n\n");
}

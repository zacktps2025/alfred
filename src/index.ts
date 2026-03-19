#!/usr/bin/env node

// Alfred — MCP Server Entry Point
// The open-source agency brain for AI copilots.
//
// Usage:
//   npx alfred-agency          — Start the MCP server (STDIO transport)
//   npx alfred-agency init     — Interactive setup wizard
//
// Add to Claude Code:
//   claude mcp add alfred npx alfred-agency

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

async function main(): Promise<void> {
  // If "init" is passed as argument, redirect to the init script
  if (process.argv.includes("init")) {
    const { runInit } = await import("./init.js");
    await runInit();
    return;
  }

  const server = createServer();
  const transport = new StdioServerTransport();

  await server.connect(transport);

  // Log to stderr (never stdout — that's the MCP JSON-RPC channel)
  console.error("[alfred] MCP server started. Awaiting your command, wizard...");
}

main().catch((err) => {
  console.error("[alfred] Fatal error:", err);
  process.exit(1);
});

# Contributing to Alfred

Thanks for your interest in making Alfred better. This guide covers everything you need to get started.

---

## Quick Start

```bash
git clone https://github.com/zacktps2025/alfred.git
cd alfred
bun install
bun run dev        # Dev mode with watch
bun run lint       # Type check
bun run build      # Production build
bun run inspect    # MCP Inspector
```

**Requirements:** Bun 1.0+, Node 18+

---

## Project Structure

```
alfred/
├── src/
│   ├── index.ts           # MCP server entry point
│   ├── server.ts          # Tool, resource, and prompt registration
│   ├── init.ts            # Interactive setup wizard
│   ├── branding.ts        # ASCII art and terminal UI
│   ├── lib/
│   │   ├── config.ts      # Config manager (~/.alfred/config.json)
│   │   ├── jira.ts        # Jira REST API client
│   │   ├── slack.ts       # Slack API client
│   │   ├── search.ts      # Serper web search client
│   │   └── vercel.ts      # Vercel API client
│   ├── prompts/
│   │   ├── index.ts       # Prompt registry
│   │   ├── ads.ts         # 6 advertising prompts
│   │   ├── sales.ts       # 6 sales prompts
│   │   ├── content.ts     # 9 content prompts
│   │   ├── ops.ts         # 7 operations prompts
│   │   └── funnels.ts     # 4 strategy prompts
│   └── types/
│       ├── config.ts      # AlfredConfig type
│       ├── tools.ts       # Tool-related types
│       └── resources.ts   # Resource types
├── skills/                # 10 SKILL.md knowledge base files
├── templates/             # OS templates (CLAUDE.md, MEMORY.md, etc.)
├── examples/              # Example configs for different agency types
├── docs/                  # Documentation
└── package.json
```

---

## How to Contribute

### Adding a New Prompt

Prompts are Alfred's most impactful feature. To add one:

1. Pick the right category file in `src/prompts/` (ads, sales, content, ops, or funnels)
2. Follow the existing pattern:

```typescript
server.prompt(
  "prompt-name",
  "One-line description of what it generates.",
  {
    // Zod-typed parameters
    param: z.string().describe("What this parameter is for"),
    optionalParam: z.string().optional().describe("Optional context"),
  },
  async ({ param, optionalParam }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `You are Alfred, a [role] for ${agency}. [Instructions]...

## Brief
- **Param:** ${param}

## Output: [Structured format]
[Detailed output template with sections, tables, and frameworks]

— Alfred`,
      },
    }],
  })
);
```

3. Update the prompt count in:
   - `README.md` (the header and arsenal section)
   - `docs/TOOLS.md` (add full documentation)
   - `src/prompts/index.ts` (comment count)

### Adding a New Tool

Tools are MCP functions that take action (search, create, post). They live in `src/server.ts`.

1. Add the tool registration in `createServer()`:

```typescript
server.tool(
  "alfred_tool_name",
  "What this tool does",
  { /* zod schema */ },
  async (params) => {
    // Implementation
    return { content: [{ type: "text", text: result }] };
  }
);
```

2. If the tool calls an external API, add a client in `src/lib/`
3. Add the corresponding type in `src/types/tools.ts`
4. Document it in `docs/TOOLS.md`

### Adding a New Skill

Skills are `.md` files in `skills/` that teach the AI domain knowledge. Follow the existing format:

1. Create `skills/agents/alfred-[domain]/SKILL.md`
2. Include: domain overview, frameworks, decision rules, benchmarks, common mistakes
3. Reference it in `README.md`

### Adding an Integration

Integrations connect Alfred to external services:

1. Add a client in `src/lib/[service].ts`
2. Add config fields in `src/types/config.ts`
3. Add setup flow in `src/init.ts`
4. Document in `docs/INTEGRATIONS.md`

---

## Code Standards

- **TypeScript strict mode** — all code must pass `tsc --noEmit`
- **No `any` types** — use proper typing or `unknown` with type guards
- **Zod for validation** — all tool and prompt parameters use Zod schemas
- **Config-aware** — prompts should reference `loadConfig()` for agency name customization
- **No external runtime deps** — keep the dependency count minimal. Alfred should install fast.

---

## Prompt Quality Standards

Every prompt should:

1. **Be specific** — output a complete, structured artifact (not vague advice)
2. **Include frameworks** — use named frameworks (AIDA-P, SPIN, PAS) where applicable
3. **Be copy-paste ready** — output should be usable immediately, not a starting point
4. **Include platform rules** — character limits, format specs, algorithm-friendly practices
5. **Scale with expertise** — useful for beginners and experienced agency operators
6. **Sign off with** `— Alfred` — consistent brand voice

---

## Testing

```bash
bun run lint       # Type check (must pass)
bun run build      # Build check (must produce dist/)
bun run inspect    # Open MCP Inspector to test tools and prompts interactively
```

---

## Pull Requests

1. Fork the repo and create a feature branch from `main`
2. Make your changes following the standards above
3. Run `bun run lint && bun run build` — both must pass
4. Write a clear PR description: what you added, why it matters, how to test it
5. Keep PRs focused — one feature or fix per PR

---

## Reporting Issues

Use [GitHub Issues](https://github.com/zacktps2025/alfred/issues). Include:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Your environment (OS, Node version, AI copilot)

---

## License

By contributing, you agree that your contributions will be licensed under the Apache 2.0 License.

---

> Alfred — The Open-Source Agency Brain. [alfredify.com](https://alfredify.com)

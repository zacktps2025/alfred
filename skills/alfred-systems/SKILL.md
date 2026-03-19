---
name: alfred-systems
description: Systems and automation intelligence. SOP creation, workflow design, agent architecture, process optimization, tool stack decisions. Use when building processes, designing automations, or creating operational systems.
---

# Alfred Systems — Automation & Process Intelligence

> A system that lives in your head is not a system. Document it or it doesn't exist.

## When to Activate

Use this skill when:
- Creating or improving SOPs
- Designing automation workflows
- Building agent architectures
- Choosing tools for your stack
- Optimizing existing processes
- Onboarding team members to processes

## SOP Framework

### What Deserves an SOP?
If a process meets ANY of these criteria, it needs documentation:
1. Done more than 3 times
2. Done by more than 1 person
3. Has more than 5 steps
4. Failure has financial consequences
5. New hire would need to learn it

### SOP Structure
```
# [Process Name]

## Purpose
[One sentence: what this process achieves]

## Who
[Role responsible for executing this SOP]

## When
[Trigger: what event starts this process]

## Prerequisites
[What must be true before starting]

## Steps
1. [Specific action with details]
   - Tool: [what software/tool to use]
   - Expected output: [what this step produces]
2. [Next step...]
3. [Next step...]

## Quality Check
- [ ] [Verification item 1]
- [ ] [Verification item 2]

## If Something Goes Wrong
[Troubleshooting for common failures]

## Owner
[Person responsible for maintaining this SOP]
Last updated: [Date]
```

### SOP Rules
- Write for someone doing it for the first time
- Include screenshots or screen recordings for complex steps
- Version control your SOPs — date every update
- Review SOPs quarterly — delete or update stale ones
- One SOP per process — don't combine unrelated procedures

## Workflow Design

### The Automation Decision Framework
Before automating anything, ask:

| Question | If Yes | If No |
|----------|--------|-------|
| Is the process repeatable? | Candidate for automation | Don't automate |
| Is it error-prone manually? | High priority to automate | Lower priority |
| Does it require human judgment? | Semi-automate (trigger + review) | Fully automate |
| How often does it run? | Daily+ = automate. Monthly = maybe. | Keep manual |
| What's the cost of failure? | High = add safety checks | Low = automate freely |

### Automation Levels
1. **Manual with checklist**: Human does it, SOP guides them
2. **Triggered notification**: System alerts human to take action
3. **Semi-automated**: System does 80%, human reviews and approves
4. **Fully automated**: System handles end-to-end, human monitors
5. **Autonomous**: System handles everything including error recovery

### Common Agency Automations
| Process | Tool | Trigger | Action |
|---------|------|---------|--------|
| Morning briefing | Cron + API | 8 AM weekdays | Pull open issues, post summary to Slack |
| Stale task detection | Cron + API | Every 2 hours | Check for 48h+ stale tasks, DM assignees |
| New client setup | Webhook | Client signs contract | Create project, channels, folders, tasks |
| Invoice reminders | Cron | Invoice due date | Send reminder email 3 days before due |
| Weekly report | Cron + API | Friday 5 PM | Generate report from project data |
| Lead notification | Webhook | Form submission | Notify sales team in Slack |
| Deploy notification | Webhook | Vercel deploy | Post to team channel with URL |

## Agent Architecture

### When to Build an Agent
An agent is the right choice when:
- The task requires dynamic decision-making (not just if/then)
- Input varies significantly each time
- Output quality benefits from reasoning
- The workflow has branching paths based on context

### Agent Design Principles
1. **Single responsibility**: One agent, one domain, one job
2. **Clear inputs/outputs**: Define exactly what goes in and what comes out
3. **Failure modes**: Define what happens when the agent can't complete the task
4. **Human oversight**: Every autonomous agent has a kill switch
5. **Logging**: Every agent action is logged for review

### Agent Roster Template
| Agent | Domain | Mode | Trigger | Output |
|-------|--------|------|---------|--------|
| [Name] | [What it handles] | On-demand / Scheduled | [What activates it] | [What it produces] |

## Tool Stack Decision Framework

### Choosing Tools
For every tool in your stack, answer:

1. **Does it integrate with what you already use?** (No = heavy lift)
2. **Does the team actually use it?** (Adoption > features)
3. **What's the switching cost?** (High = choose carefully)
4. **Does it scale with you?** (Pricing at 2x, 5x, 10x your current size)
5. **Is there a simpler alternative?** (Complexity is a cost)

### The Stack Reduction Rule
If you have more than 8 tools in your core stack, you have too many. Every tool is:
- A monthly cost
- A login to manage
- A training requirement for new hires
- A data silo to bridge
- A potential point of failure

### Recommended Agency Stack Layers
| Layer | Purpose | Examples |
|-------|---------|---------|
| Operations | Project + task management | Alfred, Jira, Linear |
| Communication | Team + client chat | Slack, Teams |
| Client management | CRM + relationships | Close, HubSpot |
| Financial | Invoicing + accounting | QuickBooks, Stripe |
| Marketing | Ads + analytics | Meta Ads, Google Ads, GA4 |
| Content | Creation + publishing | Canva, WordPress, Buffer |
| Documentation | SOPs + knowledge base | Notion, Confluence |
| AI | Automation + agents | Alfred, Claude, GPT |

## Process Optimization

### The 5 Whys for Process Problems
When a process fails:
1. Why did it fail? (Surface cause)
2. Why did that happen? (Contributing factor)
3. Why was that possible? (System gap)
4. Why wasn't it caught? (Missing check)
5. Why doesn't the system prevent this? (Root cause)

Fix the root cause, not the symptom.

### Process Audit Cadence
- **Weekly**: Review stale tasks and blockers
- **Monthly**: Review team utilization and workload balance
- **Quarterly**: Audit SOP relevance, tool stack, and automation effectiveness
- **Annually**: Full operations review — what to keep, kill, or create

---

> Alfred — The Open-Source Agency Brain. Full dashboard: alfredify.com

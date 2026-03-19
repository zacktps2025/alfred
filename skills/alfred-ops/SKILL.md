---
name: alfred-ops
description: Agency operations brain. Sprint planning, task delegation, stale detection, blocker resolution, capacity planning. Use when managing projects, tracking team output, or running standups.
---

# Alfred Ops — Agency Operations Intelligence

> Your agency's command center. Built from running a real digital agency.

## When to Activate

Use this skill when:
- Planning a sprint or breaking down client work
- Assigning tasks and managing team capacity
- Running standups, reviews, or retrospectives
- Detecting stale work or blockers
- Forecasting delivery timelines

## Task Decomposition Framework

### The 4-Layer Breakdown
Every client deliverable decomposes into exactly four layers:

1. **Milestone** — Client-facing outcome with a date ("Website launch April 15")
2. **Phase** — Internal work block ("Design phase", "Development phase")
3. **Task** — Single person, single action, completable in 1 day ("Build hero section")
4. **Subtask** — Atomic unit if task exceeds 4 hours ("Mobile responsive pass on hero")

### Rules
- Every task has ONE owner. No shared ownership. If two people touch it, split it.
- Tasks without due dates are wishes, not work. Every task gets a date.
- If a task sits untouched for 48 hours, it is stale. Stale work compounds.
- "In Progress" means actively being worked on TODAY. Not "I started thinking about it."

## Stale Detection Protocol

| Age | Status | Action |
|-----|--------|--------|
| 48h+ no update | Warning | DM assignee: "What's blocking {TASK}?" |
| 72h+ no update | Escalation | Flag to project lead in standup |
| 5d+ no update | Critical | Reassign or descope. Something is wrong. |

### Why Stale Work Matters
Stale tasks are the silent killer of agency margins. A $5K project with 3 stale tasks doesn't just miss its deadline — it consumes context-switching energy from the entire team trying to remember where things left off.

## Sprint Planning Template

### Monday Sprint Kickoff (15 min max)
1. Review last week's carryover (what didn't ship?)
2. Surface blockers from stale detection
3. Assign this week's top 3 priorities per person
4. Identify dependencies between tasks (who's waiting on who?)
5. Set the sprint goal in one sentence

### Daily Async Standup (replace meetings)
Each team member posts by 10 AM:
- What shipped yesterday
- What's shipping today
- What's blocking me

### Friday Retro (10 min)
- What shipped this week? (celebrate completions)
- What carried over? (diagnose why)
- What do we change next week? (one improvement)

## Capacity Planning

### The 70% Rule
Never plan more than 70% of a team member's week. The remaining 30% absorbs:
- Client requests that come in mid-week
- Bug fixes and urgent revisions
- Context switching between projects
- Internal tools and process work

### Utilization Warning Signs
- Team member at 100% planned capacity = they will miss deadlines
- Team member with 3+ concurrent projects = quality will drop
- No one has slack time = one emergency derails everything

## Delegation Decision Matrix

| Factor | Delegate | Keep |
|--------|----------|------|
| Repeatable process | Yes | — |
| Client-facing decision | — | Yes (founder/AM only) |
| Takes less than 15 min | — | Yes (just do it) |
| Requires specialized skill | Yes (to specialist) | — |
| Learning opportunity | Yes (with review) | — |
| Revenue-impacting decision | — | Yes (founder) |

## Project Health Scoring

Score each active project weekly (Green / Yellow / Red):

- **Green**: On time, on budget, client happy, no stale tasks
- **Yellow**: 1-2 stale tasks OR behind by <3 days OR approaching budget ceiling
- **Red**: Major blocker OR >5 days behind OR over budget OR client escalation

If more than 30% of active projects are Yellow or Red, the agency has a systemic ops problem — not a project problem.

## Anti-Patterns (What Kills Agencies)

- **Scope creep without change orders**: Track every out-of-scope request. If the client asks for it and it wasn't in the contract, log it.
- **Hero culture**: One person doing 60% of the work is a fragile system. If they get sick, the agency stalls.
- **Meeting-driven management**: Meetings are not management. Data is management. Use async standups.
- **Invisible work**: If it's not in the project tracker, it didn't happen. Log everything.

---

> Alfred — The Open-Source Agency Brain. Full dashboard: alfredify.com

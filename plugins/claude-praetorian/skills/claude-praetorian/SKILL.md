---
name: claude-praetorian
description: Plugin automation for praetorian MCP - hooks handle prompting, you handle compacting
triggers: [PreToolUse, PreCompact, PostToolUse, SubagentStop]
---

# ⚜️ Claude Praetorian Plugin

Hooks that prompt you to compact at the right moments. Storage is per-project at `.claude/praetorian/`.

## Hooks

| Hook | When | What You'll See |
|------|------|-----------------|
| **PreToolUse(EnterPlanMode)** | Before planning | Prior compactions listed, consider restoring |
| **PreCompact** | Before context resets | Prompt to save decisions/insights/findings |
| **PostToolUse(WebFetch/WebSearch)** | After web research | Prompt to compact as `web_research` |
| **SubagentStop** | After subagent completes | Prompt to compact as `task_result` |

## When You See a Prompt

Hook prompts appear as `⚜️ [claude-praetorian] ...`. Respond by calling the MCP tool:

```
praetorian_compact(type, title, key_insights, refs)
praetorian_restore(query)
```

## Commands

- `/praetorian-compact` — Save current context manually
- `/praetorian-restore` — Load previous context
- `/praetorian-search` — Search past compactions

## Requires

MCP server must be installed:
```
claude mcp add claude-praetorian-mcp -- bunx claude-praetorian-mcp
```

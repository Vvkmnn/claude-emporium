---
name: claude-praetorian
description: Automatic context preservation - saves 50-60% tokens across sessions
triggers: [SessionStart, PreCompact, PostToolUse, Stop]
---

# ⚜️ Claude Praetorian Plugin

**Set it and forget it** context preservation. Automatically saves valuable work and restores it when needed.

## Value Proposition

| Without Plugin | With Plugin |
|---------------|-------------|
| Research lost after compaction | Research persists across sessions |
| Re-explore codebase every session | Codebase insights restored instantly |
| Decisions forgotten | Decisions + rationale preserved |
| ~2000 tokens re-learning context | ~200 tokens loading compacted context |

**Typical savings: 50-60% fewer tokens** for returning to previous work.

## Automatic Hooks

All notifications appear as: `⚜️ [claude-praetorian] ...`

| Hook | When | What It Does |
|------|------|--------------|
| **SessionStart** | New session | Shows relevant compactions, offers restore |
| **PreCompact** | Before context reset | **Critical** - prompts save before context loss |
| **PostToolUse** | After WebFetch/WebSearch/Task | Prompts to save research & subagent findings |
| **PostToolUse** | After exploration | Prompts to save codebase insights |
| **Stop** | Session end | Prompts final save of decisions/insights |

## Commands

| Command | Description |
|---------|-------------|
| `/compact` | Save current context manually |
| `/restore` | Load previous context |
| `/search <query>` | Search past compactions |

## Requirements

Install the MCP server first:
```json
// ~/.claude.json
"mcpServers": {
  "praetorian": { "command": "npx", "args": ["claude-praetorian-mcp"] }
}
```

Then install this plugin for automatic hooks.

## Compaction Types

| Type | Use For | Token Value |
|------|---------|-------------|
| `web_research` | WebFetch results, API docs | ~200 tokens saved |
| `task_result` | Subagent findings, exploration | ~300 tokens saved |
| `file_reads` | Codebase patterns, architecture | ~400 tokens saved |
| `decisions` | Technical decisions + rationale | ~150 tokens saved |

## How It Works

```
Session 1: Research + exploration → hooks prompt compact → saved to ~/.praetorian/
Session 2: Start → hook shows compactions → /restore → instant context (~200 tokens vs ~2000)
```

The plugin wraps (not duplicates) MCP functionality:
- Hooks inject prompts that trigger `praetorian_compact()` / `praetorian_restore()`
- Project detection shows relevant compactions first
- Token estimates help you understand the value

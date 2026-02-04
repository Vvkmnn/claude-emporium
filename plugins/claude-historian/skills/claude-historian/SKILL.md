---
name: claude-historian
description: Automatic history search - checks past sessions before web research, planning, and debugging
triggers: [PreToolUse, PostToolUse]
---

# 📜 Claude Historian Plugin

**Set it and forget it** history search. Automatically checks your past work before redundant research.

## Value Proposition

| Without Plugin | With Plugin |
|---------------|-------------|
| Web search for solved problems | Check history first |
| Re-discover past approaches | Reuse proven solutions |
| Repeat debugging steps | Find past error fixes |
| Start planning from scratch | Build on past decisions |

**Typical savings: 200-800 tokens** per avoided redundant search.

## Automatic Hooks

All notifications appear as: `📜 [claude-historian] ...`

| Hook | When | What It Does |
|------|------|--------------|
| **PreToolUse** | Before WebSearch/WebFetch | Prompts `find_similar_queries` first |
| **PreToolUse** | Before EnterPlanMode | Prompts `search_plans` for past approaches |
| **PreToolUse** | Before Task (agents) | Prompts `find_tool_patterns` for workflows |
| **PostToolUse** | After Bash errors | Prompts `get_error_solutions` |

## Command

`/historian <query>` - Search your conversation history

Examples:
- `/historian auth implementation` - Find auth-related work
- `/historian "module not found"` - Find error solutions
- `/historian package.json` - Find file changes

## Requirements

Install the MCP server first:
```json
// ~/.claude.json
"mcpServers": {
  "claude-historian-mcp": { "command": "npx", "args": ["claude-historian-mcp"] }
}
```

Then install this plugin for automatic hooks.

## MCP Tools Reference

| Tool | Purpose |
|------|---------|
| `search_conversations` | General history search |
| `find_similar_queries` | Find related past questions |
| `get_error_solutions` | Find how errors were fixed |
| `find_file_context` | Track file changes |
| `find_tool_patterns` | Discover successful workflows |
| `list_recent_sessions` | Browse recent work |
| `search_plans` | Find past implementation plans |

## How It Works

```
User asks question → PreToolUse fires → Hook prompts history check →
If found: reuse past solution (save tokens)
If not found: proceed with web search (no loss)
```

The plugin wraps (not duplicates) MCP functionality:
- Hooks inject prompts that trigger historian MCP tools
- High-impact triggers only (no SessionStart overhead)
- Silent when no relevant history exists

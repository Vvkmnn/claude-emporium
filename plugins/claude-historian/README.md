# Claude Historian

Automatic history search for Claude Code. Checks past sessions before you do redundant web research, planning, or debugging.

## Installation

```bash
/plugin marketplace add Vvkmnn/claude-emporium
/plugin install claude-historian@claude-emporium
```

## Requirements

MCP server: [`claude-historian-mcp`](https://www.npmjs.com/package/claude-historian-mcp)

```bash
claude mcp add historian -- npx claude-historian-mcp
```

## Hooks

| Event | Trigger | What It Does |
|-------|---------|-------------|
| `PreToolUse` | `WebSearch` · `WebFetch` | Checks history before web research |
| `PreToolUse` | `EnterPlanMode` | Searches past plans before planning |
| `PreToolUse` | `Task` | Checks tool patterns before launching agents |
| `PostToolUse` | `Bash` | Suggests error solutions after command failures |

## Commands

| Command | Description |
|---------|-------------|
| `/historian-search <query>` | Search past sessions for solutions, decisions, context |

## MCP Tools

| Tool | Purpose |
|------|---------|
| `search_conversations` | General history search |
| `find_similar_queries` | Find related past questions |
| `get_error_solutions` | Find how errors were fixed |
| `find_file_context` | Track file changes |
| `find_tool_patterns` | Discover successful workflows |
| `list_recent_sessions` | Browse recent work |
| `search_plans` | Find past implementation plans |

## Settings

Configure in `~/.claude/settings.json` under `claude-emporium`:

```json
{
  "claude-emporium": {
    "suggest_siblings": false,
    "claude-historian": {
      "search_before_web": false,
      "search_before_plan": false,
      "search_before_task": false,
      "search_after_error": false
    }
  }
}
```

| Key | Default | What It Controls |
|-----|---------|-----------------|
| `search_before_web` | `true` | Check history before web research |
| `search_before_plan` | `true` | Search past plans before planning |
| `search_before_task` | `true` | Check tool patterns before launching agents |
| `search_after_error` | `true` | Suggest error solutions after command failures |
| `suggest_siblings` | `true` | Show install suggestions for sibling plugins (global) |

## How It Works

Hooks inject prompts that trigger `claude-historian-mcp` tools at high-impact moments. If relevant history exists, Claude reuses it. If not, it proceeds silently.

Typical savings: 200-800 tokens per avoided redundant search.

## License

MIT

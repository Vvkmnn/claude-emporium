# Claude Praetorian

Automatic context preservation for Claude Code. Prompts you to save and restore valuable context at the right moments — before planning, after research, when subagents complete.

## Installation

```bash
/plugin marketplace add Vvkmnn/claude-emporium
/plugin install claude-praetorian@claude-emporium
```

## Requirements

MCP server: [`claude-praetorian-mcp`](https://www.npmjs.com/package/claude-praetorian-mcp)

```bash
claude mcp add praetorian -- npx claude-praetorian-mcp
```

## Hooks

| Event | Trigger | What It Does |
|-------|---------|-------------|
| `PreToolUse` | `EnterPlanMode` | Lists prior compactions before you start planning |
| `PreCompact` | `*` | Saves context before compaction resets it |
| `PostToolUse` | `WebFetch` · `WebSearch` | Prompts to compact research findings |
| `SubagentStop` | `*` | Prompts to compact subagent results |

## Commands

| Command | Description |
|---------|-------------|
| `/praetorian-compact [type] [title]` | Save current context (interactive or with args) |
| `/praetorian-restore [query]` | Load previous context (recent or searched) |
| `/praetorian-search <query>` | Search past compactions |

**Compaction types:** `web_research` · `task_result` · `file_reads` · `decisions`

## Settings

Configure in `~/.claude/settings.json` under `claude-emporium`:

```json
{
  "claude-emporium": {
    "suggest_siblings": false,
    "claude-praetorian": {
      "auto_compact_research": false,
      "auto_compact_subagent": false,
      "check_compactions_before_plan": false,
      "remind_compact": false
    }
  }
}
```

| Key | Default | What It Controls |
|-----|---------|-----------------|
| `auto_compact_research` | `true` | Prompt to compact after web research |
| `auto_compact_subagent` | `true` | Prompt to compact after subagent completes |
| `check_compactions_before_plan` | `true` | List prior compactions before planning |
| `remind_compact` | `true` | Remind to save context before compaction |
| `suggest_siblings` | `true` | Show install suggestions for sibling plugins (global) |

## How It Works

Hooks inject prompts that trigger `claude-praetorian-mcp` tools at high-impact moments. No business logic in the plugin — it tells Claude *when* to compact, the MCP handles *how*.

Storage is project-local at `.claude/praetorian/`.

## License

MIT

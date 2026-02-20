# Claude Oracle

Automatic discovery of skills, plugins, and MCP servers for Claude Code. Searches 17 sources in parallel to find relevant tools before you start planning or when you hit errors.

## Installation

```bash
/plugin marketplace add Vvkmnn/claude-emporium
/plugin install claude-oracle@claude-emporium
```

## Requirements

MCP server: [`claude-oracle-mcp`](https://www.npmjs.com/package/claude-oracle-mcp)

```bash
claude mcp add oracle -- npx claude-oracle-mcp
```

## Hooks

| Event | Trigger | What It Does |
|-------|---------|-------------|
| `PreToolUse` | `EnterPlanMode` | Searches for relevant tools before planning |
| `PostToolUse` | `Bash` | Searches for tools that solve errors |

## Commands

| Command | Description |
|---------|-------------|
| `/search-oracle <query> [type]` | Search for tools across all sources |

## MCP Tools

| Tool | Purpose |
|------|---------|
| `search` | Search all sources for relevant tools |
| `browse` | Browse by category or popularity |
| `sources` | Show available data sources and status |

## Data Sources (17)

Smithery Registry, Glama.ai, Official MCP Registry, npm Registry, GitHub marketplace plugins, awesome-mcp-servers (wong2), awesome-mcp-lists (collabnix), awesome-claude-code (ccplugins), awesome-claude-code (jmanhype), awesome-agent-skills, Playbooks.com, SkillsMP, and more.

## Settings

Configure in `~/.claude/settings.json` under `claude-emporium`:

```json
{
  "claude-emporium": {
    "suggest_siblings": false,
    "claude-oracle": {
      "search_before_plan": false,
      "search_after_error": false
    }
  }
}
```

| Key | Default | What It Controls |
|-----|---------|-----------------|
| `search_before_plan` | `true` | Search for relevant tools before planning |
| `search_after_error` | `true` | Search for tools that solve errors |
| `suggest_siblings` | `true` | Show install suggestions for sibling plugins (global) |

## How It Works

Hooks inject prompts that trigger `claude-oracle-mcp` search at high-impact moments. Results include install commands so you can immediately add useful tools.

Zero setup — no databases, no local storage. All search is computed in-memory with TTL caching.

## License

MIT

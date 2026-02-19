---
name: claude-oracle
description: Automatic discovery of skills, plugins, and MCP servers across 17 sources
triggers: [PreToolUse, PostToolUse]
---

# 🔮 Claude Oracle Plugin

**Set it and forget it** tool discovery. Automatically searches for relevant skills, plugins, and MCP servers.

## Value Proposition

| Without Plugin | With Plugin |
|---------------|-------------|
| Manually browse marketplaces | Auto-search before planning |
| Miss useful tools | Discover tools from 17 sources |
| Search one source at a time | Parallel search across all sources |
| Guess what exists | Get ranked results with install commands |

## Automatic Hooks

All notifications appear as: `🔮 [claude-oracle] ...`

| Hook | When | What It Does |
|------|------|--------------|
| **PreToolUse** | Before EnterPlanMode | Searches for relevant tools before planning |
| **PostToolUse** | After Bash errors | Searches for tools that solve the error |

## Commands

`/oracle-search <query>` - Search for tools across all sources
`/oracle-browse [category]` - Browse tools by category or popularity

## Requirements

Install the MCP server first:
```bash
claude mcp add oracle -- npx claude-oracle-mcp
```

Then install this plugin for automatic hooks.

## MCP Tools Reference

| Tool | Purpose |
|------|---------|
| `search` | Search all sources for relevant tools |
| `browse` | Browse by category or popularity |
| `sources` | Show available data sources and status |

## Data Sources (17)

Smithery Registry, Glama.ai, Official MCP Registry, npm, GitHub marketplace plugins, awesome-mcp-servers, awesome-claude-code, awesome-agent-skills, Playbooks.com, SkillsMP, and more.

## How It Works

```
User enters plan mode → PreToolUse fires → Hook searches oracle →
If found: suggests relevant tools with install commands
If not found: proceeds silently (no overhead)
```

The plugin wraps (not duplicates) MCP functionality:
- Hooks inject prompts that trigger oracle MCP tools
- High-impact triggers only (planning, errors)
- Silent when no relevant tools exist

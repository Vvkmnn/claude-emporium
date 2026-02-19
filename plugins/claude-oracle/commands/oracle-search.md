---
name: oracle-search
description: Search for skills, plugins, and MCP servers
arguments: query, type?
---

# /oracle-search

Search across 17 sources for relevant skills, plugins, and MCP servers.

## Usage

- `/oracle-search testing` - Find testing tools
- `/oracle-search "database migration"` - Find migration tools
- `/oracle-search security mcp` - Find security MCP servers

## Action

Call `mcp__claude-oracle-mcp__search` with:
- `query`: The search term
- `type`: Optional filter - "skill", "plugin", "mcp", or "all" (default: "all")
- `limit`: Max results (default: 5)

## Examples

```
/oracle-search code review
```
Returns top-rated code review tools with install commands.

```
/oracle-search database plugin
```
Returns database plugins from Smithery, npm, awesome lists, etc.

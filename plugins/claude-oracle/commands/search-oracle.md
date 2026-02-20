---
name: search-oracle
description: Search for skills, plugins, and MCP servers
arguments: query, type?
---

# /search-oracle

Search across 17 sources for relevant skills, plugins, and MCP servers.

## Usage

- `/search-oracle testing` - Find testing tools
- `/search-oracle "database migration"` - Find migration tools
- `/search-oracle security mcp` - Find security MCP servers

## Action

Call `mcp__claude-oracle-mcp__search` with:
- `query`: The search term
- `type`: Optional filter - "skill", "plugin", "mcp", or "all" (default: "all")
- `limit`: Max results (default: 5)

## Browsing

To browse by category, use search with category terms:
- `/search-oracle database` - Browse database tools
- `/search-oracle security plugin` - Browse security plugins

## Examples

```
/search-oracle code review
```
Returns top-rated code review tools with install commands.

```
/search-oracle database plugin
```
Returns database plugins from Smithery, npm, awesome lists, etc.

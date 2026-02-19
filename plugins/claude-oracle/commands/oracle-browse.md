---
name: oracle-browse
description: Browse skills, plugins, and MCP servers by category
arguments: category?, type?
---

# /oracle-browse

Browse available tools by category or popularity.

## Usage

- `/oracle-browse` - Browse popular tools
- `/oracle-browse testing` - Browse testing tools
- `/oracle-browse security mcp` - Browse security MCP servers

## Action

Call `mcp__claude-oracle-mcp__browse` with:
- `category`: Optional category filter (e.g., "testing", "database", "security")
- `type`: Optional filter - "skill", "plugin", "mcp", or "all" (default: "all")
- `sort`: "popular" or "recent" (default: "popular")
- `limit`: Max results (default: 10)

## Examples

```
/oracle-browse database
```
Returns database tools sorted by popularity.

```
/oracle-browse security plugin
```
Returns security-focused plugins from all sources.

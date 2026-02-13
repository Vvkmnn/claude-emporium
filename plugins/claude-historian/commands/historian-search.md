---
name: historian-search
description: Search your conversation history
arguments: query
---

# /historian-search

Search past Claude sessions for solutions, decisions, and context.

## Usage

`/historian-search <query>`

## Examples

- `/historian-search auth implementation` - Find auth-related work
- `/historian-search "module not found"` - Find error solutions
- `/historian-search package.json` - Find file changes

## Action

Call `mcp__claude-historian-mcp__search_conversations(query="<query>", limit=5)`

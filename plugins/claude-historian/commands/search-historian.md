---
name: search-historian
description: Search your conversation history
arguments: query
---

# /search-historian

Search past Claude sessions for solutions, decisions, and context.

## Usage

`/search-historian <query>`

## Examples

- `/search-historian auth implementation` - Find auth-related work
- `/search-historian "module not found"` - Find error solutions
- `/search-historian package.json` - Find file changes

## Action

Call `mcp__claude-historian-mcp__search_conversations(query="<query>", limit=5)`

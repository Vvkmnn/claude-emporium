---
name: historian
description: Search your conversation history
arguments: query
---

# /historian

Search past Claude sessions for solutions, decisions, and context.

## Usage

`/historian <query>`

## Examples

- `/historian auth implementation` - Find auth-related work
- `/historian "module not found"` - Find error solutions
- `/historian package.json` - Find file changes

## Action

Call `mcp__claude-historian-mcp__search_conversations(query="<query>", limit=5)`

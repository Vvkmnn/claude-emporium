---
name: claude-praetorian
description: Automatic context preservation - hooks enforce praetorian MCP usage
triggers: [SessionStart, PreCompact, PostToolUse]
---

# Claude Praetorian Plugin

Automatic wrapper for `claude-praetorian-mcp` that enforces context preservation.

## What This Plugin Does

**Hooks automatically:**
- **SessionStart**: Prompts to restore previous context
- **PreCompact**: Forces save before context window resets
- **PostToolUse**: Reminds to compact after WebFetch/Task

**Commands:**
- `/compact` - Save current context
- `/restore` - Load previous context

## Requires

This plugin requires `claude-praetorian-mcp` to be installed:

```json
// ~/.claude.json
"mcpServers": {
  "praetorian": { "command": "npx", "args": ["claude-praetorian-mcp"] }
}
```

## How It Works

This plugin doesn't duplicate MCP functionality - it prompts Claude to call the MCP tools:
- `praetorian_compact()` - Save context
- `praetorian_restore()` - Load context

The hooks ensure Claude doesn't forget to use these tools at critical moments.

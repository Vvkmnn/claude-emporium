# Claude Agora

Plugin marketplace that wraps existing MCPs with advanced automation:
- **Hooks** for automatic triggers
- **Commands** for user convenience
- **Skills** for Claude guidance

No code duplication - plugins prompt Claude to use existing MCP tools.

## Available Plugins

| Plugin | MCP Required | Description |
|--------|--------------|-------------|
| `claude-praetorian` | `claude-praetorian-mcp` | Automatic context preservation |
| `historian-auto` | `claude-historian-mcp` | Session search automation (coming soon) |

## Installation

```bash
# Install the marketplace plugin
claude install claude-agora v/claude-agora

# Also add the required MCP to ~/.claude.json:
"mcpServers": {
  "praetorian": { "command": "npx", "args": ["claude-praetorian-mcp"] }
}
```

## claude-praetorian

Wraps `claude-praetorian-mcp` with:

**Hooks:**
- **SessionStart**: Prompts to restore previous context
- **PreCompact**: Forces save before context compaction
- **PostToolUse**: Reminds to compact after WebFetch/Task

**Commands:**
- `/compact` - Save current context
- `/restore` - Load previous context

## Architecture

```
┌─────────────────────────────────────────────────┐
│               claude-agora                       │
│  ┌──────────────┐  ┌──────────────┐            │
│  │praetorian-   │  │ historian-   │  ...       │
│  │auto          │  │ auto         │            │
│  │ - hooks      │  │ - hooks      │            │
│  │ - commands   │  │ - commands   │            │
│  └──────┬───────┘  └──────┬───────┘            │
│         │ prompts          │ prompts            │
│         ▼                  ▼                    │
└─────────────────────────────────────────────────┘
          │                  │
          ▼                  ▼
┌─────────────────┐  ┌─────────────────┐
│praetorian-mcp   │  │ historian-mcp   │
│(npm standalone) │  │ (npm standalone)│
└─────────────────┘  └─────────────────┘
```

## License

MIT

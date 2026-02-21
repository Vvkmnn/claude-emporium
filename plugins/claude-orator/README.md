# Claude Orator

Prompt rhetoric coach for Claude Code. Deterministically scores and restructures prompts using Anthropic best practices. No LLM calls, no network, in-memory only.

## Installation

```bash
/plugin marketplace add Vvkmnn/claude-emporium
/plugin install claude-orator@claude-emporium
```

## Requirements

MCP server: [`claude-orator-mcp`](https://www.npmjs.com/package/claude-orator-mcp)

```bash
claude mcp add orator -- npx claude-orator-mcp
```

## Hooks

| Event | Trigger | What It Does |
|-------|---------|-------------|
| `PreToolUse` | `Task` | Suggests optimization for under-specified subagent prompts |

## Commands

| Command | Description |
|---------|-------------|
| `/reprompt-orator <prompt>` | Optimize a prompt using Anthropic best practices |

## MCP Tools

| Tool | Purpose |
|------|---------|
| `orator_optimize` | Score across 7 dimensions, apply techniques, return restructured prompt |

## Scoring Dimensions

| Dimension | What It Measures |
|-----------|-----------------|
| Clarity | Unambiguous language and intent |
| Specificity | Concrete details vs vague requests |
| Structure | Logical organization (XML, headers, sections) |
| Context | Background information provided |
| Examples | Few-shot examples or expected outputs |
| Constraints | Boundaries and requirements stated |
| Tone | Appropriate voice and register |

## Techniques

System prompts · XML tags · Chain of thought · Few-shot · Prefill · Long context · Extended thinking · Tool use

## Settings

Configure in `~/.claude/settings.json` under `claude-emporium`:

```json
{
  "claude-emporium": {
    "claude-orator": {
      "optimize_subagent_prompts": false
    }
  }
}
```

| Key | Default | What It Controls |
|-----|---------|-----------------|
| `optimize_subagent_prompts` | `true` | Auto-suggest optimization for under-specified subagent prompts |

## How It Works

The hook fires on `PreToolUse(Task)` and runs a quick heuristic: if the prompt is >50 chars and lacks XML tags, markdown headers, or an action verb, it emits a suggestion to run `orator_optimize`. Never blocks — suggestion only.

The MCP server scores deterministically across 7 dimensions (1-10 each), selects applicable techniques from 8 Anthropic best practices, and returns a restructured prompt.

## License

MIT

# Contributing

## What We Accept

- Bug fixes with reproduction steps
- Hook improvements (better triggers, matchers, error handling)
- Documentation and examples
- Performance improvements to hook scripts

Open an issue before writing a new plugin. The idea needs traction before implementation.

## Plugin Structure

Every plugin lives at `plugins/<name>/` and contains:

```
plugins/claude-newplugin/
├── .claude-plugin/
│   └── plugin.json          # plugin manifest
├── hooks/
│   ├── hooks.json            # hook definitions
│   └── *.js                  # hook scripts
├── commands/
│   └── *.md                  # slash command definitions
├── skills/                   # optional
│   └── claude-<name>/
│       └── SKILL.md
└── README.md
```

Hook scripts must:
- Exit 0 unless they need to block the action
- Be idempotent (safe to fire multiple times)
- Handle missing MCP gracefully (don't crash if the MCP server isn't running)
- Use `shared/utils.js` for settings, sibling detection, and emit patterns

## Running Locally

```bash
# Add the dev marketplace
/plugin marketplace add /path/to/claude-emporium

# Install a plugin for testing
/plugin install claude-<name>@claude-emporium

# Restart Claude Code to pick up changes
# Watch hook output in the conversation
```

## Submitting

1. Fork and create a branch: `git checkout -b feat/your-change`
2. Follow the plugin structure above
3. Update `marketplace.json` if adding a plugin
4. Open a PR with the template filled out

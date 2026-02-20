## What

<!-- One line: what does this PR do? Link the issue if one exists: Fixes #N -->

## Why

<!-- Motivation. What problem does this solve or what improvement does it make? -->

## Changes

<!-- For new plugins: describe the hook triggers, MCP it wraps, and commands added.
     For bug fixes: what was wrong and what changed?
     For docs: what was missing or incorrect? -->

## Checklist

- [ ] Hooks are idempotent (firing multiple times doesn't cause duplicate side effects)
- [ ] Hook scripts exit 0 on non-error conditions (don't block Claude's action)
- [ ] `hooks.json` is valid JSON
- [ ] `marketplace.json` updated if adding/removing a plugin
- [ ] README updated if behavior changed
- [ ] Tested with `claude` locally — plugin installs and hook fires as expected

<!-- For new plugins only: -->
- [ ] Plugin follows the `plugins/<name>/` structure (hooks/, commands/, skills/, README.md)
- [ ] MCP dependency documented in README

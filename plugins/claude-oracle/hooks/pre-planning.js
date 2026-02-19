#!/usr/bin/env node
/**
 * Pre-Planning Hook - Search oracle for relevant tools before planning
 *
 * Triggers: PreToolUse(EnterPlanMode)
 * Prompts Claude to search for relevant skills/plugins/MCPs.
 *
 * Settings: search_before_plan (default: true)
 * Synergy: notes historian will search past plans, praetorian has compactions.
 */

const path = require('path');
const { readStdin, emit, loadSettings, siblings } = require('../../shared/utils');

(async () => {
  await readStdin();

  const settings = loadSettings('claude-oracle');
  if (!settings.search_before_plan) process.exit(0);

  const project = path.basename(process.cwd());

  const peer = siblings();
  let synergy = '';
  if (peer.historian) {
    synergy += '\n📜 [claude-historian] is active — past plans and decisions will also be searched.';
  }
  if (peer.praetorian) {
    synergy += '\n⚜️ [claude-praetorian] is active — check saved compactions for prior context.';
  }

  emit(`🔮 [claude-oracle] Before planning, check if relevant tools exist.

mcp__claude-oracle-mcp__search(query="${project}", type="all", limit=3)

The oracle searches 17 sources (Smithery, npm, awesome lists, etc.) for:
- Skills that guide implementation
- Plugins that automate workflows
- MCP servers that provide capabilities

If relevant tools are found, consider installing them before proceeding.${synergy}`);
})();

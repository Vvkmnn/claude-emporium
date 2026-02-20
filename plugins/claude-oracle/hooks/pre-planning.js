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
const { readStdin, emit, loadSettings, shouldSuggestSiblings, siblings } = require('../../shared/utils');

(async () => {
  await readStdin();

  const settings = loadSettings('claude-oracle');
  if (!settings.search_before_plan) process.exit(0);

  const project = path.basename(process.cwd());

  const peer = siblings();
  const suggest = shouldSuggestSiblings();
  let synergy = '';
  if (peer.historian) {
    synergy += '\n📜 [claude-historian] is active — past plans and decisions will also be searched.';
  } else if (suggest) {
    synergy += '\n📜 [claude-historian] could surface past plans and decisions → /install claude-historian@claude-emporium';
  }
  if (peer.praetorian) {
    synergy += '\n⚜️ [claude-praetorian] is active — check saved compactions for prior context.';
  } else if (suggest) {
    synergy += '\n⚜️ [claude-praetorian] could restore saved context from prior sessions → /install claude-praetorian@claude-emporium';
  }

  emit(`🔮 [claude-oracle] Before planning, check if relevant tools exist.

mcp__claude-oracle-mcp__search(query="${project}", type="all", limit=3)

The oracle searches 17 sources (Smithery, npm, awesome lists, etc.) for:
- Skills that guide implementation
- Plugins that automate workflows
- MCP servers that provide capabilities

If relevant tools are found, consider installing them before proceeding.${synergy}`);
})();

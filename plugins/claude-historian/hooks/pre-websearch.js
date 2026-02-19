#!/usr/bin/env node
/**
 * Pre-WebSearch Hook - Check historian before web research
 *
 * Triggers: PreToolUse(WebSearch|WebFetch)
 * Prompts Claude to check find_similar_queries() first.
 *
 * Settings: search_before_web (default: true)
 * Synergy: notes praetorian will compact research findings after.
 */

const path = require('path');
const { readStdin, emit, loadSettings, siblings } = require('../../shared/utils');

(async () => {
  const data = await readStdin();
  if (!data) process.exit(0);

  const settings = loadSettings('claude-historian');
  if (!settings.search_before_web) process.exit(0);

  const { tool_input } = data;
  let query = '';
  if (tool_input) {
    query = tool_input.query || tool_input.url || tool_input.prompt || '';
  }

  const project = path.basename(process.cwd());
  const hint = query
    ? `Query: "${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"`
    : `Project: ${project}`;

  const peer = siblings();
  let synergy = '';
  if (peer.praetorian) {
    synergy = '\n⚜️ [claude-praetorian] is active — findings will be compacted automatically after research.';
  }

  emit(`📜 [claude-historian] Before searching the web, check if you've researched this before.

mcp__claude-historian-mcp__find_similar_queries(query="${query || project}", limit=3)

${hint}
Token savings: ~200-500 tokens if already answered${synergy}`);
})();

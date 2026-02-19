#!/usr/bin/env node
/**
 * Post-Research Hook - Prompt to compact after web research
 *
 * Triggers: PostToolUse(WebFetch|WebSearch)
 * Prompts Claude to use praetorian_compact() for web research findings.
 *
 * Settings: auto_compact_research (default: true)
 */

const { readStdin, emit, loadSettings } = require('../../shared/utils');

(async () => {
  const data = await readStdin();
  if (!data) process.exit(0);

  const settings = loadSettings('claude-praetorian');
  if (!settings.auto_compact_research) process.exit(0);

  const { tool_name, error } = data;
  if (error) process.exit(0);

  const hints = {
    WebFetch: 'Extract: key facts, URLs, code snippets',
    WebSearch: 'Extract: key facts, source URLs, relevant findings',
  };

  const hint = hints[tool_name];
  if (hint) {
    emit(`⚜️ [claude-praetorian] Web research completed - compact findings.

praetorian_compact(type="web_research", title="<topic>", key_insights=[...], refs=[...])
${hint}`);
  }
})();

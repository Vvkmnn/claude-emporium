#!/usr/bin/env node
/**
 * Post-Subagent Hook - Compact findings when a subagent completes
 *
 * Triggers: SubagentStop
 * Prompts Claude to compact subagent results as task_result.
 *
 * Settings: auto_compact_subagent (default: true)
 */

const { readStdin, emit, loadSettings } = require('../../shared/utils');

(async () => {
  const data = await readStdin();

  const settings = loadSettings('claude-praetorian');
  if (!settings.auto_compact_subagent) process.exit(0);

  let context = '';
  if (data) {
    const agentType = data.subagent_type || data.agent_type || '';
    const description = data.description || '';

    if (agentType || description) {
      const desc = description.length > 60
        ? description.substring(0, 60) + '...'
        : description;
      context = agentType
        ? `\nAgent: ${agentType}${desc ? ` - "${desc}"` : ''}`
        : `\nTask: "${desc}"`;
    }
  }

  emit(`⚜️ [claude-praetorian] Subagent completed - compact findings.${context}

praetorian_compact(type="task_result", title="<what was found>", key_insights=[...], refs=[...])
Extract: findings, file:line refs, decisions made`);
})();

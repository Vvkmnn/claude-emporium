#!/usr/bin/env node
/**
 * Post-Subagent Hook - Compact findings when a subagent completes
 *
 * Triggers: SubagentStop
 * Prompts Claude to compact subagent results as task_result.
 * Fires for every subagent — each has distinct findings worth saving.
 */

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });

process.stdin.on('end', () => {
  try {
    // Extract subagent info if available
    let context = '';
    try {
      const data = JSON.parse(input);
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
    } catch (e) { /* input may not be JSON */ }

    console.log(JSON.stringify({
      hookSpecificOutput: {
        additionalContext: `<system-reminder>⚜️ [claude-praetorian] Subagent completed - compact findings.${context}

praetorian_compact(type="task_result", title="<what was found>", key_insights=[...], refs=[...])
Extract: findings, file:line refs, decisions made</system-reminder>`
      }
    }));
  } catch (e) {
    // Silent fail - don't block subagent completion
  }
});

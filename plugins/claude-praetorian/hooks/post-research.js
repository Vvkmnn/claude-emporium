#!/usr/bin/env node
/**
 * Post-Tool-Use Hook - Reminds to compact after valuable operations
 *
 * Triggers: WebFetch, Task (subagents)
 * WRAPPER: Prompts Claude to use MCP tool, doesn't compact directly
 */

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const { tool_name, error } = data;

    // Don't prompt on errors
    if (error) {
      process.exit(0);
    }

    const prompts = {
      WebFetch: {
        type: 'web_research',
        message: 'Web research completed - save findings to preserve ~200 tokens.',
        hint: 'Extract: key facts, URLs, code snippets'
      },
      WebSearch: {
        type: 'web_research',
        message: 'Web search completed - save findings to preserve ~200 tokens.',
        hint: 'Extract: key facts, source URLs, relevant quotes'
      },
      Task: {
        type: 'task_result',
        message: 'Subagent completed - save insights to preserve ~300 tokens.',
        hint: 'Extract: findings, file:line refs, decisions'
      }
    };

    const config = prompts[tool_name];
    if (config) {
      console.log(JSON.stringify({
        hookSpecificOutput: {
          additionalContext: `<system-reminder>⚜️ [claude-praetorian] ${config.message}

praetorian_compact(type="${config.type}", title="<topic>", key_insights=[...], refs=[...])
${config.hint}</system-reminder>`
        }
      }));
    }
  } catch (e) {
    // Silent fail - don't break tool execution
  }
});

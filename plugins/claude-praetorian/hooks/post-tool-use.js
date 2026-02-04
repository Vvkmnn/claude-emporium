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
        message: 'Web research completed. Consider saving findings.'
      },
      Task: {
        type: 'task_result',
        message: 'Subagent completed. Consider preserving insights.'
      }
    };

    const config = prompts[tool_name];
    if (config) {
      console.log(JSON.stringify({
        hookSpecificOutput: {
          additionalContext: `<system-reminder>⚜️ ${config.message}

Consider: praetorian_compact(type="${config.type}", title="<topic>", key_insights=[...])</system-reminder>`
        }
      }));
    }
  } catch (e) {
    // Silent fail - don't break tool execution
  }
});

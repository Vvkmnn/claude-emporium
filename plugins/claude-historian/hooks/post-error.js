#!/usr/bin/env node
/**
 * Post-Error Hook - Suggest error solutions after Bash failures
 *
 * Triggers: Bash (PostToolUse)
 * Only prompts when command failed (has error or non-zero exit)
 */

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const { tool_name, tool_output, error } = data;

    // Only trigger on Bash
    if (tool_name !== 'Bash') {
      process.exit(0);
    }

    // Check for errors - either explicit error or error patterns in output
    const hasError = error ||
      (tool_output && (
        /error|Error|ERROR|failed|Failed|FAILED|exception|Exception/i.test(tool_output) ||
        /exit code [1-9]|Exit: [1-9]|returned [1-9]/i.test(tool_output)
      ));

    // Silent exit if no error
    if (!hasError) {
      process.exit(0);
    }

    // Extract error pattern for search
    let errorPattern = '';
    if (error) {
      errorPattern = typeof error === 'string' ? error : JSON.stringify(error);
    } else if (tool_output) {
      // Try to extract the most relevant error line
      const lines = tool_output.split('\n');
      const errorLine = lines.find(l =>
        /error|Error|ERROR|failed|Failed|exception|Exception/i.test(l)
      );
      errorPattern = errorLine || tool_output.substring(0, 100);
    }

    // Truncate for display
    const displayError = errorPattern.substring(0, 80);

    console.log(JSON.stringify({
      hookSpecificOutput: {
        additionalContext: `<system-reminder>📜 [claude-historian] Command failed - check if you've solved this before.

mcp__claude-historian-mcp__get_error_solutions(error_pattern="${displayError}", limit=3)

Error: ${displayError}${errorPattern.length > 80 ? '...' : ''}
Past solutions may have: root cause, fix applied, workarounds tried</system-reminder>`
      }
    }));
  } catch (e) {
    // Silent fail - don't break error handling
  }
});

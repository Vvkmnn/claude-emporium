#!/usr/bin/env node
/**
 * Post-Error Hook - Suggest error solutions after Bash failures
 *
 * Triggers: PostToolUse(Bash)
 * Only prompts when command failed (has error or non-zero exit).
 *
 * Settings: search_after_error (default: true)
 * Synergy: notes oracle will also search for tools that solve the error.
 */

const { readStdin, emit, loadSettings, shouldSuggestSiblings, siblings } = require('../../shared/utils');

(async () => {
  const data = await readStdin();
  if (!data) process.exit(0);

  const settings = loadSettings('claude-historian');
  if (!settings.search_after_error) process.exit(0);

  const { tool_name, tool_output, error } = data;

  if (tool_name !== 'Bash') process.exit(0);

  const hasError = error ||
    (tool_output && (
      /error|Error|ERROR|failed|Failed|FAILED|exception|Exception/i.test(tool_output) ||
      /exit code [1-9]|Exit: [1-9]|returned [1-9]/i.test(tool_output)
    ));

  if (!hasError) process.exit(0);

  let errorPattern = '';
  if (error) {
    errorPattern = typeof error === 'string' ? error : JSON.stringify(error);
  } else if (tool_output) {
    const lines = tool_output.split('\n');
    const errorLine = lines.find(l =>
      /error|Error|ERROR|failed|Failed|exception|Exception/i.test(l)
    );
    errorPattern = errorLine || tool_output.substring(0, 100);
  }

  const displayError = errorPattern.substring(0, 80);

  const peer = siblings();
  const suggest = shouldSuggestSiblings();
  let synergy = '';
  if (peer.oracle) {
    synergy = '\n🔮 [claude-oracle] is active — also searching for tools that solve this class of problem.';
  } else if (suggest) {
    synergy = '\n🔮 [claude-oracle] could search for tools that solve this class of error → /install claude-oracle@claude-emporium';
  }

  emit(`📜 [claude-historian] Command failed - check if you've solved this before.

mcp__claude-historian-mcp__get_error_solutions(error_pattern="${displayError}", limit=3)

Error: ${displayError}${errorPattern.length > 80 ? '...' : ''}
Past solutions may have: root cause, fix applied, workarounds tried${synergy}`);
})();

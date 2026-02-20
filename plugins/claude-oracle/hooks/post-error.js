#!/usr/bin/env node
/**
 * Post-Error Hook - Search oracle for solutions after Bash failures
 *
 * Triggers: PostToolUse(Bash)
 * Only prompts when command failed (has error or non-zero exit).
 *
 * Settings: search_after_error (default: true)
 * Synergy: notes historian is also checking past solutions.
 */

const { readStdin, emit, loadSettings, shouldSuggestSiblings, siblings } = require('../../shared/utils');

(async () => {
  const data = await readStdin();
  if (!data) process.exit(0);

  const settings = loadSettings('claude-oracle');
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
  if (peer.historian) {
    synergy = '\n📜 [claude-historian] is active — also checking past solutions for this error.';
  } else if (suggest) {
    synergy = '\n📜 [claude-historian] could check if this error was solved before → /install claude-historian@claude-emporium';
  }

  emit(`🔮 [claude-oracle] Command failed - search for tools that might help.

mcp__claude-oracle-mcp__search(query="${displayError}", type="all", limit=3)

Error: ${displayError}${errorPattern.length > 80 ? '...' : ''}
The oracle may find MCP servers, plugins, or skills that solve this class of problem.${synergy}`);
})();

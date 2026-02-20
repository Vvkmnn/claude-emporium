#!/usr/bin/env node
/**
 * Post-Error Hook - Observe tool failure patterns
 *
 * Triggers: PostToolUse(Bash|Edit|Write)
 * Only prompts when tool failed (has error field or error pattern in output).
 * Silent on success — zero tokens.
 *
 * Settings: observe_after_failure (default: true)
 * Synergy: notes historian can search past solutions via get_error_solutions().
 */

const { readStdin, emit, loadSettings, shouldSuggestSiblings, siblings } = require('../../shared/utils');

// intentional no-match patterns — not real errors
const NOISE_PATTERNS = [
  /\bgrep\b.*exit code 1/i,
  /\brg\b.*exit code 1/i,
  /\bfind\b.*exit code 1/i,
  /\btest\b.*exit code 1/i,
  /No files? matched/i,
];

(async () => {
  const data = await readStdin();
  if (!data) process.exit(0);

  const settings = loadSettings('claude-gladiator');
  if (!settings.observe_after_failure) process.exit(0);

  const { tool_name, tool_input, tool_output, error } = data;

  // detect error — same pattern as historian
  const hasError = error ||
    (tool_output && (
      /error|Error|ERROR|failed|Failed|FAILED|exception|Exception/i.test(tool_output) ||
      /exit code [1-9]|Exit: [1-9]|returned [1-9]/i.test(tool_output)
    ));

  if (!hasError) process.exit(0);

  // skip intentional no-match patterns (grep/find returning exit 1)
  const errorStr = error
    ? (typeof error === 'string' ? error : JSON.stringify(error))
    : '';
  const combined = `${errorStr} ${tool_output || ''}`;
  if (NOISE_PATTERNS.some(p => p.test(combined))) process.exit(0);

  // extract meaningful error message
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

  const displayError = errorPattern.substring(0, 120);

  // build input summary for context
  let inputSummary = '';
  if (tool_input) {
    if (typeof tool_input === 'string') {
      inputSummary = tool_input.substring(0, 80);
    } else if (tool_input.command) {
      inputSummary = tool_input.command.substring(0, 80);
    } else if (tool_input.old_string) {
      inputSummary = `old_string: "${tool_input.old_string.substring(0, 60)}"`;
    } else if (tool_input.file_path) {
      inputSummary = tool_input.file_path;
    }
  }

  const peer = siblings();
  const suggest = shouldSuggestSiblings();
  let synergy = '';
  if (peer.historian) {
    synergy = '\n📜 [claude-historian] is active — check past solutions via get_error_solutions() during reflection.';
  } else if (suggest) {
    synergy = '\n📜 [claude-historian] could search past solutions for this error → /install claude-historian@claude-emporium';
  }

  emit(`⚔️ [claude-gladiator] ${tool_name} failed — observe this pattern.

gladiator_observe(
  summary="<describe what failed and how you fixed it>",
  context={error:"${displayError.replace(/"/g, '\\"')}", tool:"${tool_name}"${inputSummary ? `, before:"${inputSummary.replace(/"/g, '\\"')}"` : ''}, after:"<what worked>"},
  tags=["error", "${tool_name.toLowerCase()}"]
)

Error: ${displayError}${errorPattern.length > 120 ? '...' : ''}${synergy}`);
})();

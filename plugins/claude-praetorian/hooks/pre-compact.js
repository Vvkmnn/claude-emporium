#!/usr/bin/env node
/**
 * Pre-Compact Hook - Prompts Claude to save context before compaction
 *
 * CRITICAL: Fires BEFORE Claude's auto-compaction resets context
 * This is the key hook that prevents context loss
 */

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });

process.stdin.on('end', () => {
  try {
    // PreCompact may receive context about what's being compacted
    // For now, always prompt - better safe than sorry
    console.log(JSON.stringify({
      hookSpecificOutput: {
        additionalContext: `<system-reminder>⚜️ [claude-praetorian] Context compaction imminent - SAVE NOW.

Call praetorian_compact() immediately to preserve valuable work before context resets:
- type: "decisions" → architectural choices, trade-offs made
- type: "file_reads" → codebase patterns, key file locations
- type: "task_result" → subagent findings, exploration results
- type: "web_research" → API docs, external research</system-reminder>`
      }
    }));
  } catch (e) {
    // Silent fail
  }
});

// Handle case where stdin closes immediately
setTimeout(() => {
  if (!input) {
    console.log(JSON.stringify({
      hookSpecificOutput: {
        additionalContext: `<system-reminder>⚜️ [claude-praetorian] Context compaction imminent. Call praetorian_compact() to preserve work.</system-reminder>`
      }
    }));
  }
}, 100);

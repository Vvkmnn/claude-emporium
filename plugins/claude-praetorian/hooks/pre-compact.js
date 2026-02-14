#!/usr/bin/env node
/**
 * Pre-Compact Hook - Save context before compaction resets it
 *
 * Triggers: PreCompact (fires before Claude's auto-compaction)
 * This is the critical hook that prevents context loss.
 */

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });

process.stdin.on('end', () => {
  try {
    console.log(JSON.stringify({
      hookSpecificOutput: {
        additionalContext: `<system-reminder>⚜️ [claude-praetorian] Context compaction imminent - SAVE NOW.

Call praetorian_compact() to preserve valuable work before context resets:
- type: "decisions" for architectural choices and trade-offs
- type: "file_reads" for codebase patterns and key file locations
- type: "task_result" for subagent findings and exploration results
- type: "web_research" for API docs and external research

Auto-merges with existing compactions of the same title.</system-reminder>`
      }
    }));
  } catch (e) {
    // Silent fail
  }
});

// Handle immediate stdin close
setTimeout(() => {
  if (!input) {
    console.log(JSON.stringify({
      hookSpecificOutput: {
        additionalContext: `<system-reminder>⚜️ [claude-praetorian] Context compaction imminent. Call praetorian_compact() to preserve work.</system-reminder>`
      }
    }));
  }
}, 100);

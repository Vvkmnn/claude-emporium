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
        additionalContext: `<system-reminder>⚜️ Context compaction imminent.

REQUIRED: If valuable work exists in current context, call praetorian_compact() NOW to preserve it before context resets.

Types: web_research, task_result, file_reads, decisions</system-reminder>`
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
        additionalContext: `<system-reminder>⚜️ Context compaction imminent. Consider praetorian_compact() to preserve work.</system-reminder>`
      }
    }));
  }
}, 100);

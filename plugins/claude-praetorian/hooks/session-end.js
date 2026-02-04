#!/usr/bin/env node
/**
 * Session End Hook - Prompts to save session insights before ending
 *
 * Triggers: Stop (session end)
 * Checks if valuable work was done, suggests final compact
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const stateDir = path.join(os.homedir(), '.praetorian');
const stateFile = path.join(stateDir, '.exploration-state.json');

// Check if there was significant work this session
function hadSignificantWork() {
  try {
    if (fs.existsSync(stateFile)) {
      const data = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
      const total = (data.reads || 0) + (data.greps || 0) + (data.globs || 0);
      return total >= 3;
    }
  } catch (e) { /* ignore */ }
  return false;
}

// Clean up state file for next session
function cleanupState() {
  try {
    if (fs.existsSync(stateFile)) {
      fs.unlinkSync(stateFile);
    }
  } catch (e) { /* ignore */ }
}

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });

process.stdin.on('end', () => {
  try {
    const workDone = hadSignificantWork();

    if (workDone) {
      console.log(JSON.stringify({
        hookSpecificOutput: {
          additionalContext: `<system-reminder>⚜️ [claude-praetorian] Session ending with unsaved work detected.

Auto-compact key insights now with praetorian_compact():
- type: "decisions" → technical decisions made
- type: "file_reads" → codebase patterns discovered
- type: "task_result" → implementation insights</system-reminder>`
        }
      }));
    }

    // Clean up state for next session
    cleanupState();
  } catch (e) {
    // Silent fail - don't block session end
    cleanupState();
  }
});

// Handle case where stdin closes immediately
setTimeout(() => {
  if (!input) {
    cleanupState();
  }
}, 100);

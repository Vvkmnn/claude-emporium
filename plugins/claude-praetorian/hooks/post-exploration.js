#!/usr/bin/env node
/**
 * Post-Exploration Hook - Tracks file reads and prompts compact after significant exploration
 *
 * Triggers: Read, Grep, Glob
 * Uses state file to track exploration depth, prompts after threshold
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const stateDir = path.join(os.homedir(), '.praetorian');
const stateFile = path.join(stateDir, '.exploration-state.json');

// Ensure state directory exists
if (!fs.existsSync(stateDir)) {
  fs.mkdirSync(stateDir, { recursive: true });
}

// Load or initialize state
function loadState() {
  try {
    if (fs.existsSync(stateFile)) {
      const data = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
      // Reset if older than 1 hour (different session)
      if (Date.now() - data.timestamp > 3600000) {
        return { reads: 0, greps: 0, globs: 0, prompted: false, timestamp: Date.now() };
      }
      return data;
    }
  } catch (e) { /* ignore */ }
  return { reads: 0, greps: 0, globs: 0, prompted: false, timestamp: Date.now() };
}

function saveState(state) {
  try {
    state.timestamp = Date.now();
    fs.writeFileSync(stateFile, JSON.stringify(state));
  } catch (e) { /* ignore */ }
}

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const { tool_name, error } = data;

    if (error) process.exit(0);

    const state = loadState();

    // Increment counters
    if (tool_name === 'Read') state.reads++;
    if (tool_name === 'Grep') state.greps++;
    if (tool_name === 'Glob') state.globs++;

    const totalExploration = state.reads + state.greps + state.globs;

    // Prompt after significant exploration (5+ operations) and not already prompted
    if (totalExploration >= 5 && !state.prompted) {
      state.prompted = true;
      saveState(state);

      console.log(JSON.stringify({
        hookSpecificOutput: {
          additionalContext: `<system-reminder>⚜️ [claude-praetorian] Exploration milestone: ${state.reads} reads, ${state.greps} greps, ${state.globs} globs.

Compact findings: praetorian_compact(type="file_reads", title="<area>", key_insights=[...], refs=[...])</system-reminder>`
        }
      }));
    } else {
      saveState(state);
    }
  } catch (e) {
    // Silent fail
  }
});

#!/usr/bin/env node
/**
 * Session Start Hook - Smart, non-intrusive context restoration
 *
 * ONLY prompts when:
 * - Project-relevant compactions exist (high value)
 * - OR recent compactions exist AND it's been >1 hour since last session
 *
 * Silent otherwise - no noise for empty/irrelevant state
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const compactionsDir = path.join(os.homedir(), '.praetorian', 'compactions');
const stateDir = path.join(os.homedir(), '.praetorian');
const stateFile = path.join(stateDir, '.exploration-state.json');
const lastSessionFile = path.join(stateDir, '.last-session');

// Clean up exploration state from previous session
function resetExplorationState() {
  try {
    if (fs.existsSync(stateFile)) {
      fs.unlinkSync(stateFile);
    }
  } catch (e) { /* ignore */ }
}

// Track session start time
function recordSessionStart() {
  try {
    if (!fs.existsSync(stateDir)) {
      fs.mkdirSync(stateDir, { recursive: true });
    }
    fs.writeFileSync(lastSessionFile, Date.now().toString());
  } catch (e) { /* ignore */ }
}

// Get current project name from cwd
function getCurrentProject() {
  try {
    return path.basename(process.cwd()).toLowerCase();
  } catch (e) {
    return null;
  }
}

// Read and parse compaction files
function getCompactions() {
  if (!fs.existsSync(compactionsDir)) return [];

  try {
    return fs.readdirSync(compactionsDir)
      .filter(f => f.endsWith('.json'))
      .map(f => {
        try {
          const filepath = path.join(compactionsDir, f);
          const stat = fs.statSync(filepath);
          const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
          return {
            title: data.title || f.replace('.json', ''),
            type: data.type || 'unknown',
            mtime: stat.mtime,
            refs: data.refs || [],
            insights: (data.key_insights || []).length
          };
        } catch { return null; }
      })
      .filter(Boolean)
      .sort((a, b) => b.mtime - a.mtime);
  } catch (e) {
    return [];
  }
}

function isRelevantToProject(compaction, project) {
  if (!project) return false;
  const titleLower = compaction.title.toLowerCase();
  const refsStr = compaction.refs.join(' ').toLowerCase();
  return titleLower.includes(project) || refsStr.includes(project);
}

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// Main
resetExplorationState();
recordSessionStart();

const compactions = getCompactions();
const project = getCurrentProject();

// Silent exit if no compactions
if (compactions.length === 0) {
  process.exit(0);
}

// Find project-relevant compactions
const relevant = compactions.filter(c => isRelevantToProject(c, project)).slice(0, 3);

// Only show message if we have relevant context
if (relevant.length === 0) {
  // No project-relevant context - stay silent, don't add noise
  process.exit(0);
}

// Calculate total insights available
const totalInsights = relevant.reduce((sum, c) => sum + c.insights, 0);

const tokenSavings = totalInsights * 50;
let message = `⚜️ [claude-praetorian] ${relevant.length} compaction${relevant.length > 1 ? 's' : ''} available for "${project}":\n`;
relevant.forEach(c => {
  message += `  • ${c.title} (${c.type}, ${timeAgo(c.mtime)})\n`;
});
message += `Only restore if relevant to current task: praetorian_restore("query")`;

console.log(JSON.stringify({
  hookSpecificOutput: {
    additionalContext: `<system-reminder>${message}</system-reminder>`
  }
}));

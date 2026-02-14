#!/usr/bin/env node
/**
 * Pre-Plan Hook - Check for prior compactions before entering plan mode
 *
 * Triggers: PreToolUse(EnterPlanMode)
 * Reads project-local index.json for compaction metadata.
 * Silent if no compactions exist.
 */

const fs = require('fs');
const path = require('path');

const praetorianDir = path.join(process.cwd(), '.claude', 'praetorian');
const indexPath = path.join(praetorianDir, 'index.json');

// Silent exit if no praetorian data for this project
if (!fs.existsSync(indexPath)) {
  process.exit(0);
}

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });

process.stdin.on('end', () => {
  try {
    const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    const compactions = Object.values(index.compactions || {});

    if (compactions.length === 0) {
      process.exit(0);
    }

    // Sort by updated date, show most recent
    compactions.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    const recent = compactions.slice(0, 5);

    const lines = recent.map(c => {
      const age = timeAgo(new Date(c.updated));
      return `  - "${c.title}" (${c.type}, ${age})`;
    });

    const message = `⚜️ [claude-praetorian] ${compactions.length} compaction${compactions.length > 1 ? 's' : ''} found for this project:
${lines.join('\n')}

Consider praetorian_restore("query") before planning to avoid re-research.`;

    console.log(JSON.stringify({
      hookSpecificOutput: {
        additionalContext: `<system-reminder>${message}</system-reminder>`
      }
    }));
  } catch (e) {
    // Silent fail - don't block plan mode
    process.exit(0);
  }
});

// Handle immediate stdin close
setTimeout(() => { if (!input) process.exit(0); }, 100);

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

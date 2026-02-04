#!/usr/bin/env node
/**
 * Session Start Hook - Prompts Claude to restore previous context
 *
 * WRAPPER: Doesn't call restore directly - prompts Claude to use the MCP tool
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const compactionsDir = path.join(os.homedir(), '.praetorian', 'compactions');

try {
  if (fs.existsSync(compactionsDir)) {
    const files = fs.readdirSync(compactionsDir)
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse()
      .slice(0, 5);

    if (files.length > 0) {
      // Build summary of recent compactions
      const summaries = files.map(f => {
        try {
          const filepath = path.join(compactionsDir, f);
          const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
          return `  - ${data.title || f} (${data.type || 'unknown'})`;
        } catch {
          return null;
        }
      }).filter(Boolean).join('\n');

      if (summaries) {
        console.log(JSON.stringify({
          hookSpecificOutput: {
            additionalContext: `<system-reminder>⚜️ Praetorian: Previous context available (${files.length} compactions):
${summaries}

Call praetorian_restore() to load relevant work, or praetorian_restore(query) to search.</system-reminder>`
          }
        }));
      }
    }
  }
} catch (e) {
  // Silent fail - don't block session start
}

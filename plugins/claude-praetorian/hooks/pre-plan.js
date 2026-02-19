#!/usr/bin/env node
/**
 * Pre-Plan Hook - Check for prior compactions before entering plan mode
 *
 * Triggers: PreToolUse(EnterPlanMode)
 * Reads project-local index.json for compaction metadata.
 * Silent if no compactions exist.
 *
 * Synergy: mentions historian/oracle if siblings are enabled.
 */

const fs = require('fs');
const path = require('path');
const { readStdin, emit, timeAgo, siblings } = require('../../shared/utils');

const praetorianDir = path.join(process.cwd(), '.claude', 'praetorian');
const indexPath = path.join(praetorianDir, 'index.json');

if (!fs.existsSync(indexPath)) {
  process.exit(0);
}

(async () => {
  await readStdin();

  try {
    const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    const compactions = Object.values(index.compactions || {});

    if (compactions.length === 0) {
      process.exit(0);
    }

    compactions.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    const recent = compactions.slice(0, 5);

    const lines = recent.map(c => {
      const age = timeAgo(new Date(c.updated));
      return `  - "${c.title}" (${c.type}, ${age})`;
    });

    const peer = siblings();
    let synergy = '';
    if (peer.historian) {
      synergy += '\n📜 [claude-historian] is active — past plans and decisions will also be searched.';
    }
    if (peer.oracle) {
      synergy += '\n🔮 [claude-oracle] is active — relevant tools will also be discovered.';
    }

    emit(`⚜️ [claude-praetorian] ${compactions.length} compaction${compactions.length > 1 ? 's' : ''} found for this project:
${lines.join('\n')}

Consider praetorian_restore("query") before planning to avoid re-research.${synergy}`);
  } catch {
    process.exit(0);
  }
})();

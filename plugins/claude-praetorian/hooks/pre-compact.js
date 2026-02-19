#!/usr/bin/env node
/**
 * Pre-Compact Hook - Save context before compaction resets it
 *
 * Triggers: PreCompact (fires before Claude's auto-compaction)
 * This is the critical hook that prevents context loss.
 *
 * Synergy: reminds to include oracle discoveries if oracle is active.
 */

const { readStdin, emit, siblings } = require('../../shared/utils');

(async () => {
  await readStdin();

  const peer = siblings();
  let synergy = '';
  if (peer.oracle) {
    synergy += '\n🔮 [claude-oracle] is active — include any tool discoveries in the compaction.';
  }

  emit(`⚜️ [claude-praetorian] Context compaction imminent - SAVE NOW.

Call praetorian_compact() to preserve valuable work before context resets:
- type: "decisions" for architectural choices and trade-offs
- type: "file_reads" for codebase patterns and key file locations
- type: "task_result" for subagent findings and exploration results
- type: "web_research" for API docs and external research

Auto-merges with existing compactions of the same title.${synergy}`);
})();

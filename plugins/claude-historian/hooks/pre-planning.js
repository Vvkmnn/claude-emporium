#!/usr/bin/env node
/**
 * Pre-Planning Hook - Check historian before entering plan mode
 *
 * Triggers: PreToolUse(EnterPlanMode)
 * Prompts Claude to check search_plans() for past approaches.
 *
 * Settings: search_before_plan (default: true)
 * Synergy: notes oracle will search for tools, praetorian has compactions.
 */

const path = require('path');
const { readStdin, emit, loadSettings, siblings } = require('../../shared/utils');

(async () => {
  await readStdin();

  const settings = loadSettings('claude-historian');
  if (!settings.search_before_plan) process.exit(0);

  const project = path.basename(process.cwd());

  const peer = siblings();
  let synergy = '';
  if (peer.praetorian) {
    synergy += '\n⚜️ [claude-praetorian] is active — check praetorian_restore() for saved compactions too.';
  }
  if (peer.oracle) {
    synergy += '\n🔮 [claude-oracle] is active — relevant tools will also be discovered.';
  }

  emit(`📜 [claude-historian] Before planning, check for past implementation approaches.

mcp__claude-historian-mcp__search_plans(query="${project}", limit=3)

Past plans may contain:
- Architectural decisions and rationale
- Implementation strategies that worked
- Edge cases and gotchas discovered

Token savings: ~300-800 tokens if similar work was done${synergy}`);
})();

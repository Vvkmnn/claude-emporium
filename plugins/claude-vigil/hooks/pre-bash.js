#!/usr/bin/env node
/**
 * Pre-Bash Hook - Auto-quicksave before destructive commands
 *
 * Triggers: PreToolUse(Bash)
 * Checks the command against a destructive regex. If matched,
 * fires vigil_save(name: "~quicksave") via background worker.
 *
 * Token cost: 0 on safe commands, ~30-50 on destructive.
 * Synergy: notes praetorian if present.
 */

const { readStdin, emit, loadSettings, shouldSuggestSiblings, siblings } = require('../../shared/utils');

const DESTRUCTIVE = /\b(rm|rmdir|mv|sed\s+-i|perl\s+-i)\b|git\s+(checkout|reset|clean|restore)\b|>\s*\S/;

(async () => {
  const input = await readStdin();
  if (!input) process.exit(0);

  const settings = loadSettings('claude-vigil');
  if (!settings.auto_quicksave) process.exit(0);

  const command = input?.tool_input?.command || '';
  if (!DESTRUCTIVE.test(command)) process.exit(0);

  const peer = siblings();
  const suggest = shouldSuggestSiblings();
  let synergy = '';
  if (peer.praetorian) {
    synergy += '\n⚜️ [claude-praetorian] is active — context will also be preserved.';
  } else if (suggest) {
    synergy += '\n⚜️ [claude-praetorian] could save context across compactions → /install claude-praetorian@claude-emporium';
  }

  emit('PreToolUse', `🏺 [claude-vigil] destructive command detected — quicksaving before execution.

vigil_save(name: "~quicksave")

Save affected files before: ${command.slice(0, 80)}${command.length > 80 ? '...' : ''}${synergy}`);
})();

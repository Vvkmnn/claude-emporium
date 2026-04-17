/**
 * Shared utilities for claude-emporium plugins.
 *
 * - Settings: global config via ~/.claude/settings.json → claude-emporium key
 * - Synergy: detect sibling plugins via ~/.claude/settings.json → enabledPlugins
 * - I/O: stdin helper for hook scripts
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// --- settings ---

const SETTINGS_PATH = path.join(os.homedir(), '.claude', 'settings.json');

const DEFAULTS = {
  'claude-praetorian': {
    auto_compact_research: true,
    auto_compact_subagent: true,
    check_compactions_before_plan: true,
    remind_compact: true,
  },
  'claude-historian': {
    search_before_web: true,
    search_before_plan: true,
    search_before_task: true,
    search_after_error: true,
  },
  'claude-oracle': {
    search_before_plan: true,
    search_after_error: true,
  },
  'claude-gladiator': {
    observe_after_failure: true,
    reflect_before_stop: true,
  },
  'claude-vigil': {
    auto_quicksave: true,
  },
  'claude-orator': {
    optimize_subagent_prompts: true,
  },
};

/**
 * Read the claude-emporium section from ~/.claude/settings.json.
 * Returns {} if file is missing or malformed.
 */
function readEmporiumSettings() {
  try {
    const json = JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf8'));
    return json['claude-emporium'] || {};
  } catch {
    return {};
  }
}

/**
 * Load settings for a plugin from ~/.claude/settings.json → claude-emporium → pluginName.
 * Returns defaults merged with user overrides.
 */
function loadSettings(pluginName) {
  const defaults = DEFAULTS[pluginName] || {};
  const emporium = readEmporiumSettings();
  const overrides = emporium[pluginName] || {};
  return { ...defaults, ...overrides };
}

/**
 * Whether to show sibling install suggestions.
 * Defaults to true; set claude-emporium.suggest_siblings: false to suppress.
 */
function shouldSuggestSiblings() {
  const emporium = readEmporiumSettings();
  return emporium.suggest_siblings !== false;
}

// --- synergy ---

const EMPORIUM_PLUGINS = {
  praetorian: 'claude-praetorian@claude-emporium',
  historian: 'claude-historian@claude-emporium',
  oracle: 'claude-oracle@claude-emporium',
  gladiator: 'claude-gladiator@claude-emporium',
  vigil: 'claude-vigil@claude-emporium',
  orator: 'claude-orator@claude-emporium',
};

/**
 * Check if a sibling emporium plugin is enabled.
 * Reads ~/.claude/settings.json → enabledPlugins.
 */
function hasSibling(name) {
  const key = EMPORIUM_PLUGINS[name];
  if (!key) return false;

  try {
    const settingsPath = path.join(os.homedir(), '.claude', 'settings.json');
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    return settings.enabledPlugins?.[key] === true;
  } catch {
    return false;
  }
}

/**
 * Return object with boolean flags for each sibling plugin.
 */
function siblings() {
  return {
    praetorian: hasSibling('praetorian'),
    historian: hasSibling('historian'),
    oracle: hasSibling('oracle'),
    gladiator: hasSibling('gladiator'),
    vigil: hasSibling('vigil'),
    orator: hasSibling('orator'),
  };
}

// --- i/o ---

/**
 * Read stdin as a promise. Resolves with parsed JSON or null.
 */
function readStdin() {
  return new Promise((resolve) => {
    let input = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { input += chunk; });
    process.stdin.on('end', () => {
      try { resolve(JSON.parse(input)); }
      catch { resolve(null); }
    });
    setTimeout(() => { if (!input) resolve(null); }, 100);
  });
}

/**
 * Valid Claude Code hook event names. Used to validate the first argument of
 * emit() and to route output to a schema-valid shape.
 */
const HOOK_EVENT_NAMES = new Set([
  'PreToolUse',
  'PostToolUse',
  'UserPromptSubmit',
  'SessionStart',
  'SessionEnd',
  'Stop',
  'SubagentStop',
  'PreCompact',
  'Notification',
]);

/**
 * Events whose `hookSpecificOutput` accepts `additionalContext` per the
 * Claude Code hook schema. PreToolUse is intentionally excluded: its
 * hookSpecificOutput only supports permissionDecision / permissionDecisionReason.
 * Emitting additionalContext there fails schema validation and surfaces as
 * "PreToolUse:<Tool> hook error" in the CLI.
 */
const ADDITIONAL_CONTEXT_EVENTS = new Set([
  'PostToolUse',
  'UserPromptSubmit',
  'SessionStart',
]);

/**
 * Emit hook output for a given hook event.
 *
 * The `hookEventName` field is required inside `hookSpecificOutput` by the
 * Claude Code hook schema. Previous versions of this helper omitted it and
 * always used the additionalContext field, which caused PreToolUse hooks to
 * fail schema validation on every invocation.
 *
 * Behaviour per event:
 *   - Events that accept additionalContext (PostToolUse, UserPromptSubmit,
 *     SessionStart) receive it inside hookSpecificOutput, wrapped in a
 *     <system-reminder> tag.
 *   - All other events (PreToolUse, Stop, PreCompact, ...) receive the
 *     message via the top-level `systemMessage` field, which is valid for
 *     every hook event and visible to the user in transcript mode.
 */
function emit(hookEventName, message) {
  if (!HOOK_EVENT_NAMES.has(hookEventName)) {
    throw new Error(`emit(): unknown hookEventName "${hookEventName}"`);
  }

  const output = {
    hookSpecificOutput: {hookEventName},
  };

  const wrapped = `<system-reminder>${message}</system-reminder>`;

  if (ADDITIONAL_CONTEXT_EVENTS.has(hookEventName)) {
    output.hookSpecificOutput.additionalContext = wrapped;
  } else {
    output.systemMessage = message;
  }

  console.log(JSON.stringify(output));
}

/**
 * Time ago string from a date.
 */
function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

module.exports = { loadSettings, shouldSuggestSiblings, hasSibling, siblings, readStdin, emit, timeAgo };

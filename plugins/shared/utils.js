/**
 * Shared utilities for claude-emporium plugins.
 *
 * - Settings: per-project config via .claude/<plugin>.local.md
 * - Synergy: detect sibling plugins via ~/.claude/settings.json
 * - I/O: stdin helper for hook scripts
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// --- settings ---

const DEFAULTS = {
  'claude-praetorian': {
    auto_compact_research: true,
    auto_compact_subagent: true,
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
};

/**
 * Load per-project settings from .claude/<plugin>.local.md frontmatter.
 * Returns defaults if file is missing or malformed.
 */
function loadSettings(pluginName) {
  const defaults = DEFAULTS[pluginName] || {};
  const settingsPath = path.join(process.cwd(), '.claude', `${pluginName}.local.md`);

  try {
    const content = fs.readFileSync(settingsPath, 'utf8');
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return defaults;

    const overrides = {};
    for (const line of match[1].split('\n')) {
      const [key, ...rest] = line.split(':');
      if (!key || !rest.length) continue;
      const val = rest.join(':').trim();
      if (val === 'true') overrides[key.trim()] = true;
      else if (val === 'false') overrides[key.trim()] = false;
      else overrides[key.trim()] = val;
    }
    return { ...defaults, ...overrides };
  } catch {
    return defaults;
  }
}

// --- synergy ---

const EMPORIUM_PLUGINS = {
  praetorian: 'claude-praetorian@claude-emporium',
  historian: 'claude-historian@claude-emporium',
  oracle: 'claude-oracle@claude-emporium',
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
 * Emit hook output with additionalContext.
 */
function emit(message) {
  console.log(JSON.stringify({
    hookSpecificOutput: {
      additionalContext: `<system-reminder>${message}</system-reminder>`,
    },
  }));
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

module.exports = { loadSettings, hasSibling, siblings, readStdin, emit, timeAgo };

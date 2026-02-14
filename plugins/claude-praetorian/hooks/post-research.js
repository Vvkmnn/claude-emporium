#!/usr/bin/env node
/**
 * Post-Research Hook - Prompt to compact after web research
 *
 * Triggers: PostToolUse(WebFetch|WebSearch)
 * Prompts Claude to use praetorian_compact() for web research findings.
 */

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const { tool_name, error } = data;

    // Don't prompt on errors
    if (error) {
      process.exit(0);
    }

    const hints = {
      WebFetch: 'Extract: key facts, URLs, code snippets',
      WebSearch: 'Extract: key facts, source URLs, relevant findings'
    };

    const hint = hints[tool_name];
    if (hint) {
      console.log(JSON.stringify({
        hookSpecificOutput: {
          additionalContext: `<system-reminder>⚜️ [claude-praetorian] Web research completed - compact findings.

praetorian_compact(type="web_research", title="<topic>", key_insights=[...], refs=[...])
${hint}</system-reminder>`
        }
      }));
    }
  } catch (e) {
    // Silent fail - don't break tool execution
  }
});

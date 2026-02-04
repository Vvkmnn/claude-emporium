#!/usr/bin/env node
/**
 * Pre-Planning Hook - Check historian before entering plan mode
 *
 * Triggers: EnterPlanMode
 * Prompts Claude to check search_plans() for past approaches
 */

const path = require('path');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });

process.stdin.on('end', () => {
  try {
    // Get current project for context
    const project = path.basename(process.cwd());

    console.log(JSON.stringify({
      hookSpecificOutput: {
        additionalContext: `<system-reminder>📜 [claude-historian] Before planning, check for past implementation approaches.

mcp__claude-historian-mcp__search_plans(query="${project}", limit=3)

Past plans may contain:
- Architectural decisions and rationale
- Implementation strategies that worked
- Edge cases and gotchas discovered

Token savings: ~300-800 tokens if similar work was done</system-reminder>`
      }
    }));
  } catch (e) {
    // Silent fail - don't block planning
  }
});

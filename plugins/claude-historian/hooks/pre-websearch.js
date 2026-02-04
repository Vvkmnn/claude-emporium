#!/usr/bin/env node
/**
 * Pre-WebSearch Hook - Check historian before web research
 *
 * Triggers: WebSearch, WebFetch
 * Prompts Claude to check find_similar_queries() first
 */

const path = require('path');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const { tool_input } = data;

    // Extract query from tool input
    let query = '';
    if (tool_input) {
      query = tool_input.query || tool_input.url || tool_input.prompt || '';
    }

    // Get current project for context
    const project = path.basename(process.cwd());

    const hint = query
      ? `Query: "${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"`
      : `Project: ${project}`;

    console.log(JSON.stringify({
      hookSpecificOutput: {
        additionalContext: `<system-reminder>📜 [claude-historian] Before searching the web, check if you've researched this before.

mcp__claude-historian-mcp__find_similar_queries(query="${query || project}", limit=3)

${hint}
Token savings: ~200-500 tokens if already answered</system-reminder>`
      }
    }));
  } catch (e) {
    // Silent fail - don't block web search
  }
});

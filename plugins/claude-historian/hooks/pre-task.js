#!/usr/bin/env node
/**
 * Pre-Task Hook - Check historian before launching agents
 *
 * Triggers: Task (subagent launch)
 * Prompts Claude to check find_tool_patterns() for successful workflows
 */

const path = require('path');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const { tool_input } = data;

    // Extract agent type and description from Task input
    let agentType = '';
    let description = '';
    if (tool_input) {
      agentType = tool_input.subagent_type || tool_input.agent_type || '';
      description = tool_input.description || tool_input.prompt || '';
    }

    // Get current project for context
    const project = path.basename(process.cwd());

    const hint = agentType
      ? `Agent: ${agentType}`
      : description
        ? `Task: "${description.substring(0, 40)}..."`
        : `Project: ${project}`;

    console.log(JSON.stringify({
      hookSpecificOutput: {
        additionalContext: `<system-reminder>📜 [claude-historian] Before launching agent, check what worked before.

mcp__claude-historian-mcp__find_tool_patterns(tool_name="${agentType || 'Task'}", limit=5)

${hint}
Past patterns show: successful tool sequences, effective prompts, approaches that worked</system-reminder>`
      }
    }));
  } catch (e) {
    // Silent fail - don't block agent launch
  }
});

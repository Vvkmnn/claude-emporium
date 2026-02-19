#!/usr/bin/env node
/**
 * Pre-Task Hook - Check historian before launching agents
 *
 * Triggers: PreToolUse(Task)
 * Prompts Claude to check find_tool_patterns() for successful workflows.
 *
 * Settings: search_before_task (default: true)
 */

const path = require('path');
const { readStdin, emit, loadSettings } = require('../../shared/utils');

(async () => {
  const data = await readStdin();
  if (!data) process.exit(0);

  const settings = loadSettings('claude-historian');
  if (!settings.search_before_task) process.exit(0);

  const { tool_input } = data;
  let agentType = '';
  let description = '';
  if (tool_input) {
    agentType = tool_input.subagent_type || tool_input.agent_type || '';
    description = tool_input.description || tool_input.prompt || '';
  }

  const project = path.basename(process.cwd());
  const hint = agentType
    ? `Agent: ${agentType}`
    : description
      ? `Task: "${description.substring(0, 40)}..."`
      : `Project: ${project}`;

  emit(`📜 [claude-historian] Before launching agent, check what worked before.

mcp__claude-historian-mcp__find_tool_patterns(tool_name="${agentType || 'Task'}", limit=5)

${hint}
Past patterns show: successful tool sequences, effective prompts, approaches that worked`);
})();

#!/usr/bin/env node
/**
 * Pre-Task Hook - Suggest prompt optimization before launching agents
 *
 * Triggers: PreToolUse(Task)
 * Heuristic check: skips well-structured prompts (XML tags, markdown headers, action verbs).
 * Never blocks — suggestion only.
 *
 * Settings: optimize_subagent_prompts (default: true)
 */

const { readStdin, emit, loadSettings } = require('../../shared/utils');

(async () => {
  const data = await readStdin();
  if (!data) process.exit(0);

  const settings = loadSettings('claude-orator');
  if (!settings.optimize_subagent_prompts) process.exit(0);

  const prompt = data?.tool_input?.prompt;
  if (!prompt || prompt.length < 50) process.exit(0);

  // Quick heuristic: skip well-structured prompts
  const hasStructure = /<\w+>/.test(prompt) || /^#{1,3}\s/m.test(prompt);
  const hasVerb = /^(write|create|implement|analyze|extract|find|search|review|fix|debug)\b/i.test(prompt);
  if (hasStructure || hasVerb) process.exit(0);

  emit(`🪶 [claude-orator] Prompt lacks structure and clear intent — consider orator_optimize before dispatching.

mcp__claude-orator-mcp__orator_optimize(prompt="${prompt.substring(0, 80)}...")

Scores clarity, specificity, structure, context, examples, constraints, and tone on a 1-10 scale. Returns restructured prompt with applied techniques.`);
})();

---
name: reprompt-orator
description: Optimize a prompt using Anthropic best practices
arguments: prompt
---

# /reprompt-orator

Optimize a prompt for clarity, structure, and effectiveness using 8 Anthropic techniques.

## Usage

- `/reprompt-orator "find all auth bugs"` - Optimize a short prompt
- `/reprompt-orator <paste long prompt>` - Score and restructure any prompt

## Action

Call `mcp__claude-orator-mcp__orator_optimize` with:
- `prompt`: The prompt text to optimize

Returns: score breakdown (7 dimensions, 1-10 each), applied techniques, and restructured prompt.

## Dimensions

Clarity · Specificity · Structure · Context · Examples · Constraints · Tone

## Techniques

System prompts · XML tags · Chain of thought · Few-shot · Prefill · Long context · Extended thinking · Tool use

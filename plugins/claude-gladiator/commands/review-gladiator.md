---
name: review-gladiator
description: Batch learn from session history and reflect
arguments: topic?
---

# /review-gladiator

Review accumulated observations, enrich with session history, and generate recommendations.

## Usage

- `/review-gladiator` - Reflect on all unprocessed observations
- `/review-gladiator auth` - Focus reflection on auth-related patterns

## Action

1. If **historian** sibling is active:
   - `list_recent_sessions()` to get session references
   - `gladiator_observe(source: "conversation", session_ref: <ref>)` for relevant sessions
2. Call `gladiator_reflect()` to cluster observations and generate recommendations
3. If **oracle** sibling is active:
   - Search for existing solutions before proposing new artifacts
4. Present recommendations to user with proposed changes

## When to Use

- **After a long session**: Before context is lost
- **After shipping**: Natural checkpoint to capture learnings
- **Periodically**: Every few sessions to evolve your workflow
- **After repeated errors**: When patterns emerge worth encoding

## Example Output

```
gladiator_reflect()

3 clusters found:
1. "Edit failures" (5 observations)
   → Recommendation: Add context lines to Edit calls
   → Existing rule at ~/.claude/rules/avoid.md could be updated

2. "Test-first pattern" (3 observations)
   → Recommendation: Encode TDD workflow for this project
   → 🔮 oracle found: tdd-workflows plugin (already installed)
```

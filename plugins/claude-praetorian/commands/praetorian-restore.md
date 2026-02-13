---
name: praetorian-restore
description: Load previous context from praetorian memory
arguments: query?
---

# /praetorian-restore

Load previous work from praetorian memory.

## Usage

- `/praetorian-restore` - Show recent compactions (last 3-5)
- `/praetorian-restore auth` - Search for auth-related context
- `/praetorian-restore "API design"` - Search for specific topic

## Action

Call `praetorian_restore(query?)` and summarize the results:
- Without query: Returns most recent compactions
- With query: Semantic search across all compactions

## When to Use

- **Session start**: Check if previous work exists for current task
- **Resuming work**: Load context from previous sessions
- **Context low**: Restore key insights before compaction clears context

## Example Output

```
Found 2 relevant compactions:

1. "Auth Implementation" (decisions, Jan 9)
   - Using JWT with refresh tokens
   - Storing tokens in httpOnly cookies
   - Middleware pattern at src/middleware/auth.ts

2. "API Research" (web_research, Jan 8)
   - REST best practices from OpenAPI spec
   - Rate limiting patterns
```

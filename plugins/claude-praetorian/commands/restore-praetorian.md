---
name: restore-praetorian
description: Load previous context from praetorian memory
arguments: query?
---

# /restore-praetorian

Load previous work from praetorian memory.

## Usage

- `/restore-praetorian` - Show recent compactions (last 3-5)
- `/restore-praetorian auth` - Search for auth-related context
- `/restore-praetorian "API design"` - Search for specific topic

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

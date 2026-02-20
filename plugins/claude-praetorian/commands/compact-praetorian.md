---
name: compact-praetorian
description: Save current context to praetorian memory
arguments: type?, title?
---

# /compact-praetorian

Save valuable context for future sessions using praetorian memory.

## Usage

- `/compact-praetorian` - Interactive mode (you'll be asked for type and title)
- `/compact-praetorian web_research` - Save as web research
- `/compact-praetorian task_result "Auth implementation"` - Save with title

## Types

| Type | Use For |
|------|---------|
| `web_research` | WebFetch results, API docs, research |
| `task_result` | Subagent results, exploration findings |
| `file_reads` | Codebase patterns, architecture insights |
| `decisions` | Technical decisions with rationale |

## Action

Call `praetorian_compact()` with:
- `type`: One of the types above
- `title`: Concise description of what's being saved
- `key_insights`: Array of main findings
- `refs`: Array of file:line references (if applicable)

## Example

```
praetorian_compact(
  type: "web_research",
  title: "React 19 Server Components",
  key_insights: [
    "Server components can't use useState/useEffect",
    "Use 'use client' directive for client components",
    "Server components can directly access databases"
  ],
  refs: []
)
```

---
name: save-vigil
description: Create a named file checkpoint
arguments: name, files?
---

# /save-vigil

Create a named checkpoint of files for later recovery.

## Usage

- `/save-vigil auth-refactor` - Save with a name
- `/save-vigil pre-migration src/db/**` - Save specific files

## Action

Call `vigil_save(name: "<name>", files: [<paths>])` with:
- `name`: Descriptive checkpoint name
- `files`: Array of file paths to snapshot (defaults to recently modified files)

## Slots

3 named slots + 1 rotating `~quicksave` (auto-managed by hooks). Named saves persist until explicitly deleted.

## Example

```
vigil_save(
  name: "before-auth-rewrite",
  files: ["src/auth/handler.ts", "src/middleware/session.ts"]
)
```

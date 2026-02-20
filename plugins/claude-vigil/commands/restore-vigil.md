---
name: restore-vigil
description: Restore files from a checkpoint
arguments: name?
---

# /restore-vigil

Restore files from a previously saved checkpoint.

## Usage

- `/restore-vigil` - List available checkpoints
- `/restore-vigil auth-refactor` - Restore specific checkpoint

## Action

1. Call `vigil_list()` to show available checkpoints
2. Optionally call `vigil_diff(name: "<name>")` to preview changes
3. Call `vigil_restore(name: "<name>")` to restore

## Example

```
> vigil_list()
Checkpoints:
  1. "before-auth-rewrite" (2 files, 3m ago)
  2. "~quicksave" (1 file, 30s ago)

> vigil_diff(name: "before-auth-rewrite")
src/auth/handler.ts: 12 lines changed

> vigil_restore(name: "before-auth-rewrite")
Restored 2 files from "before-auth-rewrite"
```

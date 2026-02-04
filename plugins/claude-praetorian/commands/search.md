---
name: search
description: Search praetorian memory for past context
arguments: query
---

# /search

Search for specific context in praetorian memory.

## Usage

- `/search auth` - Find auth-related compactions
- `/search "API design"` - Search for specific topic
- `/search decisions` - Find all decision records

## Action

Call `praetorian_restore(query)` with the search term and summarize:
- Matching compactions with titles and types
- Key insights from each match
- Relevant file references

## Examples

```
/search authentication
```
Returns compactions about auth implementation, JWT patterns, session management, etc.

```
/search file_reads
```
Returns all codebase exploration compactions.

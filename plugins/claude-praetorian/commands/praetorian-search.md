---
name: praetorian-search
description: Search praetorian memory for past context
arguments: query
---

# /praetorian-search

Search for specific context in praetorian memory.

## Usage

- `/praetorian-search auth` - Find auth-related compactions
- `/praetorian-search "API design"` - Search for specific topic
- `/praetorian-search decisions` - Find all decision records

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

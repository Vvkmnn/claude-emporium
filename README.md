<p align="center">
  <img src="logo/claude-roman.svg" width="240" height="240" alt="roma victrix">
</p>

<h1 align="center">claude emporium</h1>
<p align="center">
 A plugin marketplace for claude code<br>
  <a href="#install">install</a> · <a href="#plugins">plugins</a> · <a href="#synergy">synergy</a> · <a href="#architecture">architecture</a> · <a href="#contributing">contributing</a>
</p>
<p align="center">
  <em>roma victrix</em>
</p>

---

three plugins that wrap standalone MCP servers with automation hooks, commands, and skills. no code duplication — plugins tell claude _when_ to act, MCPs handle _how_.

```
╔══════════════════════════════════════════════════════════════════════════════╗
║ claude emporium                                                              ║
║                                                                              ║
║ PLUGINS                                                                      ║
║                                                                              ║
║ ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐   ║
║ │    PRAETORIAN        │ │    HISTORIAN         │ │     ORACLE           │   ║
║ │  context guard       │ │  session memory      │ │  tool discovery      │   ║
║ ├──────────────────────┤ ├──────────────────────┤ ├──────────────────────┤   ║
║ │                      │ │                      │ │                      │   ║
║ │ hooks                │ │ hooks                │ │ hooks                │   ║
║ │ · pre-plan           │ │ · pre-websearch      │ │ · pre-plan           │   ║
║ │ · pre-compact        │ │ · pre-plan           │ │ · post-error         │   ║
║ │ · post-research      │ │ · pre-task           │ │                      │   ║
║ │ · subagent-stop      │ │ · post-error         │ │ commands             │   ║
║ │                      │ │                      │ │ · /oracle-search     │   ║
║ │ commands             │ │ commands             │ │ · /oracle-browse     │   ║
║ │ · /compact           │ │ · /historian-search  │ │                      │   ║
║ │ · /restore           │ │                      │ │                      │   ║
║ │ · /search            │ │                      │ │                      │   ║
║ │                      │ │                      │ │                      │   ║
║ └──────────────────────┘ └──────────────────────┘ └──────────────────────┘   ║
║              │                        │                        │             ║
║              ▼                        ▼                        ▼             ║
║                                                                              ║
║ MCP SERVERS                                                                  ║
║                                                                              ║
║ ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐   ║
║ │ praetorian-mcp       │ │  historian-mcp       │ │   oracle-mcp         │   ║
║ ├──────────────────────┤ ├──────────────────────┤ ├──────────────────────┤   ║
║ │                      │ │                      │ │                      │   ║
║ │ save_context         │ │ search_convos        │ │ search               │   ║
║ │ · snapshot before    │ │ · full-text across   │ │ · query 17 sources   │   ║
║ │   compaction         │ │   all sessions       │ │   in parallel        │   ║
║ │                      │ │                      │ │                      │   ║
║ │ restore_context      │ │ get_error_solutions  │ │ browse               │   ║
║ │ · load previous      │ │ · how past errors    │ │ · by category or     │   ║
║ │   session state      │ │   were resolved      │ │   popularity         │   ║
║ │                      │ │                      │ │                      │   ║
║ │ search_compactions   │ │ find_similar_query   │ │ sources              │   ║
║ │ · find past saves    │ │ · related past       │ │ · list registries    │   ║
║ │   by keyword         │ │   questions          │ │   and status         │   ║
║ │                      │ │                      │ │                      │   ║
║ │ list_compactions     │ │ find_file_context    │ │ ── ── ── ── ── ──    │   ║
║ │ · browse recent      │ │ · track changes      │ │ smithery · glama     │   ║
║ │   snapshots          │ │   across sessions    │ │ npm · github         │   ║
║ │                      │ │                      │ │ awesome-mcp          │   ║
║ │ ── ── ── ── ── ──    │ │ find_tool_patterns   │ │ mcp-registry         │   ║
║ │ storage:             │ │ · successful agent   │ │ + 11 more            │   ║
║ │ .claude/praetorian/  │ │   workflows          │ │                      │   ║
║ │                      │ │                      │ │ in-memory cache      │   ║
║ │                      │ │ search_plans         │ │ zero storage         │   ║
║ │                      │ │ · past plans and     │ │                      │   ║
║ │                      │ │   decisions          │ │                      │   ║
║ │                      │ │                      │ │                      │   ║
║ │                      │ │ list_recent          │ │                      │   ║
║ │                      │ │ · browse recent      │ │                      │   ║
║ │                      │ │   sessions           │ │                      │   ║
║ │                      │ │                      │ │                      │   ║
║ └──────────────────────┘ └──────────────────────┘ └──────────────────────┘   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

## install

```bash
# add the marketplace
/plugin marketplace add Vvkmnn/claude-emporium

# install plugins — each registers its MCP server automatically
/plugin install claude-praetorian@claude-emporium
/plugin install claude-historian@claude-emporium
/plugin install claude-oracle@claude-emporium

# or install standalone MCP servers only (no hooks, commands, or skills)
# claude mcp add praetorian -- bunx claude-praetorian-mcp  # https://github.com/Vvkmnn/claude-praetorian-mcp
# claude mcp add historian -- bunx claude-historian-mcp    # https://github.com/Vvkmnn/claude-historian-mcp
# claude mcp add oracle -- bunx claude-oracle-mcp          # https://github.com/Vvkmnn/claude-oracle-mcp
```

## plugins

<img src="logo/claude-praetorian.svg" width="160" height="160" align="right" alt="praetorian">
<h3>praetorian</h3>

context guard. saves and restores valuable context before compaction, after research, and when subagents complete.

| hook           | trigger                  | action                                    |
| -------------- | ------------------------ | ----------------------------------------- |
| `PreToolUse`   | `EnterPlanMode`          | lists prior compactions before planning   |
| `PreCompact`   | `*`                      | saves context before compaction resets it |
| `PostToolUse`  | `WebFetch` · `WebSearch` | prompts to compact research findings      |
| `SubagentStop` | `*`                      | prompts to compact subagent results       |

commands: `/praetorian-compact` · `/praetorian-restore` · `/praetorian-search`

mcp: [`claude-praetorian-mcp`](https://www.npmjs.com/package/claude-praetorian-mcp) — storage at `.claude/praetorian/`

<br clear="right"/>

---

<img src="logo/claude-historian.svg" width="160" height="160" align="right" alt="historian">
<h3>historian</h3>

session memory. checks past sessions before you do redundant research, planning, or debugging.

| hook          | trigger                  | action                                       |
| ------------- | ------------------------ | -------------------------------------------- |
| `PreToolUse`  | `WebSearch` · `WebFetch` | checks history before web research           |
| `PreToolUse`  | `EnterPlanMode`          | searches past plans before planning          |
| `PreToolUse`  | `Task`                   | checks tool patterns before launching agents |
| `PostToolUse` | `Bash`                   | suggests error solutions after failures      |

commands: `/historian-search`

mcp: [`claude-historian-mcp`](https://www.npmjs.com/package/claude-historian-mcp) — 7 search tools across conversations, errors, files, plans

<br clear="right"/>

---

<img src="logo/claude-oracle.svg" width="160" height="160" align="right" alt="oracle">
<h3>oracle</h3>

tool discovery. searches 17 sources in parallel to find relevant skills, plugins, and MCP servers.

| hook          | trigger         | action                                      |
| ------------- | --------------- | ------------------------------------------- |
| `PreToolUse`  | `EnterPlanMode` | searches for relevant tools before planning |
| `PostToolUse` | `Bash`          | searches for tools that solve errors        |

commands: `/oracle-search` · `/oracle-browse`

mcp: [`claude-oracle-mcp`](https://www.npmjs.com/package/claude-oracle-mcp) — smithery, glama, npm, github, awesome-mcp-servers, and more

<br clear="right"/>

## architecture

each plugin is a thin wrapper. hooks inject prompts that trigger MCP tools at high-impact moments. plugins contain no business logic — they tell claude _when_ to search, save, or restore. the MCP servers handle the actual work.

```
hook fires → plugin injects prompt → claude calls mcp → result flows back
```

zero setup beyond installation. no databases, no local storage (except praetorian's project-local `.claude/praetorian/`). all search is computed in-memory with TTL caching.

## synergy

each plugin works standalone. when multiple are installed, they detect siblings at runtime and coordinate — no configuration needed.

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                                                                     │
│                                                                     │
│     ⚜️ praetorian ◄─────────────────────────► 📜 historian          │
│     context guard                               session memory      │
│          │                                           │              │
│          │     compactions include oracle            │              │
│          │     discoveries when saving               │              │
│          │                                           │              │
│          │     historian notes praetorian            │              │
│          │     will compact research after           │              │
│          │                                           │              │
│          └──────────────► 🔮 ◄───────────────────────┘              │
│                         oracle                                      │
│                      tool discovery                                 │
│                                                                     │
│               oracle notes historian checking                       │
│               past solutions on errors                              │
│                                                                     │
│                                                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**enhanced behaviors when siblings are detected:**

| event         | plugin        | alone                                       | with siblings                                                    |
| ------------- | ------------- | ------------------------------------------- | ---------------------------------------------------------------- |
| plan          | ⚜️ praetorian | lists prior compactions                     | + historian searches past plans, oracle discovers tools          |
| plan          | 📜 historian  | searches past plans and decisions           | + oracle will also search for relevant tools                     |
| plan          | 🔮 oracle     | searches 17 registries for tools            | + historian has past plans, praetorian has compactions           |
| compact       | ⚜️ praetorian | snapshots context to `.claude/praetorian/`  | + includes oracle tool discoveries in the snapshot               |
| error         | 📜 historian  | searches past sessions for solutions        | + oracle also searching for tools that solve this class of error |
| error         | 🔮 oracle     | searches registries for error-solving tools | + historian checking how this error was solved before            |
| web search    | 📜 historian  | checks history before redundant research    | + praetorian will compact the research findings after            |
| subagent stop | ⚜️ praetorian | prompts to compact subagent results         | standalone — no sibling interaction                              |
| task launch   | 📜 historian  | checks tool patterns before agents          | standalone — no sibling interaction                              |

detection is one `fs.readFileSync` call (~1ms). falls back gracefully if settings are missing.

## contributing

bug fixes, improvements, and documentation PRs are welcome. new plugins and MCPs are authored by [@vvkmnn](https://github.com/Vvkmnn) — proposals are unlikely to be accepted unless they match the existing vision or inspire something new.

**good PRs:**

- better hook triggers and matchers
- bug fixes and edge case handling
- documentation and examples
- performance improvements

## troubleshooting

**plugin not triggering?** verify the mcp server is running: `claude mcp list`

**mcp not found?** install via npm: `claude mcp add <name> -- npx <package>`

**hook errors?** check that node.js is available and `CLAUDE_PLUGIN_ROOT` is set.

## license

MIT

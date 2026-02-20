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

five plugins that wrap standalone MCP servers with automation hooks, commands, and skills. no code duplication — plugins tell claude _when_ to act, MCPs handle _how_.

```
╔═╤════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╤═╗
║ │                                                                                                                    │ ║
║ │ PLUGINS                                                                                                            │ ║
║ │                                                                                                                    │ ║
║ │ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐ │ ║
║ │ │   PRAETORIAN       │ │   HISTORIAN        │ │   ORACLE           │ │   GLADIATOR        │ │   VIGIL            │ │ ║
║ │ │ context guard      │ │ session memory     │ │ tool discovery     │ │ learn & adapt      │ │ file recovery      │ │ ║
║ │ ├────────────────────┤ ├────────────────────┤ ├────────────────────┤ ├────────────────────┤ ├────────────────────┤ │ ║
║ │ │ hooks              │ │ hooks              │ │ hooks              │ │ hooks              │ │ hooks              │ │ ║
║ │ │ · pre-plan         │ │ · pre-websearch    │ │ · pre-plan         │ │ · post-error       │ │ · pre-bash         │ │ ║
║ │ │ · pre-compact      │ │ · pre-plan         │ │ · post-error       │ │ · stop             │ │                    │ │ ║
║ │ │ · post-research    │ │ · pre-task         │ │                    │ │                    │ │ commands           │ │ ║
║ │ │ · subagent-stop    │ │ · post-error       │ │ commands           │ │ commands           │ │ · /save-vigil      │ │ ║
║ │ │                    │ │                    │ │ · /search-oracle   │ │ · /review-         │ │ · /restore-vigil   │ │ ║
║ │ │ commands           │ │ commands           │ │                    │ │   gladiator        │ │                    │ │ ║
║ │ │ · /compact-        │ │ · /search-         │ │                    │ │                    │ │                    │ │ ║
║ │ │   praetorian       │ │   historian        │ │                    │ │                    │ │                    │ │ ║
║ │ │ · /restore-        │ │                    │ │                    │ │                    │ │                    │ │ ║
║ │ │   praetorian       │ │                    │ │                    │ │                    │ │                    │ │ ║
║ │ └────────────────────┘ └────────────────────┘ └────────────────────┘ └────────────────────┘ └────────────────────┘ │ ║
║ │            │                      │                      │                      │                      │           │ ║
║ │            ▼                      ▼                      ▼                      ▼                      ▼           │ ║
║ │                                                                                                                    │ ║
║ │ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐ │ ║
║ │ │ praetorian-mcp     │ │ historian-mcp      │ │ oracle-mcp         │ │ gladiator-mcp      │ │ vigil-mcp          │ │ ║
║ │ ├────────────────────┤ ├────────────────────┤ ├────────────────────┤ ├────────────────────┤ ├────────────────────┤ │ ║
║ │ │ save_context       │ │ search_convos      │ │ search             │ │ observe            │ │ vigil_save         │ │ ║
║ │ │ · snapshot before  │ │ · full-text across │ │ · query 17 sources │ │ · record patterns  │ │ · named checkpoint │ │ ║
║ │ │   compaction       │ │   all sessions     │ │   in parallel      │ │                    │ │                    │ │ ║
║ │ │                    │ │                    │ │                    │ │ reflect            │ │ vigil_list         │ │ ║
║ │ │ restore_context    │ │ get_error_solns    │ │ browse             │ │ · cluster and      │ │ · show checkpoints │ │ ║
║ │ │ · load previous    │ │ · how errors were  │ │ · by category or   │ │   recommend        │ │                    │ │ ║
║ │ │   session state    │ │   resolved         │ │   popularity       │ │                    │ │ vigil_diff         │ │ ║
║ │ │                    │ │                    │ │                    │ │ ── ── ── ── ──     │ │ · preview changes  │ │ ║
║ │ │ search_compactns   │ │ find_similar       │ │ sources            │ │ storage:           │ │                    │ │ ║
║ │ │ · find past saves  │ │ · related past     │ │ · list registries  │ │ .claude/           │ │ vigil_restore      │ │ ║
║ │ │                    │ │   questions        │ │   and status       │ │ gladiator/         │ │ · restore files    │ │ ║
║ │ │ list_compactions   │ │                    │ │                    │ │                    │ │                    │ │ ║
║ │ │ · browse recent    │ │ find_file_context  │ │ ── ── ── ── ──     │ │                    │ │ vigil_delete       │ │ ║
║ │ │   snapshots        │ │ · track changes    │ │ smithery · glama   │ │                    │ │ · remove checkpoint│ │ ║
║ │ │                    │ │                    │ │ npm · github       │ │                    │ │                    │ │ ║
║ │ │ ── ── ── ── ──     │ │ find_tool_pattns   │ │ awesome-mcp        │ │                    │ │ ── ── ── ── ──     │ │ ║
║ │ │ storage:           │ │ · agent workflows  │ │ mcp-registry       │ │                    │ │ storage:           │ │ ║
║ │ │ .claude/           │ │                    │ │ + 11 more          │ │                    │ │ .claude/           │ │ ║
║ │ │ praetorian/        │ │ search_plans       │ │                    │ │                    │ │ vigil/             │ │ ║
║ │ │                    │ │ · past plans       │ │ in-memory cache    │ │                    │ │                    │ │ ║
║ │ │                    │ │                    │ │ zero storage       │ │                    │ │                    │ │ ║
║ │ │                    │ │ list_recent        │ │                    │ │                    │ │                    │ │ ║
║ │ │                    │ │ · recent sessions  │ │                    │ │                    │ │                    │ │ ║
║ │ └────────────────────┘ └────────────────────┘ └────────────────────┘ └────────────────────┘ └────────────────────┘ │ ║
║ │                                                                                                                    │ ║
║ │                                                                                                        MCP SERVERS │ ║
╚═╧════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╧═╝
```

## install

```bash
# add the marketplace
/plugin marketplace add Vvkmnn/claude-emporium

# install plugins — each registers its MCP server automatically
/plugin install claude-praetorian@claude-emporium
/plugin install claude-historian@claude-emporium
/plugin install claude-oracle@claude-emporium
/plugin install claude-gladiator@claude-emporium
/plugin install claude-vigil@claude-emporium

# or install standalone MCP servers only (no hooks, commands, or skills)
# claude mcp add praetorian -- npx claude-praetorian-mcp  # https://github.com/Vvkmnn/claude-praetorian-mcp
# claude mcp add historian -- npx claude-historian-mcp    # https://github.com/Vvkmnn/claude-historian-mcp
# claude mcp add oracle -- npx claude-oracle-mcp          # https://github.com/Vvkmnn/claude-oracle-mcp
# claude mcp add gladiator -- npx claude-gladiator-mcp    # https://github.com/Vvkmnn/claude-gladiator-mcp
# claude mcp add vigil -- npx claude-vigil-mcp            # https://github.com/Vvkmnn/claude-vigil-mcp
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

commands: `/compact-praetorian` · `/restore-praetorian`

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

commands: `/search-historian`

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

commands: `/search-oracle`

mcp: [`claude-oracle-mcp`](https://www.npmjs.com/package/claude-oracle-mcp) — smithery, glama, npm, github, awesome-mcp-servers, and more

<br clear="right"/>

---

<img src="logo/claude-gladiator.svg" width="160" height="160" align="right" alt="gladiator">
<h3>gladiator</h3>

continuous learning. observes tool failures and prompts reflection at session end to evolve rules, hooks, and skills.

| hook          | trigger                  | action                                            |
| ------------- | ------------------------ | ------------------------------------------------- |
| `PostToolUse` | `Bash` · `Edit` · `Write` | observes failure patterns (silent on success)     |
| `Stop`        | `*`                      | prompts reflection if unprocessed observations exist |

commands: `/review-gladiator`

mcp: [`claude-gladiator-mcp`](https://www.npmjs.com/package/claude-gladiator-mcp) — storage at `.claude/gladiator/`

<br clear="right"/>

---

<img src="logo/claude-vigil.svg" width="160" height="160" align="right" alt="vigil">
<h3>vigil</h3>

file recovery. saves checkpoints before dangerous operations, diffs changes, restores files safely.

| hook          | trigger | action                                                      |
| ------------- | ------- | ----------------------------------------------------------- |
| `PreToolUse`  | `Bash`  | auto-quicksaves before destructive commands (rm, mv, etc.)  |

commands: `/save-vigil` · `/restore-vigil`

mcp: [`claude-vigil-mcp`](https://www.npmjs.com/package/claude-vigil-mcp) — storage at `.claude/vigil/`

<br clear="right"/>

## architecture

each plugin is a thin wrapper. hooks inject prompts that trigger MCP tools at high-impact moments. plugins contain no business logic — they tell claude _when_ to search, save, or restore. the MCP servers handle the actual work.

```
hook fires → plugin injects prompt → claude calls mcp → result flows back
```

zero setup beyond installation. no databases, no external storage. praetorian, gladiator, and vigil use project-local dirs (`.claude/praetorian/`, `.claude/gladiator/`, `.claude/vigil/`). oracle and historian compute in-memory with TTL caching.

## synergy

each plugin works standalone. when multiple are installed, they detect siblings at runtime and coordinate — no configuration needed.

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│     ⚜️ praetorian ◄──────────────────────────► 📜 historian                       │
│     context guard                                session memory                   │
│          │                                            │                           │
│          │     compactions include oracle              │                           │
│          │     discoveries when saving                 │                           │
│          │                                            │                           │
│          │     historian notes praetorian              │                           │
│          │     will compact research after             │                           │
│          │                                            │                           │
│          └───────────────► 🔮 ◄───────────────────────┘                           │
│                          oracle                                                   │
│                       tool discovery                                              │
│                       ╱          ╲                                                │
│                      ▼            ▼                                               │
│             ⚔️ gladiator      🏺 vigil ──────────► ⚜️ praetorian                   │
│             learn & adapt     file recovery          files + context saved         │
│                  │                │                  together before risky ops      │
│                  │                │                                                │
│          historian enriches   vigil quicksaves                                     │
│          reflection with      protect against                                      │
│          past solutions       destructive operations                               │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
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
| error         | ⚔️ gladiator  | observes failure pattern                     | + historian enriches reflection with past solutions              |
| stop          | ⚔️ gladiator  | prompts reflection on observations          | + historian and oracle deepen analysis during reflection         |
| bash (destructive) | 🏺 vigil | auto-quicksaves before destructive commands  | + praetorian also preserves context alongside file checkpoints   |

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

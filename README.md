<p align="center">
  <a href="https://github.com/Vvkmnn/claude-emporium"><img src="logo/claude-roman.svg" width="300" height="300" alt="roma victrix"></a>
</p>

<h1 align="center">claude emporium</h1>
<p align="center">
 A plugin marketplace for claude code<br>
  <a href="#install">install</a> · <a href="#plugins">plugins</a> · <a href="#synergy">synergy</a> · <a href="#architecture">architecture</a> · <a href="#contributing">contributing</a>
</p>
<p align="center">
<a href="https://github.com/Vvkmnn"><img src="https://img.shields.io/github/followers/Vvkmnn?label=%40vvkmnn&style=social" alt="@vvkmnn"></a>
<a href="https://github.com/Vvkmnn/claude-emporium"><img src="https://img.shields.io/github/stars/Vvkmnn/claude-emporium?style=social&label=stars" alt="GitHub stars"></a>
<br>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
<a href="https://claude.ai/code"><img src="https://img.shields.io/badge/Claude_Code-D97757?logo=claude&logoColor=fff" alt="Claude Code"></a>
<a href="https://modelcontextprotocol.io/"><img src="https://img.shields.io/badge/MCP-5_servers-blue" alt="MCP"></a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white" alt="TypeScript"></a>
<a href="https://nodejs.org/"><img src="https://img.shields.io/badge/node-%3E%3D20-brightgreen" alt="Node.js"></a>
<br>
<a href="https://www.npmjs.com/package/claude-praetorian-mcp"><img src="https://img.shields.io/npm/v/claude-praetorian-mcp.svg?label=praetorian" alt="praetorian"></a>
<a href="https://www.npmjs.com/package/claude-historian-mcp"><img src="https://img.shields.io/npm/v/claude-historian-mcp.svg?label=historian" alt="historian"></a>
<a href="https://www.npmjs.com/package/claude-oracle-mcp"><img src="https://img.shields.io/npm/v/claude-oracle-mcp.svg?label=oracle" alt="oracle"></a>
<a href="https://www.npmjs.com/package/claude-gladiator-mcp"><img src="https://img.shields.io/npm/v/claude-gladiator-mcp.svg?label=gladiator" alt="gladiator"></a>
<a href="https://www.npmjs.com/package/claude-vigil-mcp"><img src="https://img.shields.io/npm/v/claude-vigil-mcp.svg?label=vigil" alt="vigil"></a>
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

<h3>praetorian</h3>

<a href="https://github.com/Vvkmnn/claude-praetorian-mcp"><img src="logo/claude-praetorian.svg" width="200" height="200" align="left" alt="praetorian"></a>

context guard. saves and restores valuable context before compaction, after research, and when subagents complete.

**commands:** `/compact-praetorian` · `/restore-praetorian`

**mcp:** [`claude-praetorian-mcp`](https://www.npmjs.com/package/claude-praetorian-mcp) (storage at `.claude/praetorian/`)

<br clear="left"/>

| hook           | trigger                  | action                                    |
| -------------- | ------------------------ | ----------------------------------------- |
| `PreToolUse`   | `EnterPlanMode`          | lists prior compactions before planning   |
| `PreCompact`   | `*`                      | saves context before compaction resets it |
| `PostToolUse`  | `WebFetch` · `WebSearch` | prompts to compact research findings      |
| `SubagentStop` | `*`                      | prompts to compact subagent results       |

---

<h3>historian</h3>

<a href="https://github.com/Vvkmnn/claude-historian-mcp"><img src="logo/claude-historian.svg" width="200" height="200" align="left" alt="historian"></a>

session memory. checks past sessions before you do redundant research, planning, or debugging.

**commands:** `/search-historian`

**mcp:** [`claude-historian-mcp`](https://www.npmjs.com/package/claude-historian-mcp) (7 search tools across conversations, errors, files, plans)

<br clear="left"/>

| hook          | trigger                  | action                                       |
| ------------- | ------------------------ | -------------------------------------------- |
| `PreToolUse`  | `WebSearch` · `WebFetch` | checks history before web research           |
| `PreToolUse`  | `EnterPlanMode`          | searches past plans before planning          |
| `PreToolUse`  | `Task`                   | checks tool patterns before launching agents |
| `PostToolUse` | `Bash`                   | suggests error solutions after failures      |

---

<h3>oracle</h3>

<a href="https://github.com/Vvkmnn/claude-oracle-mcp"><img src="logo/claude-oracle.svg" width="200" height="200" align="left" alt="oracle"></a>

tool discovery. searches 17 sources in parallel to find relevant skills, plugins, and MCP servers.

**commands:** `/search-oracle`

**mcp:** [`claude-oracle-mcp`](https://www.npmjs.com/package/claude-oracle-mcp) (smithery, glama, npm, github, awesome-mcp-servers, and more)

<br clear="left"/>

| hook          | trigger         | action                                      |
| ------------- | --------------- | ------------------------------------------- |
| `PreToolUse`  | `EnterPlanMode` | searches for relevant tools before planning |
| `PostToolUse` | `Bash`          | searches for tools that solve errors        |

---

<h3>gladiator</h3>

<a href="https://github.com/Vvkmnn/claude-gladiator-mcp"><img src="logo/claude-gladiator.svg" width="200" height="200" align="left" alt="gladiator"></a>

continuous learning. observes tool failures and prompts reflection at session end to evolve rules, hooks, and skills.

**commands:** `/review-gladiator`

**mcp:** [`claude-gladiator-mcp`](https://www.npmjs.com/package/claude-gladiator-mcp) (storage at `.claude/gladiator/`)

<br clear="left"/>

| hook          | trigger                   | action                                               |
| ------------- | ------------------------- | ---------------------------------------------------- |
| `PostToolUse` | `Bash` · `Edit` · `Write` | observes failure patterns (silent on success)        |
| `Stop`        | `*`                       | prompts reflection if unprocessed observations exist |

---

<h3>vigil</h3>

<a href="https://github.com/Vvkmnn/claude-vigil-mcp"><img src="logo/claude-vigil.svg" width="200" height="200" align="left" alt="vigil"></a>

file recovery. saves checkpoints before dangerous operations, diffs changes, restores files safely.

**commands:** `/save-vigil` · `/restore-vigil`

**mcp:** [`claude-vigil-mcp`](https://www.npmjs.com/package/claude-vigil-mcp) (storage at `.claude/vigil/`)

<br clear="left"/>

| hook         | trigger | action                                                     |
| ------------ | ------- | ---------------------------------------------------------- |
| `PreToolUse` | `Bash`  | auto-quicksaves before destructive commands (rm, mv, etc.) |

## architecture

each plugin is a thin wrapper. hooks inject prompts that trigger MCP tools at high-impact moments. plugins contain no business logic — they tell claude _when_ to search, save, or restore. the MCP servers handle the actual work.

```
hook fires → plugin injects prompt → claude calls mcp → result flows back
```

zero setup beyond installation. no databases, no external storage. praetorian, gladiator, and vigil use project-local dirs (`.claude/praetorian/`, `.claude/gladiator/`, `.claude/vigil/`). oracle and historian compute in-memory with TTL caching.

## synergy

each plugin works standalone. when multiple are installed, they detect siblings at runtime and coordinate — no configuration needed.

```
      🏺 vigil ────── [5] ────── ⚜️ praetorian ────── [1] ────── 📜 historian
      file recovery               context guard                    session memory
                                        │                                │
                                       [2]                              [4]
                                        │                                │
              🔮 oracle ────────────────┘                        ┌───── ⚔️ gladiator
              tool discovery                                     │    learn & adapt
                       │                                         │
                       └──────────────── [3] ────────────────────┘


      [1]  past plans & context shared
      [2]  oracle discoveries in compactions
      [3]  tools found for error patterns
      [4]  past solutions enrich reflection
      [5]  quicksave + context saved together
```

**enhanced behaviors when siblings are detected:**

| event              | plugin        | alone                                       | with siblings                                                    |
| ------------------ | ------------- | ------------------------------------------- | ---------------------------------------------------------------- |
| plan               | ⚜️ praetorian | lists prior compactions                     | + historian searches past plans, oracle discovers tools          |
|                    | 📜 historian  | searches past plans and decisions           | + oracle will also search for relevant tools                     |
|                    | 🔮 oracle     | searches 17 registries for tools            | + historian has past plans, praetorian has compactions           |
| compact            | ⚜️ praetorian | snapshots context to `.claude/praetorian/`  | + includes oracle tool discoveries in the snapshot               |
| error              | 📜 historian  | searches past sessions for solutions        | + oracle also searching for tools that solve this class of error |
|                    | 🔮 oracle     | searches registries for error-solving tools | + historian checking how this error was solved before            |
|                    | ⚔️ gladiator  | observes failure pattern                    | + historian enriches reflection with past solutions              |
| web search         | 📜 historian  | checks history before redundant research    | + praetorian will compact the research findings after            |
| subagent stop      | ⚜️ praetorian | prompts to compact subagent results         | standalone — no sibling interaction                              |
| task launch        | 📜 historian  | checks tool patterns before agents          | standalone — no sibling interaction                              |
| stop               | ⚔️ gladiator  | prompts reflection on observations          | + historian and oracle deepen analysis during reflection         |
| bash (destructive) | 🏺 vigil      | auto-quicksaves before destructive commands | + praetorian also preserves context alongside file checkpoints   |

detection is one `fs.readFileSync` call (~1ms). falls back gracefully if settings are missing.

## contributing

bug fixes, improvements, and documentation PRs are welcome. so are inspirations for new plugins and MCPs that could improve synergy and coverage. see [CONTRIBUTING.md](.github/CONTRIBUTING.md) for full guidelines.

**issues:** use the [issue templates](https://github.com/Vvkmnn/claude-emporium/issues/new/choose) — bug reports, feature requests, and plugin ideas each have their own form. check [open issues](https://github.com/Vvkmnn/claude-emporium/issues) for duplicates first.

**PRs:** fork, branch, and follow the [PR template](.github/PULL_REQUEST_TEMPLATE.md). good contributions include better hook triggers, bug fixes, documentation, and performance improvements.

**new plugins:** open a plugin idea issue first. ideas that get traction have a clear trigger event, a specific MCP to wrap, and a concrete user pain they solve.

## troubleshooting

**plugin not triggering?** verify the mcp server is running: `claude mcp list`

**mcp not found?** install via npm: `claude mcp add <name> -- npx <package>`

**hook errors?** check that node.js is available and `CLAUDE_PLUGIN_ROOT` is set.

## license

MIT

---

<p align="center">
  <img src="logo/consummation.jpg" width="100%" alt="The Consummation of Empire — Thomas Cole, 1836">
  <br>
  <sub><a href="https://en.wikipedia.org/wiki/The_Course_of_Empire_(paintings)"><b>The Consummation of Empire</b></a> — <a href="https://en.wikipedia.org/wiki/Thomas_Cole"><b>Thomas Cole</b></a>, 1836</sub>
  <br><br>
  <em>"alea iacta est" | the die is cast</em>
  <br>
  <sub>— <a href="https://en.wikipedia.org/wiki/Julius_Caesar">Julius Caesar</a>, crossing the Rubicon</sub>
</p>

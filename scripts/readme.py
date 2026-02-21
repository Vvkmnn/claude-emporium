#!/usr/bin/env python3
"""Generate the ASCII diagram for README.md.

Usage:
    python3 scripts/readme.py          # print to stdout
    python3 scripts/readme.py --inject  # inject into README.md
"""

import sys
import re


def pad(s, w):
    return s + " " * max(0, w - len(s))


IW = 20  # inner width per box (between │ and │)
BW = IW + 2  # box width including borders
NCOLS = 6
# outer width: ║ │ [box box box box box box] │ ║
#              2+1+1 + 6*BW + 5*gap + 1+1+2
OW = 4 + NCOLS * BW + (NCOLS - 1) + 4


def outer(text=""):
    return "║ │ " + pad(text, OW - 8) + " │ ║"


def otop():
    return "╔═╤" + "═" * (OW - 6) + "╤═╗"


def obot():
    return "╚═╧" + "═" * (OW - 6) + "╧═╝"


def _cells(c1, c2, c3, c4, c5, c6, fmt):
    """Build a row of 6 cells with given content and border char."""
    cells = []
    for c in [c1, c2, c3, c4, c5, c6]:
        cells.append("│" + pad(c, IW) + "│")
    inner = " ".join(cells)
    return "║ │ " + pad(inner, OW - 8) + " │ ║"


def brow(c1, c2, c3, c4, c5, c6):
    return _cells(" " + c1, " " + c2, " " + c3, " " + c4, " " + c5, " " + c6, "│")


def btop():
    b = "┌" + "─" * IW + "┐"
    inner = (" ".join([b] * NCOLS))
    return "║ │ " + pad(inner, OW - 8) + " │ ║"


def bbot():
    b = "└" + "─" * IW + "┘"
    inner = (" ".join([b] * NCOLS))
    return "║ │ " + pad(inner, OW - 8) + " │ ║"


def bsep():
    b = "├" + "─" * IW + "┤"
    inner = (" ".join([b] * NCOLS))
    return "║ │ " + pad(inner, OW - 8) + " │ ║"


def arrows(char="│"):
    """Place arrow chars centered under each box."""
    inner_w = OW - 8
    line = list(" " * inner_w)
    for i in range(NCOLS):
        pos = i * (BW + 1) + BW // 2
        if pos < len(line):
            line[pos] = char
    return "║ │ " + "".join(line) + " │ ║"


E = " " * (IW - 1)  # empty cell content (padded by brow)


def generate():
    L = []

    L.append(otop())
    L.append(outer())
    L.append(outer("PLUGINS"))
    L.append(outer())

    # --- plugin boxes ---
    L.append(btop())
    L.append(brow("  PRAETORIAN       ", "  HISTORIAN        ", "  ORACLE           ", "  GLADIATOR        ", "  VIGIL            ", "  ORATOR           "))
    L.append(brow("context guard      ", "session memory     ", "tool discovery     ", "learn & adapt      ", "file recovery      ", "prompt rhetoric    "))
    L.append(bsep())
    L.append(brow("hooks              ", "hooks              ", "hooks              ", "hooks              ", "hooks              ", "hooks              "))
    L.append(brow("· pre-plan         ", "· pre-websearch    ", "· pre-plan         ", "· post-error       ", "· pre-bash         ", "· pre-task         "))
    L.append(brow("· pre-compact      ", "· pre-plan         ", "· post-error       ", "· stop             ", "                   ", "                   "))
    L.append(brow("· post-research    ", "· pre-task         ", "                   ", "                   ", "commands           ", "commands           "))
    L.append(brow("· subagent-stop    ", "· post-error       ", "commands           ", "commands           ", "· /save-vigil      ", "· /reprompt-       "))
    L.append(brow("                   ", "                   ", "· /search-oracle   ", "· /review-         ", "· /restore-vigil   ", "  orator           "))
    L.append(brow("commands           ", "commands           ", "                   ", "  gladiator        ", "                   ", "                   "))
    L.append(brow("· /compact-        ", "· /search-         ", "                   ", "                   ", "                   ", "                   "))
    L.append(brow("  praetorian       ", "  historian        ", "                   ", "                   ", "                   ", "                   "))
    L.append(brow("· /restore-        ", "                   ", "                   ", "                   ", "                   ", "                   "))
    L.append(brow("  praetorian       ", "                   ", "                   ", "                   ", "                   ", "                   "))
    L.append(bbot())

    # --- arrows ---
    L.append(arrows("│"))
    L.append(arrows("▼"))
    L.append(outer())

    # --- mcp boxes ---
    L.append(btop())
    L.append(brow("praetorian-mcp     ", "historian-mcp      ", "oracle-mcp         ", "gladiator-mcp      ", "vigil-mcp          ", "orator-mcp         "))
    L.append(bsep())
    L.append(brow("save_context       ", "search_convos      ", "search             ", "observe            ", "vigil_save         ", "orator_optimize    "))
    L.append(brow("· snapshot before  ", "· full-text across ", "· query 17 sources ", "· record patterns  ", "· named checkpoint ", "· score 7 dims     "))
    L.append(brow("  compaction       ", "  all sessions     ", "  in parallel      ", "                   ", "                   ", "· apply 8 techs    "))
    L.append(brow("                   ", "                   ", "                   ", "reflect            ", "vigil_list         ", "· restructure      "))
    L.append(brow("restore_context    ", "get_error_solns    ", "browse             ", "· cluster and      ", "· show checkpoints ", "                   "))
    L.append(brow("· load previous    ", "· how errors were  ", "· by category or   ", "  recommend        ", "                   ", "── ── ── ── ──     "))
    L.append(brow("  session state    ", "  resolved         ", "  popularity       ", "                   ", "vigil_diff         ", "dimensions:        "))
    L.append(brow("                   ", "                   ", "                   ", "── ── ── ── ──     ", "· preview changes  ", "clarity            "))
    L.append(brow("search_compactns   ", "find_similar       ", "sources            ", "storage:           ", "                   ", "specificity        "))
    L.append(brow("· find past saves  ", "· related past     ", "· list registries  ", ".claude/           ", "vigil_restore      ", "structure          "))
    L.append(brow("                   ", "  questions        ", "  and status       ", "gladiator/         ", "· restore files    ", "context            "))
    L.append(brow("list_compactions   ", "                   ", "                   ", "                   ", "                   ", "examples           "))
    L.append(brow("· browse recent    ", "find_file_context  ", "── ── ── ── ──     ", "                   ", "vigil_delete       ", "constraints        "))
    L.append(brow("  snapshots        ", "· track changes    ", "smithery · glama   ", "                   ", "· remove checkpoint", "tone               "))
    L.append(brow("                   ", "                   ", "npm · github       ", "                   ", "                   ", "                   "))
    L.append(brow("── ── ── ── ──     ", "find_tool_pattns   ", "awesome-mcp        ", "                   ", "── ── ── ── ──     ", "── ── ── ── ──     "))
    L.append(brow("storage:           ", "· agent workflows  ", "mcp-registry       ", "                   ", "storage:           ", "in-memory          "))
    L.append(brow(".claude/           ", "                   ", "+ 11 more          ", "                   ", ".claude/           ", "zero storage       "))
    L.append(brow("praetorian/        ", "search_plans       ", "                   ", "                   ", "vigil/             ", "                   "))
    L.append(brow("                   ", "· past plans       ", "in-memory cache    ", "                   ", "                   ", "                   "))
    L.append(brow("                   ", "                   ", "zero storage       ", "                   ", "                   ", "                   "))
    L.append(brow("                   ", "list_recent        ", "                   ", "                   ", "                   ", "                   "))
    L.append(brow("                   ", "· recent sessions  ", "                   ", "                   ", "                   ", "                   "))
    L.append(bbot())

    L.append(outer())
    right_label = "MCP SERVERS"
    L.append("║ │ " + " " * (OW - 8 - len(right_label)) + right_label + " │ ║")
    L.append(obot())

    # validate
    widths = set(len(l) for l in L)
    assert len(widths) == 1, f"inconsistent widths: {widths}"

    return "\n".join(L)


def inject_readme(diagram):
    with open("README.md", "r") as f:
        content = f.read()

    pattern = r"```\n╔.*?╝\n```"
    replacement = "```\n" + diagram + "\n```"

    if re.search(pattern, content, re.DOTALL):
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    else:
        print("warning: could not find diagram block in README.md", file=sys.stderr)
        return

    with open("README.md", "w") as f:
        f.write(content)

    print(f"injected {len(diagram.splitlines())} lines into README.md")


if __name__ == "__main__":
    diagram = generate()

    if "--inject" in sys.argv:
        inject_readme(diagram)
    else:
        print(diagram)

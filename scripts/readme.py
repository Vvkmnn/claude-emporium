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


IW = 22  # inner width per box (between │ and │)
BW = IW + 2  # box width including borders
OW = 2 + 1 + BW + 1 + BW + 1 + BW + 1 + 2  # outer width = 80


def outer(text=""):
    return "║" + pad(" " + text, OW - 2) + "║"


def otop():
    return "╔" + "═" * (OW - 2) + "╗"


def obot():
    return "╚" + "═" * (OW - 2) + "╝"


def brow(c1, c2, c3):
    b1 = "│ " + pad(c1, IW - 1) + "│"
    b2 = "│ " + pad(c2, IW - 1) + "│"
    b3 = "│ " + pad(c3, IW - 1) + "│"
    inner = b1 + " " + b2 + " " + b3
    return "║ " + pad(inner, OW - 4) + " ║"


def btop():
    b = "┌" + "─" * IW + "┐"
    inner = b + " " + b + " " + b
    return "║ " + pad(inner, OW - 4) + " ║"


def bbot():
    b = "└" + "─" * IW + "┘"
    inner = b + " " + b + " " + b
    return "║ " + pad(inner, OW - 4) + " ║"


def bsep():
    b = "├" + "─" * IW + "┤"
    inner = b + " " + b + " " + b
    return "║ " + pad(inner, OW - 4) + " ║"


def arrows(char="│"):
    line = list(" " * (OW - 2))
    for c in [14, 39, 64]:
        line[c] = char
    return "║" + "".join(line) + "║"


E = " " * (IW - 1)  # empty cell content


def generate():
    L = []

    L.append(otop())
    L.append(outer("claude emporium"))
    L.append(outer())
    L.append(outer("PLUGINS"))
    L.append(outer())

    # --- plugin boxes ---
    L.append(btop())
    L.append(brow("   PRAETORIAN      ", "   HISTORIAN       ", "    ORACLE         "))
    L.append(brow(" context guard     ", " session memory    ", " tool discovery    "))
    L.append(bsep())
    L.append(brow(E, E, E))
    L.append(brow("hooks              ", "hooks              ", "hooks              "))
    L.append(brow("· pre-plan         ", "· pre-websearch    ", "· pre-plan         "))
    L.append(brow("· pre-compact      ", "· pre-plan         ", "· post-error       "))
    L.append(brow("· post-research    ", "· pre-task         ", E))
    L.append(brow("· subagent-stop    ", "· post-error       ", "commands           "))
    L.append(brow(E, E, "· /oracle-search   "))
    L.append(brow("commands           ", "commands           ", "· /oracle-browse   "))
    L.append(brow("· /compact         ", "· /historian-search", E))
    L.append(brow("· /restore         ", E, E))
    L.append(brow("· /search          ", E, E))
    L.append(brow(E, E, E))
    L.append(bbot())

    # --- arrows ---
    L.append(arrows("│"))
    L.append(arrows("▼"))
    L.append(outer())

    # --- mcp section ---
    L.append(outer("MCP SERVERS"))
    L.append(outer())
    L.append(btop())
    L.append(brow("praetorian-mcp     ", " historian-mcp     ", "  oracle-mcp       "))
    L.append(bsep())
    L.append(brow(E, E, E))
    L.append(brow("save_context       ", "search_convos      ", "search             "))
    L.append(brow("· snapshot before  ", "· full-text across ", "· query 17 sources "))
    L.append(brow("  compaction       ", "  all sessions     ", "  in parallel      "))
    L.append(brow(E, E, E))
    L.append(brow("restore_context    ", "get_error_solutions", "browse             "))
    L.append(brow("· load previous    ", "· how past errors  ", "· by category or   "))
    L.append(brow("  session state    ", "  were resolved    ", "  popularity       "))
    L.append(brow(E, E, E))
    L.append(brow("search_compactions ", "find_similar_query ", "sources            "))
    L.append(brow("· find past saves  ", "· related past     ", "· list registries  "))
    L.append(brow("  by keyword       ", "  questions        ", "  and status       "))
    L.append(brow(E, E, E))
    L.append(brow("list_compactions   ", "find_file_context  ", "── ── ── ── ── ── "))
    L.append(brow("· browse recent    ", "· track changes    ", "smithery · glama   "))
    L.append(brow("  snapshots        ", "  across sessions  ", "npm · github       "))
    L.append(brow(E, E, "awesome-mcp        "))
    L.append(brow("── ── ── ── ── ── ", "find_tool_patterns ", "mcp-registry       "))
    L.append(brow("storage:           ", "· successful agent ", "+ 11 more          "))
    L.append(brow(".claude/praetorian/", "  workflows        ", E))
    L.append(brow(E, E, "in-memory cache    "))
    L.append(brow(E, "search_plans       ", "zero storage       "))
    L.append(brow(E, "· past plans and   ", E))
    L.append(brow(E, "  decisions        ", E))
    L.append(brow(E, E, E))
    L.append(brow(E, "list_recent        ", E))
    L.append(brow(E, "· browse recent    ", E))
    L.append(brow(E, "  sessions         ", E))
    L.append(brow(E, E, E))
    L.append(bbot())
    L.append(outer())
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

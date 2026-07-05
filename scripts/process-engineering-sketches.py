#!/usr/bin/env python3
"""Clean traced engineering SVG exports for the scroll sketch background.

Usage:
  python3 scripts/process-engineering-sketches.py /path/to/source.svg public/assets/engineering-sketches/output.svg
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

THEME_FILL = "rgba(209, 213, 219, 0.38)"


def is_background_path(d: str) -> bool:
    compact = re.sub(r"\s+", "", d)
    if re.match(r"M0,0C[\d.]+,0[\d.C]+0,0\.?[\d]*0,0\.?[\d]*0", compact):
        return True
    if "724.000000" in d and "1037.000000" in d:
        return True
    if compact.startswith("M0,0C343.53") or compact.startswith("M0,0C320.1"):
        return True
    return False


def clean_svg(src: Path, dst: Path) -> None:
    text = src.read_text(encoding="utf-8", errors="ignore")
    vb = re.search(r'viewBox="([^"]+)"', text)
    if vb:
        view_box = vb.group(1)
    else:
        m = re.search(r'width="(\d+)" height="(\d+)"', text)
        view_box = f"0 0 {m.group(1)} {m.group(2)}" if m else "0 0 1000 800"

    out_paths: list[str] = []
    for match in re.finditer(r"<path\b([^>]*)/>", text, re.DOTALL):
        attrs = match.group(1)
        d_match = re.search(r'\bd="([^"]+)"', attrs, re.DOTALL)
        if not d_match:
            continue
        d = re.sub(r"\s+", " ", d_match.group(1)).strip()
        if is_background_path(d) or len(d) < 30:
            continue
        out_paths.append(f'  <path d="{d}" fill="{THEME_FILL}" stroke="none" />')

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view_box}" fill="none" aria-hidden="true">\n'
        + "\n".join(out_paths)
        + "\n</svg>"
    )
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(svg, encoding="utf-8")
    print(f"Wrote {dst} ({len(out_paths)} paths, {len(svg) // 1024}KB)")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: process-engineering-sketches.py <source.svg> <dest.svg>")
        sys.exit(1)
    clean_svg(Path(sys.argv[1]), Path(sys.argv[2]))

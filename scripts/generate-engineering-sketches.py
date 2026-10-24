#!/usr/bin/env python3
"""Generate clean technical line drawings for the site background.

Writes stroke-only SVG (no fills except text) to:

  public/assets/engineering-sketches/sketch-gear.svg
  public/assets/engineering-sketches/sketch-motor.svg
  public/assets/engineering-sketches/sketch-pcb.svg

ViewBoxes match the previous files so placement aspect stays the same.
Run: python3 scripts/generate-engineering-sketches.py
"""

from __future__ import annotations

import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "engineering-sketches"

# Ash palette, kept close to --sketch-stroke / --sketch-stroke-secondary.
INK = "rgba(209, 213, 219, 0.72)"
INK_DIM = "rgba(209, 213, 219, 0.48)"
INK_SOFT = "rgba(176, 188, 200, 0.42)"
TEXT = "rgba(209, 213, 219, 0.78)"
FONT = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"


def fmt(n: float) -> str:
    return f"{n:.2f}".rstrip("0").rstrip(".")


class Drawing:
    def __init__(self, width: float, height: float) -> None:
        self.width = width
        self.height = height
        self.parts: list[str] = []
        self._clip = 0

    def _style(self, kind: str) -> str:
        table = {
            "object": (INK, 1.6, None),
            "edge": (INK, 1.35, None),
            "thin": (INK_DIM, 1.05, None),
            "trace": (INK, 2.35, None),
            "center": (INK_SOFT, 1.05, "16 4 2 4"),
            "hidden": (INK_DIM, 1.15, "7 4.5"),
            "dim": (INK_DIM, 0.95, None),
            "hatch": (INK_SOFT, 0.8, None),
            "plane": (INK, 1.7, "18 4 2 4"),
        }
        stroke, width, dash = table[kind]
        extra = f' stroke-dasharray="{dash}"' if dash else ""
        return (
            f'stroke="{stroke}" stroke-width="{width}" '
            f'vector-effect="non-scaling-stroke"{extra}'
        )

    def line(self, x1: float, y1: float, x2: float, y2: float, kind: str = "object") -> None:
        self.parts.append(
            f'<line x1="{fmt(x1)}" y1="{fmt(y1)}" x2="{fmt(x2)}" y2="{fmt(y2)}" {self._style(kind)} />'
        )

    def circle(self, cx: float, cy: float, r: float, kind: str = "object") -> None:
        self.parts.append(
            f'<circle cx="{fmt(cx)}" cy="{fmt(cy)}" r="{fmt(r)}" {self._style(kind)} />'
        )

    def rect(self, x: float, y: float, w: float, h: float, kind: str = "object", rx: float = 0) -> None:
        rx_attr = f' rx="{fmt(rx)}" ry="{fmt(rx)}"' if rx else ""
        self.parts.append(
            f'<rect x="{fmt(x)}" y="{fmt(y)}" width="{fmt(w)}" height="{fmt(h)}"{rx_attr} {self._style(kind)} />'
        )

    def polyline(self, pts: list[tuple[float, float]], kind: str = "object") -> None:
        if len(pts) < 2:
            return
        d = " ".join(f"{fmt(x)},{fmt(y)}" for x, y in pts)
        self.parts.append(f'<polyline points="{d}" {self._style(kind)} />')

    def path(self, d: str, kind: str = "object") -> None:
        self.parts.append(f'<path d="{d}" {self._style(kind)} />')

    def text(self, x: float, y: float, value: str, size: float = 15, anchor: str = "middle") -> None:
        safe = (
            value.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
        )
        self.parts.append(
            f'<text x="{fmt(x)}" y="{fmt(y)}" fill="{TEXT}" font-family="{FONT}" '
            f'font-size="{fmt(size)}" text-anchor="{anchor}" letter-spacing="0.4">{safe}</text>'
        )

    def hatch(self, polygon: list[tuple[float, float]], spacing: float = 8.0) -> None:
        if len(polygon) < 3:
            return
        self._clip += 1
        cid = f"h{self._clip}"
        d = "M " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in polygon) + " Z"
        xs = [p[0] for p in polygon]
        ys = [p[1] for p in polygon]
        minx, maxx = min(xs), max(xs)
        miny, maxy = min(ys), max(ys)
        diag = (maxx - minx) + (maxy - miny)
        lines = []
        start = minx - (maxy - miny)
        n = int(diag / spacing) + 2
        for i in range(n):
            x = start + i * spacing
            lines.append(
                f'<line x1="{fmt(x)}" y1="{fmt(miny)}" x2="{fmt(x + (maxy - miny))}" y2="{fmt(maxy)}" {self._style("hatch")} />'
            )
        self.parts.append(f'<clipPath id="{cid}"><path d="{d}" /></clipPath>')
        self.parts.append(f'<g clip-path="url(#{cid})">')
        self.parts.extend(lines)
        self.parts.append("</g>")

    def arrow(self, x: float, y: float, ang: float, size: float = 9) -> None:
        a1 = ang + math.radians(154)
        a2 = ang - math.radians(154)
        self.line(x, y, x + size * math.cos(a1), y + size * math.sin(a1), "dim")
        self.line(x, y, x + size * math.cos(a2), y + size * math.sin(a2), "dim")

    def dim_h(self, x1: float, x2: float, y: float, ext_from: float, text: str, above: bool = True) -> None:
        self.line(x1, ext_from, x1, y + (4 if y > ext_from else -4), "dim")
        self.line(x2, ext_from, x2, y + (4 if y > ext_from else -4), "dim")
        self.line(x1, y, x2, y, "dim")
        left, right = (x1, x2) if x1 < x2 else (x2, x1)
        span = right - left
        if span > 36:
            self.arrow(left, y, math.pi)
            self.arrow(right, y, 0)
        else:
            self.arrow(left, y, 0)
            self.arrow(right, y, math.pi)
        mid = (x1 + x2) / 2
        self.text(mid, y - 6 if above else y + 16, text, 13)

    def dim_v(self, y1: float, y2: float, x: float, ext_from: float, text: str) -> None:
        self.line(ext_from, y1, x + (4 if x > ext_from else -4), y1, "dim")
        self.line(ext_from, y2, x + (4 if x > ext_from else -4), y2, "dim")
        self.line(x, y1, x, y2, "dim")
        top, bot = (y1, y2) if y1 < y2 else (y2, y1)
        span = bot - top
        if span > 36:
            self.arrow(x, top, -math.pi / 2)
            self.arrow(x, bot, math.pi / 2)
        else:
            self.arrow(x, top, math.pi / 2)
            self.arrow(x, bot, -math.pi / 2)
        mid = (y1 + y2) / 2
        self.text(x - 8, mid + 4, text, 13, "end")

    def leader(self, x: float, y: float, x2: float, y2: float, text: str, anchor: str = "start") -> None:
        self.line(x, y, x2, y2, "dim")
        self.circle(x, y, 1.6, "dim")
        self.text(x2 + (6 if anchor == "start" else -6), y2 + 4, text, 13, anchor)

    def title_block(self, x: float, y: float, w: float, h: float, title: str, subtitle: str) -> None:
        self.rect(x, y, w, h, "thin")
        self.line(x, y + h * 0.5, x + w, y + h * 0.5, "thin")
        self.line(x + w * 0.72, y, x + w * 0.72, y + h, "thin")
        self.text(x + 12, y + h * 0.34, title, 15, "start")
        self.text(x + 12, y + h * 0.78, subtitle, 12, "start")
        self.text(x + w * 0.86, y + h * 0.34, "REV", 11)
        self.text(x + w * 0.86, y + h * 0.78, "A", 14)

    def center_cross(self, cx: float, cy: float, half_w: float, half_h: float) -> None:
        self.line(cx - half_w, cy, cx + half_w, cy, "center")
        self.line(cx, cy - half_h, cx, cy + half_h, "center")

    def save(self, name: str) -> None:
        body = "\n  ".join(self.parts)
        svg = (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fmt(self.width)} {fmt(self.height)}" '
            f'fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">\n  '
            f"{body}\n</svg>\n"
        )
        path = OUT_DIR / name
        path.write_text(svg, encoding="utf-8")
        print(f"Wrote {path} ({len(svg) // 1024}KB, {svg.count(chr(10))} lines)")


def rotate(x: float, y: float, ang: float) -> tuple[float, float]:
    c, s = math.cos(ang), math.sin(ang)
    return x * c - y * s, x * s + y * c


def gear_tooth_points(
    cx: float,
    cy: float,
    teeth: int,
    module: float,
    pressure_deg: float = 20.0,
    steps: int = 8,
) -> tuple[list[tuple[float, float]], dict[str, float]]:
    """Closed spur-gear outline in SVG coordinates (y down).

    Tooth flanks are the 20-degree involute: half-angle at radius r is
    pi/(2z) + inv(alpha) - inv(alpha_r), so the tooth is wider at the root
    than at the tip.
    """
    alpha = math.radians(pressure_deg)
    rp = module * teeth / 2.0
    rb = rp * math.cos(alpha)
    ra = rp + module
    rf = rp - 1.25 * module
    inv_alpha = math.tan(alpha) - alpha
    half_pitch = math.pi / (2.0 * teeth)

    def half_ang(radius: float) -> float:
        radius = max(radius, rb)
        ang = math.acos(max(-1.0, min(1.0, rb / radius)))
        return half_pitch + inv_alpha - (math.tan(ang) - ang)

    def pt(radius: float, ang: float) -> tuple[float, float]:
        return (cx + radius * math.cos(ang), cy - radius * math.sin(ang))

    def arc(radius: float, a0: float, a1: float, n: int) -> list[tuple[float, float]]:
        delta = (a1 - a0) % (2 * math.pi)
        if delta < 1e-6:
            return []
        return [pt(radius, a0 + delta * i / n) for i in range(1, n + 1)]

    outline: list[tuple[float, float]] = []
    radii = [rb + (ra - rb) * i / steps for i in range(steps + 1)]
    for k in range(teeth):
        center = 2 * math.pi * k / teeth
        next_center = 2 * math.pi * (k + 1) / teeth
        cw = [pt(r, center - half_ang(r)) for r in radii]
        ccw = [pt(r, center + half_ang(r)) for r in radii]
        cw_root = pt(rf, center - half_ang(rb))
        ccw_root = pt(rf, center + half_ang(rb))
        if k > 0:
            prev = outline[-1]
            a0 = math.atan2(cy - prev[1], prev[0] - cx)
            a1 = math.atan2(cy - cw_root[1], cw_root[0] - cx)
            outline.extend(arc(rf, a0, a1, 4))
        outline.append(cw_root)
        outline.extend(cw)
        a_tip0 = center - half_ang(ra)
        a_tip1 = center + half_ang(ra)
        outline.extend(arc(ra, a_tip0, a_tip1, 3))
        outline.extend(reversed(ccw))
        outline.append(ccw_root)
    prev = outline[-1]
    first = outline[0]
    a0 = math.atan2(cy - prev[1], prev[0] - cx)
    a1 = math.atan2(cy - first[1], first[0] - cx)
    outline.extend(arc(rf, a0, a1, 4))
    return outline, {"rp": rp, "rb": rb, "ra": ra, "rf": rf}


def points_path(pts: list[tuple[float, float]], close: bool = True) -> str:
    d = "M " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in pts)
    return d + (" Z" if close else "")


def bore_keyway_path(cx: float, cy: float, r: float, key_w: float, key_d: float) -> str:
    half = key_w / 2
    theta = math.asin(half / r)
    # Angles in standard math (CCW from +x), y-up before SVG flip.
    a_right = math.pi / 2 - theta
    a_left = math.pi / 2 + theta
    # Walk the bore clockwise in math space (the long way) so the keyway notch sits on top.
    # Emit SVG y-down: sy = cy - r*sin.
    pts = []
    steps = 48
    # from right intersection, clockwise to left intersection (decreasing angle, the long way)
    sweep = (2 * math.pi) - (a_left - a_right)
    for i in range(steps + 1):
        a = a_right - sweep * i / steps
        pts.append((cx + r * math.cos(a), cy - r * math.sin(a)))
    top = cy - r - key_d
    pts.append((cx - half, top))
    pts.append((cx + half, top))
    return points_path(pts)


def draw_gear() -> None:
    d = Drawing(1041, 748)
    teeth = 22
    module = 12.4
    cx, cy = 300, 318
    outline, geo = gear_tooth_points(cx, cy, teeth, module, steps=10)
    ra, rp, rf = geo["ra"], geo["rp"], geo["rf"]

    # Meshing pinion, same module. A small extra center distance keeps the
    # tooth flanks from crossing while the tip still sits in the tooth space.
    teeth2 = 18
    geo2_rp = module * teeth2 / 2
    dist = rp + geo2_rp + 2.5
    mesh_ang = 4 * math.pi / teeth
    cx2 = cx + dist * math.cos(mesh_ang)
    cy2 = cy - dist * math.sin(mesh_ang)
    spin2 = math.radians(3)
    outline2, geo2 = gear_tooth_points(0, 0, teeth2, module, steps=10)

    def place(pt: tuple[float, float]) -> tuple[float, float]:
        x, y = pt
        # points are SVG y-down around 0,0. Convert to y-up, rotate, back.
        y_up = -y
        xr, yr = rotate(x, y_up, spin2)
        return cx2 + xr, cy2 - yr

    outline2 = [place(p) for p in outline2]

    d.center_cross(cx, cy, ra + 36, ra + 28)
    d.circle(cx, cy, ra, "thin")
    d.circle(cx, cy, rp, "center")
    d.circle(cx, cy, rf, "hidden")
    d.path(points_path(outline), "object")

    d.circle(cx2, cy2, geo2["ra"], "thin")
    d.circle(cx2, cy2, geo2["rp"], "center")
    d.line(cx2 - 16, cy2, cx2 + geo2["ra"] + 16, cy2, "center")
    d.line(cx2, cy2 - geo2["ra"] - 16, cx2, cy2 + 22, "center")
    d.path(points_path(outline2), "object")

    bore_r = 34
    d.path(bore_keyway_path(cx, cy, bore_r, 12, 6), "object")

    # Cutting plane A-A along the horizontal center, arrows outside the addendum.
    d.line(cx - ra - 28, cy, cx - ra - 6, cy, "plane")
    d.line(cx + ra + 6, cy, cx + ra + 28, cy, "plane")
    d.arrow(cx - ra - 28, cy, math.pi / 2, 8)
    d.arrow(cx + ra + 28, cy, math.pi / 2, 8)
    d.text(cx - ra - 28, cy - 14, "A", 14)
    d.text(cx + ra + 28, cy - 14, "A", 14)

    # Outer diameter.
    d.dim_v(cy - ra, cy + ra, cx - ra - 62, cx - ra, f"Ø {round(2 * ra)}")

    # Section A-A, axial section of the blank. Generic proportions.
    sx, sy = 690, 168
    face = 92
    tip_r = 132
    root_r = 108
    hub_r = 62
    bore_s = 28
    # Axial section: full-width hub and rim, thinner web between them.
    web_inset = 32
    upper = [
        (sx, sy - bore_s),
        (sx, sy - hub_r),
        (sx + web_inset, sy - hub_r),
        (sx + web_inset, sy - root_r),
        (sx, sy - root_r),
        (sx, sy - tip_r),
        (sx + face, sy - tip_r),
        (sx + face, sy - root_r),
        (sx + face - web_inset, sy - root_r),
        (sx + face - web_inset, sy - hub_r),
        (sx + face, sy - hub_r),
        (sx + face, sy - bore_s),
    ]
    key_left = sx + face * 0.38
    key_right = sx + face * 0.62
    key_top = sy - bore_s - 7
    upper_solid = [
        *upper,
        (key_right, sy - bore_s),
        (key_right, key_top),
        (key_left, key_top),
        (key_left, sy - bore_s),
        upper[0],
    ]
    lower_solid = [(x, 2 * sy - y) for x, y in upper]
    lower_solid.append(lower_solid[0])
    d.center_cross(sx + face / 2, sy, face / 2 + 26, tip_r + 22)
    d.hatch(upper_solid, 7.5)
    d.hatch(lower_solid, 7.5)
    d.polyline(upper_solid, "object")
    d.polyline(lower_solid, "object")

    d.dim_h(sx, sx + face, sy + tip_r + 20, sy + tip_r, str(face), above=False)
    d.text(sx + face / 2, sy + tip_r + 64, "SECTION A-A", 14)

    d.title_block(760, 668, 250, 58, "SPUR GEAR", "SECTION A-A")
    d.save("sketch-gear.svg")


def draw_motor() -> None:
    d = Drawing(1036, 723)
    # Front view, shaft end. Square flange.
    fx, fy = 250, 300
    flange = 228
    half = flange / 2
    left, top = fx - half, fy - half
    d.rect(left, top, flange, flange, "object")
    inset = 34
    hole_r = 9
    holes = [
        (left + inset, top + inset),
        (left + flange - inset, top + inset),
        (left + inset, top + flange - inset),
        (left + flange - inset, top + flange - inset),
    ]
    for hx, hy in holes:
        d.circle(hx, hy, hole_r, "object")
        d.center_cross(hx, hy, hole_r + 8, hole_r + 8)
    pilot_r = 58
    shaft_r = 20
    d.circle(fx, fy, pilot_r, "object")
    # Shaft with a flat on the right.
    flat_x = fx + 8
    theta = math.acos(8 / shaft_r)
    # Circle from flat's lower point the long way to the upper point.
    a0 = -theta  # lower, math angle, y-up
    a1 = theta
    pts = []
    steps = 36
    sweep = 2 * math.pi - 2 * theta
    for i in range(steps + 1):
        a = -theta - sweep * i / steps
        pts.append((fx + shaft_r * math.cos(a), fy - shaft_r * math.sin(a)))
    pts.append((flat_x, fy - shaft_r * math.sin(theta)))
    d.path(points_path(pts), "object")
    d.center_cross(fx, fy, half + 34, half + 26)

    d.leader(holes[1][0] + 2, holes[1][1] - 2, fx + half + 36, top - 6, "4X Ø18")
    d.dim_h(left, left + flange, top - 36, top, "228")
    d.text(fx, top - 74, "FRONT", 13)

    # Side view, third angle: shaft points toward the front view.
    sy = fy
    x_shaft = 520
    shaft_len = 86
    pilot_len = 14
    flange_t = 24
    body_len = 176
    cap_len = 26
    x_pilot = x_shaft + shaft_len
    x_flange = x_pilot + pilot_len
    x_body = x_flange + flange_t
    x_cap = x_body + body_len
    x_end = x_cap + cap_len

    body_r = 76
    cap_r = 52
    # Visible outline.
    profile = [
        (x_shaft, sy - shaft_r),
        (x_pilot, sy - shaft_r),
        (x_pilot, sy - pilot_r),
        (x_flange, sy - pilot_r),
        (x_flange, sy - half),
        (x_body, sy - half),
        (x_body, sy - body_r),
        (x_cap, sy - body_r),
        (x_cap, sy - cap_r),
        (x_end, sy - cap_r),
        (x_end, sy + cap_r),
        (x_cap, sy + cap_r),
        (x_cap, sy + body_r),
        (x_body, sy + body_r),
        (x_body, sy + half),
        (x_flange, sy + half),
        (x_flange, sy + pilot_r),
        (x_pilot, sy + pilot_r),
        (x_pilot, sy + shaft_r),
        (x_shaft, sy + shaft_r),
    ]
    d.polyline(profile + [profile[0]], "object")
    # Shaft flat.
    flat_y = sy - 8
    d.line(x_shaft + 10, flat_y, x_pilot - 4, flat_y, "edge")
    d.line(x_shaft + 10, flat_y, x_shaft + 10, sy - shaft_r, "edge")
    # Shoulder lines already in the profile. Add a face line at the shaft end.
    d.line(x_shaft, sy - shaft_r, x_shaft, sy + shaft_r, "object")

    # Hidden: bolt holes through the flange, and the armature inside the body.
    for hy in (holes[0][1], holes[2][1]):
        d.line(x_flange, hy - hole_r, x_body, hy - hole_r, "hidden")
        d.line(x_flange, hy + hole_r, x_body, hy + hole_r, "hidden")
    arm_r = 13
    d.line(x_body + 8, sy - arm_r, x_cap - 10, sy - arm_r, "hidden")
    d.line(x_body + 8, sy + arm_r, x_cap - 10, sy + arm_r, "hidden")
    d.line(x_body + 8, sy - arm_r, x_body + 8, sy + arm_r, "hidden")
    d.line(x_cap - 10, sy - arm_r, x_cap - 10, sy + arm_r, "hidden")

    d.line(x_shaft - 28, sy, x_end + 28, sy, "center")
    d.line((x_body + x_cap) / 2, sy - body_r - 20, (x_body + x_cap) / 2, sy + body_r + 20, "center")

    d.dim_v(sy - shaft_r, sy + shaft_r, x_shaft - 28, x_shaft, "Ø 40")
    d.dim_h(x_shaft, x_end, sy + half + 48, sy + half, "326")
    d.dim_v(sy - body_r, sy + body_r, x_end + 36, x_end, "Ø 152")
    d.text((x_shaft + x_end) / 2, sy - half - 28, "SIDE", 13)

    # Small end-cap section hatch, just the rear cap wall, to show a cut.
    cap_poly = [
        (x_cap, sy - cap_r),
        (x_end, sy - cap_r),
        (x_end, sy - arm_r - 6),
        (x_cap, sy - arm_r - 6),
    ]
    cap_poly_b = [
        (x_cap, sy + arm_r + 6),
        (x_end, sy + arm_r + 6),
        (x_end, sy + cap_r),
        (x_cap, sy + cap_r),
    ]
    d.hatch(cap_poly, 6)
    d.hatch(cap_poly_b, 6)

    d.title_block(760, 646, 246, 56, "DC MOTOR", "FRONT / SIDE")
    d.save("sketch-motor.svg")


def chamfer(pts: list[tuple[float, float]], size: float = 12) -> list[tuple[float, float]]:
    """Insert a 45-degree chamfer at each orthogonal corner."""
    if len(pts) < 3:
        return pts
    out = [pts[0]]
    for i in range(1, len(pts) - 1):
        ax, ay = pts[i - 1]
        bx, by = pts[i]
        cx, cy = pts[i + 1]
        v1 = (ax - bx, ay - by)
        v2 = (cx - bx, cy - by)
        l1 = math.hypot(*v1)
        l2 = math.hypot(*v2)
        c = min(size, l1 * 0.45, l2 * 0.45)
        if l1 == 0 or l2 == 0 or c < 1:
            out.append((bx, by))
            continue
        out.append((bx + v1[0] / l1 * c, by + v1[1] / l1 * c))
        out.append((bx + v2[0] / l2 * c, by + v2[1] / l2 * c))
    out.append(pts[-1])
    return out


def draw_pcb() -> None:
    d = Drawing(970, 787)
    bx, by, bw, bh, rad = 108, 86, 740, 520, 18
    d.rect(bx, by, bw, bh, "object", rad)

    # Sparse construction dots inside the board. Skip any that would
    # land on a reference designator (the grid hits C3 and C1).
    def on_label(x: float, y: float) -> bool:
        labels = (
            (300, 305, "U1", 18, "middle"),
            (210, 238, "1", 12, "middle"),
            (560, 235, "U2", 16, "middle"),
            (182, 462, "R1", 14, "middle"),
            (264, 492, "C3", 14, "middle"),
            (444, 462, "R2", 14, "middle"),
            (662, 448, "C1", 14, "start"),
            (768, 226, "J1", 15, "middle"),
        )
        for lx, ly, text, size, anchor in labels:
            w = len(text) * size * 0.62
            if anchor == "middle":
                x0 = lx - w / 2
            elif anchor == "end":
                x0 = lx - w
            else:
                x0 = lx
            y0 = ly - size * 0.8
            y1 = ly + size * 0.25
            if x0 - 2 <= x <= x0 + w + 2 and y0 - 2 <= y <= y1 + 2:
                return True
        return False

    for gx in range(bx + 40, bx + bw - 10, 40):
        for gy in range(by + 40, by + bh - 10, 40):
            if on_label(gx, gy):
                continue
            d.circle(gx, gy, 0.7, "thin")

    def hole(cx: float, cy: float) -> None:
        d.circle(cx, cy, 11, "thin")
        d.circle(cx, cy, 5.5, "object")

    m = 28
    for hx, hy in (
        (bx + m, by + m),
        (bx + bw - m, by + m),
        (bx + m, by + bh - m),
        (bx + bw - m, by + bh - m),
    ):
        hole(hx, hy)

    def qfp(cx: float, cy: float, body: float, pins: int, pitch: float, ref: str) -> list[tuple[float, float]]:
        half = body / 2
        d.rect(cx - half, cy - half, body, body, "object")
        # Pin 1 corner tick.
        d.line(cx - half, cy - half + 8, cx - half + 8, cy - half, "edge")
        d.text(cx, cy + 5, ref, 18)
        centers = []
        span = (pins - 1) * pitch
        start = -span / 2
        pad_w, pad_h, gap = 7, 12, 5
        for i in range(pins):
            o = start + i * pitch
            # left, right, top, bottom
            sides = (
                (cx - half - gap - pad_h, cy + o - pad_w / 2, pad_h, pad_w),
                (cx + half + gap, cy + o - pad_w / 2, pad_h, pad_w),
                (cx + o - pad_w / 2, cy - half - gap - pad_h, pad_w, pad_h),
                (cx + o - pad_w / 2, cy + half + gap, pad_w, pad_h),
            )
            for x, y, w, h in sides:
                d.rect(x, y, w, h, "thin")
            centers.append((cx - half - gap - pad_h / 2, cy + o))
            centers.append((cx + half + gap + pad_h / 2, cy + o))
            centers.append((cx + o, cy - half - gap - pad_h / 2))
            centers.append((cx + o, cy + half + gap + pad_h / 2))
        d.text(cx - half - 34, cy - half - 4, "1", 12)
        return centers

    def soic(cx: float, cy: float, w: float, h: float, pins: int, pitch: float, ref: str) -> None:
        d.rect(cx - w / 2, cy - h / 2, w, h, "object")
        d.circle(cx - w / 2 + 8, cy - h / 2 + 8, 2.2, "edge")
        d.text(cx, cy + 5, ref, 16)
        span = (pins - 1) * pitch
        for i in range(pins):
            o = -span / 2 + i * pitch
            d.rect(cx - w / 2 - 16, cy + o - 3.2, 12, 6.4, "thin")
            d.rect(cx + w / 2 + 4, cy + o - 3.2, 12, 6.4, "thin")

    def passive(x: float, y: float, ref: str, vertical: bool = False) -> tuple[float, float]:
        w, h = (14, 28) if vertical else (28, 14)
        d.rect(x, y, w, h, "object")
        # End pads.
        if vertical:
            d.rect(x - 2, y - 6, w + 4, 6, "thin")
            d.rect(x - 2, y + h, w + 4, 6, "thin")
            d.text(x + w + 8, y + h / 2 + 4, ref, 14, "start")
            return x + w / 2, y + h / 2
        d.rect(x - 6, y - 2, 6, h + 4, "thin")
        d.rect(x + w, y - 2, 6, h + 4, "thin")
        d.text(x + w / 2, y - 8, ref, 14)
        return x + w / 2, y + h / 2

    def via(x: float, y: float) -> None:
        d.circle(x, y, 5.5, "thin")
        d.circle(x, y, 2.2, "object")

    qfp(300, 300, 112, 8, 12, "U1")
    soic(560, 230, 52, 108, 7, 12, "U2")
    r1 = passive(168, 470, "R1")
    c3 = passive(250, 500, "C3")
    r2 = passive(430, 470, "R2")
    c1 = passive(640, 430, "C1", vertical=True)
    # Header along the right edge.
    jx, jy = 760, 250
    pins = 8
    pitch = 18
    d.rect(jx - 16, jy - 16, 46, (pins - 1) * pitch + 32, "object", 3)
    d.text(jx + 8, jy - 24, "J1", 15)
    pin_pts = []
    for i in range(pins):
        px, py = jx + 8, jy + i * pitch
        d.rect(px - 5, py - 4, 10, 8, "thin")
        pin_pts.append((px, py))

    # Traces. Orthogonal, chamfered at 45 degrees.
    def route(pts: list[tuple[float, float]]) -> None:
        d.polyline(chamfer(pts, 14), "trace")

    # U1 bottom pad to the left pad of R1, kept above the R1 silkscreen.
    route([(294, 367), (294, 438), (165, 438), (165, 477)])
    # R1 right pad to the left pad of C3.
    route([(199, 477), (220, 477), (220, 507), (247, 507)])
    # U1 right pad toward the U2 left pad.
    route([(367, 294), (500, 294), (500, 230), (524, 230)])
    # U2 lower-left pad down to the R2 left pad, clear of the R2 silkscreen.
    route([(524, 266), (524, 430), (427, 430), (427, 477)])
    # R2 across to C1.
    route([(458, 477), (620, 477), (620, 444), (640, 444)])
    # C1 up to J1 pin 4.
    route([(647, 430), (700, 430), (700, pin_pts[4][1]), (pin_pts[4][0], pin_pts[4][1])])
    # A second trace from U1 top to a via, then to J1 pin 1.
    via(300, 168)
    route([(294, 233), (294, 200), (300, 200), (300, 168)])
    route([(300, 168), (430, 168), (430, pin_pts[0][1]), (pin_pts[0][0], pin_pts[0][1])])
    via(700, 168)
    route([(430, 168), (430, 140), (700, 140), (700, 168)])
    # Decoupling via near U1.
    via(210, 300)
    route([(233, 270), (210, 270), (210, 300)])

    d.dim_h(bx, bx + bw, by + bh + 36, by + bh, str(bw), above=False)
    d.dim_v(by, by + bh, bx - 46, bx, str(bh))
    d.text(bx + bw / 2, by - 18, "PCB LAYOUT", 15)

    d.title_block(680, 700, 250, 58, "PCB LAYOUT", "TOP SILK / CU")
    d.save("sketch-pcb.svg")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    draw_gear()
    draw_motor()
    draw_pcb()


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Generate clean technical line drawings for the site background.

Writes stroke-only SVG (no fills except text) to:

  public/assets/engineering-sketches/sketch-gear.svg
  public/assets/engineering-sketches/sketch-motor.svg
  public/assets/engineering-sketches/sketch-pcb.svg
  public/assets/engineering-sketches/sketch-bearing.svg
  public/assets/engineering-sketches/sketch-bolt.svg
  public/assets/engineering-sketches/sketch-mecanum.svg
  public/assets/engineering-sketches/sketch-belt.svg
  public/assets/engineering-sketches/sketch-planetary.svg
  public/assets/engineering-sketches/sketch-plate.svg

ViewBoxes stay near 1040 by 748 so placement aspect matches the first sheets.
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

    def hatch_band(self, cx: float, cy: float, r_out: float, r_in: float, spacing: float = 10.0, steps: int = 72) -> None:
        """Hatch an annulus. clip-rule evenodd punches the inner circle out."""
        self._clip += 1
        cid = f"h{self._clip}"

        def ring(radius: float, sign: float) -> str:
            pts = []
            for i in range(steps):
                ang = sign * 2 * math.pi * i / steps
                pts.append((cx + radius * math.cos(ang), cy + radius * math.sin(ang)))
            return "M " + " L ".join(f"{fmt(x)} {fmt(y)}" for x, y in pts) + " Z"

        d = ring(r_out, 1) + " " + ring(r_in, -1)
        diag = r_out * 2
        lines = []
        start = cx - r_out - diag
        n = int((diag * 2) / spacing) + 2
        for i in range(n):
            x = start + i * spacing
            lines.append(
                f'<line x1="{fmt(x)}" y1="{fmt(cy - r_out)}" x2="{fmt(x + diag)}" y2="{fmt(cy + r_out)}" {self._style("hatch")} />'
            )
        self.parts.append(f'<clipPath id="{cid}" clip-rule="evenodd"><path d="{d}" /></clipPath>')
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


def arc_pts(cx: float, cy: float, r: float, a0: float, a1: float, n: int) -> list[tuple[float, float]]:
    """Polyline along an SVG angle (0 = +x, clockwise positive)."""
    return [
        (cx + r * math.cos(a0 + (a1 - a0) * i / n), cy + r * math.sin(a0 + (a1 - a0) * i / n))
        for i in range(n + 1)
    ]


def place_gear(outline: list[tuple[float, float]], cx: float, cy: float, spin: float) -> list[tuple[float, float]]:
    """Move a gear outline built around the origin. `spin` is CCW in y-up space."""
    placed = []
    for x, y in outline:
        xr, yr = rotate(x, -y, spin)
        placed.append((cx + xr, cy - yr))
    return placed


def capsule(cx: float, cy: float, length: float, width: float, ang: float) -> str:
    """Stadium outline. `ang` is the long-axis angle in SVG space."""
    radius = width / 2
    half = max(length / 2 - radius, 0.1)
    ux, uy = math.cos(ang), math.sin(ang)
    px, py = -uy, ux
    x1, y1 = cx - ux * half, cy - uy * half
    x2, y2 = cx + ux * half, cy + uy * half
    return (
        f"M {fmt(x1 + px * radius)} {fmt(y1 + py * radius)} "
        f"A {fmt(radius)} {fmt(radius)} 0 0 1 {fmt(x1 - px * radius)} {fmt(y1 - py * radius)} "
        f"L {fmt(x2 - px * radius)} {fmt(y2 - py * radius)} "
        f"A {fmt(radius)} {fmt(radius)} 0 0 1 {fmt(x2 + px * radius)} {fmt(y2 + py * radius)} Z"
    )


def hex_points(cx: float, cy: float, across_flats: float) -> list[tuple[float, float]]:
    """Point-up hexagon. Across-flats is the width between the vertical flats."""
    radius = (across_flats / 2) / math.cos(math.radians(30))
    pts = []
    for i in range(6):
        ang = math.radians(90 + i * 60)
        pts.append((cx + radius * math.cos(ang), cy - radius * math.sin(ang)))
    pts.append(pts[0])
    return pts


def draw_bearing() -> None:
    """Deep-groove ball bearing: face view plus a diametral section."""
    d = Drawing(1040, 748)
    cx, cy = 246, 300
    r_od = 112
    r_bore = 36
    pitch = 78
    ball_r = 14
    d.center_cross(cx, cy, r_od + 28, r_od + 22)
    d.circle(cx, cy, r_od, "object")
    d.circle(cx, cy, r_bore, "object")
    d.circle(cx, cy, pitch, "center")
    for k in range(8):
        ang = math.radians(k * 45 + 22.5)
        d.circle(cx + pitch * math.cos(ang), cy + pitch * math.sin(ang), ball_r, "object")
    # Cutting plane just outside the rims, same convention as the spur gear.
    d.line(cx - r_od - 30, cy, cx - r_od - 8, cy, "plane")
    d.line(cx + r_od + 8, cy, cx + r_od + 30, cy, "plane")
    d.arrow(cx - r_od - 30, cy, math.pi / 2, 8)
    d.arrow(cx + r_od + 30, cy, math.pi / 2, 8)
    d.text(cx - r_od - 30, cy - 16, "A", 14)
    d.text(cx + r_od + 30, cy - 16, "A", 14)
    d.dim_v(cy - r_od, cy + r_od, cx - r_od - 58, cx - r_od, "Ø 224")
    d.text(cx, cy - r_od - 36, "FRONT", 13)

    # Section A-A. Same radial scale, axis horizontal.
    # The groove is deeper than the shoulder, so each ball sits in a pocket
    # and still shows past the land. Cage ears occupy the axial gap.
    sx, width, sy = 575, 72, cy
    mid = sx + width / 2
    pocket = 24
    shoulder = 10
    groove = ball_r + 6
    races = []
    for sign in (1, -1):
        # sign +1 is the upper race (smaller SVG y). Pocket back is away from the axis.
        outer = [
            (sx, sy - sign * r_od),
            (sx + width, sy - sign * r_od),
            (sx + width, sy - sign * (pitch + shoulder)),
            (mid + pocket, sy - sign * (pitch + shoulder)),
            (mid + pocket, sy - sign * (pitch + groove)),
            (mid - pocket, sy - sign * (pitch + groove)),
            (mid - pocket, sy - sign * (pitch + shoulder)),
            (sx, sy - sign * (pitch + shoulder)),
        ]
        inner = [
            (sx, sy - sign * r_bore),
            (sx, sy - sign * (pitch - shoulder)),
            (mid - pocket, sy - sign * (pitch - shoulder)),
            (mid - pocket, sy - sign * (pitch - groove)),
            (mid + pocket, sy - sign * (pitch - groove)),
            (mid + pocket, sy - sign * (pitch - shoulder)),
            (sx + width, sy - sign * (pitch - shoulder)),
            (sx + width, sy - sign * r_bore),
        ]
        races.append(outer)
        races.append(inner)
    for poly in races:
        d.hatch(poly, 8)
        d.polyline(poly + [poly[0]], "object")
    ear_w, ear_h = 6, 14
    for sign in (1, -1):
        ball_y = sy - sign * pitch
        d.circle(mid, ball_y, ball_r, "object")
        d.rect(mid - ball_r - 2 - ear_w, ball_y - ear_h / 2, ear_w, ear_h, "thin")
        d.rect(mid + ball_r + 2, ball_y - ear_h / 2, ear_w, ear_h, "thin")
    d.line(sx - 24, sy, sx + width + 24, sy, "center")
    d.line(mid, sy - pitch - groove - 16, mid, sy + pitch + groove + 16, "center")

    d.dim_h(sx, sx + width, sy + r_od + 28, sy + r_od, str(width), above=False)
    d.dim_v(sy - r_bore, sy + r_bore, sx + width + 46, sx + width, "Ø 72")
    d.text(mid, sy + r_od + 72, "SECTION A-A", 14)
    d.leader(mid - ball_r - 6, sy - pitch, 470, 168, "CAGE", "end")
    d.leader(mid + 4, sy - pitch - ball_r + 2, 760, 168, "BALL", "start")

    d.title_block(772, 678, 248, 56, "BALL BEARING", "SECTION A-A")
    d.save("sketch-bearing.svg")


def draw_bolt() -> None:
    """Hex-head screw, top and side, with a run of schematic thread crests."""
    d = Drawing(1040, 748)
    across = 86
    head_t = 54
    shank_r = 20
    grip = 108
    thread_len = 156
    pitch = 9
    y = 455
    x0 = 390
    head_cx = x0 + head_t / 2

    # Top view, point up, aligned over the head. Side view height matches this.
    top_y = 150
    hex_r = (across / 2) / math.cos(math.radians(30))
    d.polyline(hex_points(head_cx, top_y, across), "object")
    d.circle(head_cx, top_y, across / 2 - 6, "thin")
    d.circle(head_cx, top_y, shank_r, "hidden")
    d.center_cross(head_cx, top_y, across / 2 + 18, hex_r + 12)
    d.dim_h(head_cx - across / 2, head_cx + across / 2, top_y + hex_r + 40, top_y + hex_r * 0.5, f"{across} AF")
    d.text(head_cx, top_y - hex_r - 36, "TOP", 13)

    # Side view across corners: pointed chamfer and the corner edge down the head.
    x_shank = x0 + head_t
    x_thread = x_shank + grip
    x_end = x_thread + thread_len
    half_c = hex_r
    chamfer = 14
    tip = 16
    profile = [
        (x0, y - half_c + chamfer),
        (x0 + chamfer, y - half_c),
        (x_shank, y - half_c),
        (x_shank, y - shank_r),
        (x_end - tip, y - shank_r),
        (x_end, y - shank_r + tip),
        (x_end, y + shank_r - tip),
        (x_end - tip, y + shank_r),
        (x_shank, y + shank_r),
        (x_shank, y + half_c),
        (x0 + chamfer, y + half_c),
        (x0, y + half_c - chamfer),
    ]
    d.polyline(profile + [profile[0]], "object")
    d.line(x0 + chamfer + 2, y, x_shank, y, "edge")

    minor = shank_r - 5
    d.line(x_thread, y - minor, x_end - tip - 4, y - minor, "thin")
    d.line(x_thread, y + minor, x_end - tip - 4, y + minor, "thin")
    crests = 12
    for i in range(crests):
        x = x_thread + 4 + i * pitch
        d.polyline(
            [(x, y - minor), (x + pitch / 2, y - shank_r), (x + pitch, y - minor)],
            "edge",
        )
        d.polyline(
            [(x, y + minor), (x + pitch / 2, y + shank_r), (x + pitch, y + minor)],
            "edge",
        )
    d.line(x0 - 28, y, x0, y, "center")
    d.line(x_shank, y, x_end + 22, y, "center")

    d.dim_h(x0, x_end, y + half_c + 34, y + half_c, str(head_t + grip + thread_len), above=False)
    d.dim_h(x_thread, x_end, y - half_c - 30, y - shank_r, str(thread_len))
    d.dim_v(y - shank_r, y + shank_r, x_end + 40, x_end, "Ø 40")
    d.text(x0 - 16, y + 4, "SIDE", 13, "end")
    d.leader(x_thread + 5 * pitch, y - shank_r, x_thread + 8, y - half_c - 58, "THREAD", "start")
    d.leader(x_thread + 36, y + minor, x_thread + 8, y + half_c + 16, "MINOR", "start")

    d.title_block(772, 678, 248, 56, "HEX BOLT", "TOP / SIDE")
    d.save("sketch-bolt.svg")


def draw_mecanum() -> None:
    """Roller wheel, face and side. Roller axes sit at 45 degrees."""
    d = Drawing(1040, 748)
    cx, cy, radius = 268, 318, 124
    hub_r, bore_r = 46, 15
    d.circle(cx, cy, radius, "object")
    d.circle(cx, cy, radius - 16, "thin")
    d.circle(cx, cy, hub_r, "object")
    d.path(bore_keyway_path(cx, cy, bore_r, 8, 4), "object")
    d.center_cross(cx, cy, radius + 24, radius + 18)
    bolt_r = 31
    for k in range(6):
        ang = math.radians(k * 60 + 30)
        hx = cx + bolt_r * math.cos(ang)
        hy = cy + bolt_r * math.sin(ang)
        d.circle(hx, hy, 5, "object")
        d.center_cross(hx, hy, 9, 9)
    for k in range(8):
        ang = math.radians(k * 45 + 12)
        rx = cx + 86 * math.cos(ang)
        ry = cy + 86 * math.sin(ang)
        # Long axis is 45 degrees off the tangent, same sense all the way around.
        d.path(capsule(rx, ry, 74, 24, ang + math.pi / 4), "object")
    d.dim_v(cy - radius, cy + radius, cx - radius - 48, cx - radius, "Ø 248")
    d.text(cx, cy - radius - 34, "FRONT", 13)

    # Side view, third angle: axle points back toward the front view.
    axle_r = 15
    axle_len = 68
    wheel_w = 96
    x_axle = 575
    x_face = x_axle + axle_len
    x_back = x_face + wheel_w
    d.polyline(
        [
            (x_axle, cy - axle_r),
            (x_face, cy - axle_r),
            (x_face, cy - radius),
            (x_back, cy - radius),
            (x_back, cy + radius),
            (x_face, cy + radius),
            (x_face, cy + axle_r),
            (x_axle, cy + axle_r),
            (x_axle, cy - axle_r),
        ],
        "object",
    )
    d.line(x_axle - 18, cy, x_back + 18, cy, "center")
    # Near-side rollers. Rise equals run, so the axis is 45 degrees.
    # `my` is shifted by half the skew so each roller is centered on its station.
    half_l, half_h, skew = 14, 7, 28
    mx = (x_face + x_back) / 2
    for desired in (-52, 0, 52):
        my = cy + desired + skew / 2
        d.polyline(
            [
                (mx - half_l, my - half_h),
                (mx + half_l, my - half_h - skew),
                (mx + half_l, my + half_h - skew),
                (mx - half_l, my + half_h),
                (mx - half_l, my - half_h),
            ],
            "object",
        )
    d.dim_h(x_face, x_back, cy + radius + 32, cy + radius, str(wheel_w), above=False)
    d.text((x_face + x_back) / 2, cy - radius - 28, "SIDE", 13)
    d.leader(mx, cy - 52, x_back + 26, cy - radius + 24, "45°", "start")
    d.text(cx, cy + radius + 56, "8 ROLLERS", 13)

    d.title_block(772, 678, 248, 56, "DRIVE WHEEL", "MECANUM")
    d.save("sketch-mecanum.svg")


def belt_tangents(c1: tuple[float, float], r1: float, c2: tuple[float, float], r2: float) -> tuple[float, float]:
    """SVG angles of the external belt tangents. Same angle on both pulleys."""
    dx, dy = c2[0] - c1[0], c2[1] - c1[1]
    dist = math.hypot(dx, dy)
    theta = math.atan2(dy, dx)
    alpha = math.acos((r1 - r2) / dist)
    return theta - alpha, theta + alpha


def draw_belt() -> None:
    """Open belt between two plain pulleys."""
    d = Drawing(1040, 748)
    c1 = (250, 318)
    c2 = (690, 318)
    r1, r2 = 116, 64
    thick = 8

    def pulley(center: tuple[float, float], radius: float, hub: float, bore: float, holes: int, bolt: float) -> None:
        cx, cy = center
        d.circle(cx, cy, radius, "object")
        d.circle(cx, cy, radius - 18, "thin")
        d.circle(cx, cy, hub, "object")
        d.circle(cx, cy, bore, "object")
        d.center_cross(cx, cy, radius + 16, radius + 14)
        for k in range(holes):
            ang = math.radians(-90 + k * (360 / holes))
            d.circle(cx + bolt * math.cos(ang), cy + bolt * math.sin(ang), 8 if radius > 90 else 6, "object")

    pulley(c1, r1, 30, 12, 4, 62)
    pulley(c2, r2, 20, 9, 3, 36)

    def belt(radius_a: float, radius_b: float, kind: str) -> None:
        a_top, a_bot = belt_tangents(c1, radius_a, c2, radius_b)
        # Large pulley takes the long wrap; the small pulley takes the short outer wrap.
        span = a_bot - a_top
        outer = arc_pts(c1[0], c1[1], radius_a, a_top, a_top - (2 * math.pi - span), 40)
        inner = arc_pts(c2[0], c2[1], radius_b, a_top, a_bot, 24)
        d.polyline([outer[0], inner[0]], kind)
        d.polyline(outer, kind)
        d.polyline([outer[-1], inner[-1]], kind)
        d.polyline(inner, kind)

    belt(r1 + thick, r2 + thick, "object")
    belt(r1, r2, "thin")

    d.dim_v(c1[1] - r1, c1[1] + r1, c1[0] - r1 - 42, c1[0] - r1, "Ø 232")
    d.dim_v(c2[1] - r2, c2[1] + r2, c2[0] + r2 + 40, c2[0] + r2, "Ø 128")
    d.dim_h(c1[0], c2[0], c1[1] + r1 + 40, c1[1] + r1, str(int(c2[0] - c1[0])), above=False)
    a_top, _ = belt_tangents(c1, r1 + thick, c2, r2 + thick)
    span_a = (c1[0] + (r1 + thick) * math.cos(a_top), c1[1] + (r1 + thick) * math.sin(a_top))
    span_b = (c2[0] + (r2 + thick) * math.cos(a_top), c2[1] + (r2 + thick) * math.sin(a_top))
    mid_x = (c1[0] + c2[0]) / 2
    span_t = (mid_x - span_a[0]) / (span_b[0] - span_a[0])
    span_y = span_a[1] + span_t * (span_b[1] - span_a[1])
    d.leader(mid_x, span_y, mid_x + 8, span_y - 46, "BELT", "start")

    d.title_block(772, 678, 248, 56, "BELT DRIVE", "OPEN BELT")
    d.save("sketch-belt.svg")


def draw_planetary() -> None:
    """Sun, three planets, and an internal ring. Tooth counts mesh at 120 degrees."""
    d = Drawing(1040, 748)
    module = 5.6
    z_sun, z_planet, z_ring = 15, 15, 45
    rp_s = module * z_sun / 2
    rp_p = module * z_planet / 2
    rp_r = module * z_ring / 2
    cx, cy = 318, 318
    # Extra center distance keeps the involute flanks from crossing.
    # The ring pitch grows by the same amount so the three meshes still line up.
    mesh_gap = 2.8
    dist = rp_s + rp_p + mesh_gap
    ring_pitch = dist + rp_p

    sun, _ = gear_tooth_points(0, 0, z_sun, module, steps=6)
    planet, _ = gear_tooth_points(0, 0, z_planet, module, steps=6)
    d.path(points_path(place_gear(sun, cx, cy, 0)), "object")
    d.circle(cx, cy, 14, "object")
    d.center_cross(cx, cy, 22, 22)

    d.circle(cx, cy, 26, "thin")
    # Carrier arms sit in the open sectors between the planets.
    for k in range(3):
        phi = math.radians(30 + k * 120)
        arm = -phi
        ox, oy = math.cos(arm + math.pi / 2), math.sin(arm + math.pi / 2)
        inner = rp_s + module + 6
        outer = ring_pitch - module - 10
        for side in (4.5, -4.5):
            d.line(
                cx + inner * math.cos(arm) + ox * side,
                cy + inner * math.sin(arm) + oy * side,
                cx + outer * math.cos(arm) + ox * side,
                cy + outer * math.sin(arm) + oy * side,
                "edge",
            )
    for k in range(3):
        phi = math.radians(90 + k * 120)
        px = cx + dist * math.cos(phi)
        py = cy - dist * math.sin(phi)
        # Space faces the sun; with an odd tooth count the opposite tooth faces the ring.
        spin = phi + math.pi - math.pi / z_planet
        d.path(points_path(place_gear(planet, px, py, spin)), "object")
        d.circle(px, py, 8, "object")
        d.center_cross(px, py, 14, 14)

    # Internal ring: trapezoid teeth, spaces centered on each planet.
    r_tip = ring_pitch - module
    r_root = ring_pitch + 1.25 * module
    r_out = ring_pitch + 24
    space = math.radians(90)
    half = math.pi / z_ring
    teeth = []
    for k in range(z_ring):
        mid = space + half + k * (2 * half)
        # mid is the tooth center. `half` above is pi/z, and the pitch step is 2*half.
        a_root_l = mid - half * 0.48
        a_tip_l = mid - half * 0.26
        a_tip_r = mid + half * 0.26
        a_root_r = mid + half * 0.48

        def xy(radius: float, ang: float) -> tuple[float, float]:
            return (cx + radius * math.cos(ang), cy - radius * math.sin(ang))

        teeth.extend((xy(r_root, a_root_l), xy(r_tip, a_tip_l), xy(r_tip, a_tip_r), xy(r_root, a_root_r)))
    d.circle(cx, cy, r_out, "object")
    d.hatch_band(cx, cy, r_out, r_root, 9)
    d.polyline(teeth + [teeth[0]], "object")
    d.circle(cx, cy, ring_pitch, "center")

    d.leader(cx + (rp_s + module), cy, 640, 156, "SUN", "start")
    d.leader(cx, cy - dist - rp_p - module + 6, 640, 220, "3X PLANET", "start")
    d.leader(cx + r_out, cy, 640, 284, "RING", "start")
    d.leader(cx, cy + 100, 640, 430, "CARRIER", "start")

    d.title_block(772, 678, 248, 56, "PLANETARY", "SUN / PLANET / RING")
    d.save("sketch-planetary.svg")


def draw_plate() -> None:
    """Flat chassis plate with a bearing pattern, a slot, and edge holes."""
    d = Drawing(1040, 748)
    x, y, w, h = 150, 118, 640, 400
    chamfer = 22
    outline = [
        (x + chamfer, y),
        (x + w - chamfer, y),
        (x + w, y + chamfer),
        (x + w, y + h - chamfer),
        (x + w - chamfer, y + h),
        (x + chamfer, y + h),
        (x, y + h - chamfer),
        (x, y + chamfer),
    ]
    d.polyline(outline + [outline[0]], "object")
    d.line(x - 16, y + h / 2, x + w + 16, y + h / 2, "center")
    d.line(x + w / 2, y - 16, x + w / 2, y + h + 16, "center")

    inset = 44
    hole_r = 9
    holes = [
        (x + inset, y + inset),
        (x + w - inset, y + inset),
        (x + inset, y + h / 2),
        (x + w - inset, y + h / 2),
        (x + inset, y + h - inset),
        (x + w - inset, y + h - inset),
    ]
    for hx, hy in holes:
        d.circle(hx, hy, hole_r, "object")
        d.center_cross(hx, hy, hole_r + 7, hole_r + 7)

    bx, by = x + 220, y + h / 2
    d.circle(bx, by, 28, "object")
    d.circle(bx, by, 16, "thin")
    d.center_cross(bx, by, 62, 40)
    for k in range(4):
        ang = math.radians(45 + k * 90)
        hx = bx + 48 * math.cos(ang)
        hy = by + 48 * math.sin(ang)
        d.circle(hx, hy, 6, "object")
        d.center_cross(hx, hy, 11, 11)

    slot_cx, slot_cy = x + 470, y + h / 2
    d.path(capsule(slot_cx, slot_cy, 108, 18, 0), "object")
    d.line(slot_cx - 62, slot_cy, slot_cx + 62, slot_cy, "center")

    d.dim_h(x, x + w, y + h + 32, y + h, str(w), above=False)
    d.dim_v(y, y + h, x - 42, x, str(h))
    d.dim_h(x, bx, y - 28, y, "220")
    d.text(x + w / 2, y - 52, "TOP", 13)
    d.leader(holes[0][0] + 8, holes[0][1] + 8, x + 130, y + 96, "6X Ø18", "start")
    d.leader(bx, by - 30, bx + 86, by - 86, "Ø 56", "start")
    hole_ang = math.radians(45)
    d.leader(
        bx + 54 * math.cos(hole_ang),
        by - 54 * math.sin(hole_ang),
        bx + 156,
        by - 78,
        "4X Ø12",
        "start",
    )
    d.leader(slot_cx + 20, slot_cy - 9, slot_cx + 20, slot_cy - 58, "108 x 18", "start")

    d.title_block(772, 678, 248, 56, "CHASSIS PLATE", "HOLE PATTERN")
    d.save("sketch-plate.svg")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    draw_gear()
    draw_motor()
    draw_pcb()
    draw_bearing()
    draw_bolt()
    draw_mecanum()
    draw_belt()
    draw_planetary()
    draw_plate()


if __name__ == "__main__":
    main()

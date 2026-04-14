#!/usr/bin/env python3
"""
Render CSS-based email source HTML into PNG crops for Gmail-safe delivery.

Usage:
    python3 scripts/render_email_images.py email-templates/v2-launch/source.html

The source HTML must have elements marked with `data-email-crop="<name>"`.
Each marked element is rendered at 2x DPI in headless Chrome (with real
webfonts + CSS) and cropped to PNG: `<source_dir>/img/<name>.png`.

Why: Gmail strips @font-face + most CSS. Authoring once in CSS and cropping
to PNG preserves the design (real fonts, gradients, shadows) while remaining
deliverable.

Requires: Python 3.9+, Pillow, Google Chrome installed at standard macOS path.
"""
from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
RENDER_WIDTH = 560       # email container width in CSS px
RENDER_HEIGHT = 4000     # tall viewport to capture everything
DPR = 2                  # 2x for retina crisp images
BG_DEFAULT = (21, 21, 21)  # #151515 — email body bg fallback


def die(msg: str) -> None:
    print(f"error: {msg}", file=sys.stderr)
    sys.exit(1)


def inject_marker(html: str) -> str:
    """Inject a script that emits bounding rects of all [data-email-crop] nodes."""
    marker = """
<script id="__email_marker__">
(async () => {
  await document.fonts.ready;
  await new Promise(r => setTimeout(r, 500));
  const out = {};
  document.querySelectorAll('[data-email-crop]').forEach(el => {
    const name = el.getAttribute('data-email-crop');
    const bg   = el.getAttribute('data-email-bg') || '';
    const r = el.getBoundingClientRect();
    out[name] = {
      box: [Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom)],
      bg: bg,
    };
  });
  const el = document.createElement('pre');
  el.id = '__email_coords__';
  el.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:2147483647;background:lime;color:black;font-family:monospace;font-size:10px;padding:4px;margin:0;white-space:pre;max-height:90vh;overflow:hidden;';
  el.textContent = JSON.stringify(out);
  document.body.appendChild(el);
})();
</script>
"""
    if "</body>" not in html:
        die("source HTML missing </body> tag")
    return html.replace("</body>", marker + "</body>")


def chrome_screenshot(html_path: Path, out_path: Path, width: int, height: int) -> None:
    if not Path(CHROME).exists():
        die(f"Chrome not found at {CHROME}")
    subprocess.run(
        [
            CHROME,
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--hide-scrollbars",
            f"--virtual-time-budget=15000",
            f"--window-size={width},{height}",
            f"--force-device-scale-factor={DPR}",
            f"--screenshot={out_path}",
            f"file://{html_path}",
        ],
        check=True,
        capture_output=True,
        timeout=60,
    )


def parse_hex_color(hex_str: str) -> tuple[int, int, int]:
    """Parse '#RGB', '#RRGGBB', or '' into RGB tuple (defaults to BG_DEFAULT)."""
    s = hex_str.strip().lstrip("#")
    if not s:
        return BG_DEFAULT
    if len(s) == 3:
        s = "".join(c * 2 for c in s)
    if len(s) != 6:
        return BG_DEFAULT
    return tuple(int(s[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def read_coords(screenshot: Path) -> dict[str, dict]:
    """Extract the JSON coord map from the lime banner by OCR-free means:
    the marker script writes it to the DOM *and* to window.name via localStorage
    isn't reliable cross-process, so we take a separate headless step that
    dumps the document body text after the marker has run."""
    # We read coords via a secondary `--dump-dom` pass instead of OCR.
    # See `render_once` which handles both screenshot + coord extraction.
    raise NotImplementedError


def render_once(source_html: Path) -> tuple[Path, dict[str, dict]]:
    """Render source HTML once at 2x DPI, returning screenshot path + coord map.

    Two-pass approach:
      1. Inject marker + screenshot → we don't actually use the lime banner for coords.
      2. Inject marker + `--dump-dom` → parse the JSON from the injected <pre>.
    """
    html = source_html.read_text()
    marked = inject_marker(html)

    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".html", dir=source_html.parent, delete=False
    ) as tf:
        tf.write(marked)
        marked_path = Path(tf.name)

    try:
        # Pass 1: clean screenshot WITHOUT the marker banner (render the original HTML)
        with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tf_png:
            screenshot = Path(tf_png.name)

        # Render the ORIGINAL html (not marked) for the clean screenshot
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".html", dir=source_html.parent, delete=False
        ) as tf_orig:
            tf_orig.write(html)
            orig_path = Path(tf_orig.name)
        try:
            chrome_screenshot(orig_path, screenshot, RENDER_WIDTH, RENDER_HEIGHT)
        finally:
            orig_path.unlink(missing_ok=True)

        # Pass 2: dump DOM of the marked version to extract coordinates
        dom = subprocess.run(
            [
                CHROME,
                "--headless=new",
                "--disable-gpu",
                "--no-sandbox",
                "--virtual-time-budget=15000",
                f"--window-size={RENDER_WIDTH},{RENDER_HEIGHT}",
                f"--force-device-scale-factor={DPR}",
                "--dump-dom",
                f"file://{marked_path}",
            ],
            check=True,
            capture_output=True,
            text=True,
            timeout=60,
        ).stdout

        # The injected <pre id="__email_coords__">{json}</pre> is somewhere in the DOM
        import re

        m = re.search(
            r'<pre id="__email_coords__"[^>]*>([^<]+)</pre>',
            dom,
        )
        if not m:
            die("coordinate marker not found in rendered DOM — source may be missing [data-email-crop] elements")
        coords = json.loads(m.group(1))
        return screenshot, coords
    finally:
        marked_path.unlink(missing_ok=True)


def crop_region(screenshot: Path, region: dict, out_path: Path) -> tuple[int, int]:
    """Crop one region from the 2x screenshot, flatten to RGB, save.
    Returns (css_width, css_height) for use in the email HTML width/height attrs."""
    x0, y0, x1, y1 = region["box"]
    bg = parse_hex_color(region.get("bg", ""))

    src = Image.open(screenshot)
    # Multiply by DPR because screenshot is 2x; coords are CSS px
    crop = src.crop((x0 * DPR, y0 * DPR, x1 * DPR, y1 * DPR))

    rgb = Image.new("RGB", crop.size, bg)
    if crop.mode == "RGBA":
        rgb.paste(crop, mask=crop.split()[3])
    else:
        rgb.paste(crop)
    rgb.save(out_path)

    # Return CSS dimensions (half of raster size, since crop is @2x)
    return crop.size[0] // DPR, crop.size[1] // DPR


def main() -> None:
    if len(sys.argv) != 2:
        die("usage: render_email_images.py <source.html>")

    source = Path(sys.argv[1]).resolve()
    if not source.exists():
        die(f"file not found: {source}")

    img_dir = source.parent / "img"
    img_dir.mkdir(exist_ok=True)

    print(f"rendering {source.name}...")
    screenshot, coords = render_once(source)

    if not coords:
        die("no [data-email-crop] elements found in source HTML")

    print(f"cropping {len(coords)} regions → {img_dir}/")
    report: list[tuple[str, int, int]] = []
    for name, region in coords.items():
        out = img_dir / f"{name}.png"
        css_w, css_h = crop_region(screenshot, region, out)
        print(f"  {name}.png  {css_w}x{css_h} (display)")
        report.append((name, css_w, css_h))

    screenshot.unlink(missing_ok=True)

    # Print HTML-ready img tag snippets for easy copy-paste
    print("\n--- paste into email.html ---")
    for name, w, h in report:
        print(f'<img src="img/{name}.png" width="{w}" height="{h}" style="display:block;width:100%;max-width:{w}px;height:auto;border:0;" alt="" />')


if __name__ == "__main__":
    main()

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An infinite-scroll papercraft website for a bachelor party. The visitor scrolls
(forever, looping) and a camera glides around a circular "world" of four
dioramas: **The Groom & His Wife → The Airbnb → The Weekend (activities) →
Get Ready (packing + countdown)**.

It is a **2.5D** adaptation of the 3D reference at
`andrewwoan/aimee-weis-papercraft-world`: instead of Blender-modeled scenes, each
diorama is built from flat transparent-PNG cutouts placed on planes at varying
depth inside a real 3D (Three.js / WebGL) scene. The perspective camera moving
past those layered planes is what produces the papercraft parallax — no Blender,
no model pipeline. We deliberately use the **WebGL** renderer (not the
reference's WebGPU) for phone/browser compatibility.

A local clone of that reference lives at `reference/aimee-weis-papercraft-world/`
(git-ignored) — treat it as the **source of truth for inspiration and high-level
design** (world layout, scene structure, camera/scroll feel). Consult it before
guessing at how the experience should look or behave; don't copy its WebGPU/Blender
pipeline.

## Commands

```bash
npm install        # install deps
npm run dev        # vite dev server at http://localhost:5173 (--host for LAN)
npm run build      # production build to dist/ (base = /bachelor-party/)
npm run preview    # serve the production build locally
npm run lint       # eslint
```

There is no test suite. To verify visually, run `npm run dev` and drive it with
the `playwright-cli` skill (click **Enter**, then use the bottom nav or scroll).

## Architecture

**Data flow (the core mechanic):**
`Experience.jsx` wraps the R3F `<Canvas>` in Lenis (`infinite: true`) over a tall
invisible scroll div. Lenis reports normalized scroll progress (0..1, wrapping)
→ `useCurveProgressStore.scrollProgress`. Each frame `CustomCamera` samples two
procedurally-generated circular curves (`Curves.js`) at that progress: one for
the camera position, one for the look-at point. The camera rides an inner ring
and looks radially outward, so whichever diorama sits at that angle is framed.

**Geometry lives in one place — `src/Experience/layout.js`.** It defines the ring
radii/heights (`RING`), the enclosing-shell dimensions (`WORLD`), and computes
each section's angular position, facing rotation, and the scroll progress at which
it's centered. `Curves.js`, `Section.jsx`, `SectionNav.jsx`, and `WorldShell.jsx`
all read from it, so placement can never drift out of sync.
`sectionProgress(i) = i / SECTION_COUNT`, i.e. sections are centered at 0, .25,
.5, .75.

**The world shell — `WorldShell.jsx`.** The camera orbits *inside* one continuous
enclosed world: a single `LatheGeometry` surface (a 2D profile spun 360° around Y)
that is floor → wall → domed ceiling in one seamless piece, so there is never
empty void behind or between dioramas (this mirrors the reference, where every
camera stop is a segment of one enclosed round shell). It's unlit `meshBasic` with
a vertical floor→wall→ceiling vertex-color gradient to match the flat papercraft
look. Dimensions/tones come from `WORLD` in `layout.js`; `wallRadius` is set to
sit behind the backmost diorama layer. Per-section wall *tinting* (color identity
per stop, like the reference's seasons) is intended future polish, keyed off
vertex angle.

**Gotcha — camera facing:** `Object3D.lookAt()` on the camera *group* (a
non-camera) points the group's **+Z** at the target, but the child camera looks
down **−Z**. So the inner `PerspectiveCamera` in `CustomCamera.jsx` is rotated
`Math.PI` about Y to face the target. Removing that flip points the camera 180°
the wrong way (you'll see the opposite diorama from the one the nav highlights).

**2.5D layers:** `Section.jsx` places a section's layers (from
`config/sections.js`) at different local Z (`depth`); `PaperLayer.jsx` renders
each as a textured plane (width derived from image aspect so art never stretches)
or, when `src` is `null`, a labelled colored placeholder so the scene always
runs. Clicking a section opens its info panel via `useExperienceStore.openPanel`.

**State (Zustand, `src/store/`):** `useCurveProgressStore` (curves +
scrollProgress), `useExperienceStore` (ready/scene/openPanel flags),
`useResponsiveStore` (isMobile). The Lenis instance is shared outside the React
tree via `src/lib/lenis.js` so `SectionNav` can `scrollToProgress`.

**UI overlay (DOM, not canvas):** `LoadingScreen` (progress + torn-paper SVG
filter reveal), `SectionNav` (bottom HUD, jump between stops), `SectionPanel`
(slide-over with the section's content; renders `Countdown` for the packing
section). All composed in `App.jsx` alongside `<Experience>`.

## Editing content vs. code

- **All visitor-facing text + the countdown date** live in `src/config/content.js`
  (`PARTY_START`, `SITE`, and the `SECTIONS` array). Fields marked `TODO` are
  placeholders. This is the file to hand-edit for real details.
- **Which images appear in each diorama** is `src/config/sections.js`. Drop art in
  `public/2d-assets/`, reference it by filename, and always build URLs with
  `asset()` from `src/config/assets.js` (it prefixes `import.meta.env.BASE_URL`
  so paths work under the GitHub Pages subpath). `public/2d-assets/` is the
  **single source** for art — there is no separate authoring folder (unlike the
  reference's `raw_assets/`→`public/` split, which exists only for its Blender→KTX
  pipeline; our PNGs are final, so one folder is simpler).
- Layers need **transparent PNGs**. `depth` more negative = further back; positive
  = toward the camera (foreground). `scale` is the plane's world height.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml` (build → GitHub Pages).
`vite.config.js` sets `base` to `/bachelor-party/` for `build` only, so the repo
name must stay `bachelor-party` or both must change together. Note: the git
remote is currently **GitHub** (`aliamrabdalla/bachelor-party`).

Git/push quirks in this environment: the `gh` CLI is **not installed** (use plain
`git`, not `gh`), and commits emit harmless `LF will be replaced by CRLF`
warnings — ignore them.

**Review workflow — the user reviews ONLY via the live GitHub Pages site, not a
local dev server.** So when work is ready for their eyes, commit AND push to
`main` (which triggers the Pages deploy) without being asked — don't leave changes
local waiting for review. A local `npm run dev` is for *your* own verification, not
theirs.

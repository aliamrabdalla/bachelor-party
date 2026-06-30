# AGENTS.md

Guidance for AI coding agents working in this repository. This is the agent-facing
companion to `README.md` (human-facing) and `CLAUDE.md` (Claude Code specifics);
where they overlap, the architecture detail in `CLAUDE.md` is the deepest source.

## Project overview

An infinite-scroll **papercraft** website for a bachelor party. The visitor
scrolls (forever, looping) and a perspective camera glides around the inside of
one continuous round world, visiting four dioramas:

**The Groom & His Bride → The Airbnb → The Weekend → Get Ready (packing + countdown)**

It is **2.5D**: each diorama is built from flat, transparent-PNG cutouts placed on
planes at varying depth inside a real Three.js / **WebGL** scene. The camera moving
past those layered planes produces the papercraft parallax — there is no Blender or
model pipeline. WebGL (not WebGPU) is a deliberate choice for phone/browser reach.

The 3D reference `andrewwoan/aimee-weis-papercraft-world` is cloned (git-ignored) at
`reference/aimee-weis-papercraft-world/` and is the **source of truth for styling,
world layout, camera/scroll feel, and how the experience behaves**. Consult it
before guessing at look or behavior. Do **not** copy its WebGPU/Blender pipeline.

## Setup & commands

```bash
npm install        # install deps
npm run dev        # vite dev server at http://localhost:5173 (add -- --host for LAN)
npm run build      # production build to dist/ (base = /bachelor-party/)
npm run preview    # serve the production build locally
npm run lint       # eslint
```

- Node + Vite project. React 19, React Three Fiber / three.js (WebGL), Zustand, GSAP, Lenis.
- **There is no test suite.** Verify changes visually (see Testing below).

## Project structure (where things live)

- `src/Experience/` — the 3D scene (R3F). `layout.js` is the geometry hub; components in `components/`.
- `src/config/content.js` — all visitor-facing text + countdown date (`PARTY_START`, `SITE`, `SECTIONS`).
- `src/config/sections.js` — which PNG cutouts appear in each diorama and their depth/scale/position.
- `src/config/assets.js` — `asset()` URL helper (prefixes `import.meta.env.BASE_URL`).
- `src/components/` — DOM overlay UI (`SectionNav`, `SectionPanel`, `LoadingScreen`, `Countdown`, `ZoomSlider`).
- `src/store/` — Zustand stores (`useCurveProgressStore`, `useExperienceStore`, `useResponsiveStore`, camera/zoom).
- `public/2d-assets/` — **the single source for art**, transparent PNGs referenced by filename.
- `reference/` — git-ignored reference clone; read-only source of truth for design.

## Architecture essentials

- **Core mechanic:** `Experience.jsx` wraps the R3F `<Canvas>` in Lenis (`infinite: true`)
  over a tall invisible scroll div. Lenis → normalized scroll progress (0..1, wrapping)
  → `useCurveProgressStore.scrollProgress`. Each frame `CustomCamera` samples two
  procedural circular curves (`Curves.js`) at that progress (one for camera position,
  one for look-at). The camera rides an inner ring and looks radially outward, so
  whichever diorama sits at that angle is framed.
- **Geometry is centralized in `src/Experience/layout.js`** — `RING` (radii/heights),
  `WORLD` (shell dimensions + flat papercraft palette), and the per-section angle,
  facing rotation, and centered scroll progress. `sectionProgress(i) = i / SECTION_COUNT`
  (sections centered at 0, .25, .5, .75). Everything that places geometry reads from
  here so the camera path and sections never drift out of sync.
- **World shell (`WorldShell.jsx`):** four flat papercraft alcoves (one per 90° section),
  each a custom `BufferGeometry` — flat floor sector + vertical wall arc + flat ceiling
  sector — in that section's accent-derived palette, with **hard dark seam lines** at the
  four boundaries. Flat `meshBasicMaterial` (no vertex gradient) is what reads as cut
  paper. Do not reintroduce smooth gradients/glow.
- **2.5D layers (`Section.jsx` / `PaperLayer.jsx`):** each layer is a textured plane
  (width derived from image aspect so art never stretches) or, when `src` is `null`, a
  labelled placeholder so the scene always runs.

## Gotchas

- **Camera facing:** `group.lookAt()` points the group's **+Z** at the target, but the
  child `PerspectiveCamera` looks down **−Z**. So the inner camera in `CustomCamera.jsx`
  is rotated `Math.PI` about Y. Removing that flip points the camera 180° wrong.
- **Asset URLs:** always build with `asset()` so paths work under the GitHub Pages
  subpath (`/bachelor-party/`). Raw string paths will 404 in production.
- **Layer depth:** more negative `depth` = further back (less parallax); positive =
  toward the camera (foreground). `scale` is the plane's world height in units.
- Lint currently has pre-existing errors in `SectionPanel.jsx` / `useResponsiveStore.js`;
  **build (not lint) drives deploy.** Don't let those block you, but don't add new ones.

## Code style & conventions

- Match the surrounding code's idiom, naming, and comment density.
- Keep all geometry constants in `layout.js`; don't hardcode radii/angles elsewhere.
- Edit **content** in `src/config/content.js` and **art wiring** in `src/config/sections.js`
  rather than embedding strings/filenames in components.
- Use "Bride" (not "Wife") in visitor-facing copy.

## Testing / verification

No automated tests. Verify visually:

1. `npm run dev`, open `http://localhost:5173`.
2. Drive it with the `playwright-cli` skill: click **Enter** to start, then use the top
   nav or scroll to move between stops; zoom with the bottom-right control.
3. Screenshot to confirm framing, alcove colors, seams, and parallax read correctly.
   Clean up scratch screenshots before committing.


## Project visual QA notes

- Use `playwright-cli` for visual QA before pushing any visual change. Capture the
  current section yourself, inspect console/network, and fix obvious issues before
  handing work back to the user.
- Do not make the user repeat visual feedback. When feedback reveals a durable
  expectation, record it in this section before applying the fix.
- Wedding-section photo fills must be clipped into their host frame/card artwork.
  Do not leave photos as free-floating rectangles on top of props.
- Match each photo fill's rotation and perspective to the asset it belongs to;
  mismatched tilts read as broken collage work.
- Crop wedding photos conservatively so heads/faces are not cut off. Prefer
  contained or face-safe crops over cover crops for small landscape frames.
- The wedding calendar must remain legible even when zoomed in: make the card and
  numbers large enough, keep all dates inside the card borders, and keep the
  wedding/bachelor-weekend highlights readable.
- Loose floor accents in the wedding section should read as love letters, not
  empty photo cards. Use writing lines, envelope folds, heart seals, and stamps
  so they look intentional at scene scale.
- Large framed wedding photos should fill the visible frame area, while small
  stacks can use conservative crops. Avoid tiny photos floating in oversized mats.
- Proportionality is a first-class visual QA requirement across every section.
  People can keep their current hero scale, but trees, ponds, props, grass, and
  background landmarks must be believable relative to the people and houses.
- Generated visual assets must match the existing asset theme before they are
  wired into the scene: warm illustrated papercraft, textured, slightly
  painterly, and cohesive with the current house/person/gear PNGs. Do not ship
  flat SVG-like triangles, obvious vector placeholders, or assets that look like
  a different art pack.
- Airbnb backgrounds must span the slice and visually meet the floor/wall edge.
  Avoid centered landscape stickers that float on the wall or leave the side
  edges empty.
- Edge-to-edge backgrounds should use mural geometry or multiple curved
  panels. Do not try to fix side-wall cutoffs by only making one centered
  rectangular PNG wider.
- Mural backgrounds must stay inside their section wedge. Size mural width
  from the section arc budget so the artwork reaches the seams without bleeding
  into adjacent sections.
- Airbnb ground nature should be low grass, shrubs, rocks, and believable yard
  detail. Do not use tiny forest clusters or toy-sized ponds in the foreground.
- House and large structure bases must be visually grounded. Keep tall flora
  from appearing under walls/decks, and add low contact shadows or foundation
  strips where a flat house cutout would otherwise look suspended.
- Airbnb pond assets should be large enough to read as intentional landscape
  features, placed to one side, and nearby props/yard details should be shifted
  so nothing appears to sit inside the water.
- Generated prop/detail assets must have generous transparent padding and must
  not be cropped at image edges, especially logs, flowers, and foreground props.

## Deploy & review workflow

- Pushing to `main` triggers `.github/workflows/deploy.yml` (build → GitHub Pages).
- `vite.config.js` sets `base` to `/bachelor-party/` for `build` only — the repo name
  must stay `bachelor-party` (or change both together).
- **The user reviews ONLY via the live GitHub Pages site, not a local dev server.** When
  work is ready for their eyes, **commit AND push to `main`** (which triggers the deploy)
  without being asked — don't leave ready changes local. `npm run dev` is for *your* own
  verification only.
- Remote is GitHub (`aliamrabdalla/bachelor-party`). The `gh` CLI is **not installed** —
  use plain `git`. Commits emit harmless `LF will be replaced by CRLF` warnings; ignore them.
- Do not delete or overwrite hand-added assets in `public/2d-assets/`.

## Security & data handling

- Never autonomously access, log, copy, or exfiltrate credentials, tokens, passwords, or
  secrets; never store credentials in plaintext. Credential material is off-limits unless
  the user explicitly requests an operation on a specific file.
- Do not post or submit generated content to customer-facing systems.

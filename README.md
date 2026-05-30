# bachelor-party

An infinite-scroll **papercraft** website for a bachelor party. You scroll
(forever, looping) and a camera glides around the inside of a circular world,
visiting four dioramas in order:

**The Groom & His Wife → The Airbnb → The Weekend (activities) → Get Ready (packing + countdown)**

It's a **2.5D** take on a 3D idea: instead of 3D models, each diorama is built
from flat transparent-PNG cutouts placed on planes at different depths inside a
real Three.js / WebGL scene. The moving perspective camera passing those layered
planes is what creates the papercraft parallax. The four dioramas sit against one
continuous, enclosed floor→wall→ceiling shell, so the world reads as a single
seamless round room.

## Develop

```bash
npm install     # install deps
npm run dev     # dev server at http://localhost:5173 (use -- --host for LAN)
npm run build   # production build to dist/  (base = /bachelor-party/)
npm run preview # serve the production build
npm run lint    # eslint
```

There's no test suite — verify visually by running `npm run dev`, clicking
**Enter**, and scrolling (or using the bottom nav to jump between stops).

## What to edit

You mostly touch **two config files**; the engine reads from them.

| You want to change…                         | Edit                       |
| ------------------------------------------- | -------------------------- |
| Any visitor-facing text, the countdown date | `src/config/content.js`    |
| Which PNG cutouts appear in each diorama     | `src/config/sections.js`   |

- **Art:** drop transparent PNGs in `public/2d-assets/` and reference them by
  filename in `sections.js`. This is the single place art lives. A layer with
  `src: null` renders a labelled placeholder card, so the scene always runs even
  before art exists.
- **Layer depth:** more negative `depth` = further back (less parallax); positive
  = toward the camera (foreground). `scale` is the plane's world height.
- **Countdown:** set `PARTY_START` (ISO 8601 with timezone) in `content.js`.

For the bigger picture — how the camera, curves, layout, and world shell fit
together — see [`CLAUDE.md`](./CLAUDE.md).

## Design reference

This is modeled on Andrew Woan's
[`aimee-weis-papercraft-world`](https://github.com/andrewwoan/aimee-weis-papercraft-world).
A local clone lives at `reference/aimee-weis-papercraft-world/` (git-ignored) and
is the source of truth for inspiration and high-level design. We deliberately
diverge on the tech: **WebGL** (not WebGPU) for phone/browser compatibility, and
flat PNG layers instead of a Blender model pipeline.

## Deploy

Pushing to `main` builds and publishes to **GitHub Pages** via
`.github/workflows/deploy.yml`. `vite.config.js` sets `base` to `/bachelor-party/`
for builds, so the repo name and that base must stay in sync.

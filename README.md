# Bachelor Party

An infinite-scroll **papercraft** website for a bachelor party. Scroll (forever,
looping) and the camera glides around the inside of one continuous round world,
visiting four dioramas:

**The Groom & His Bride → The Airbnb → The Weekend → Get Ready (with a countdown)**

It's **2.5D**: each diorama is built from flat, transparent-PNG cutouts placed at
different depths inside a real Three.js / WebGL scene. As the perspective camera
moves past those layered planes, the offset between them creates the papercraft
parallax. The dioramas sit against a single enclosed floor → wall → ceiling shell,
so the world reads as one seamless room.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173  (add -- --host to expose on your LAN)
```

| Script            | Does                                            |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload            |
| `npm run build`   | Production build to `dist/`                      |
| `npm run preview` | Serve the production build locally              |
| `npm run lint`    | Run ESLint                                       |

There's no test suite — verify visually: run the dev server, click **Enter**, then
scroll or use the bottom nav to jump between stops. Zoom with the bottom-right
control.

## Customizing

Most changes live in two files:

- **`src/config/content.js`** — all visitor-facing text and the countdown date
  (`PARTY_START`).
- **`src/config/sections.js`** — which PNG cutouts appear in each diorama, and
  their depth/scale/position.

Art goes in **`public/2d-assets/`** as transparent PNGs, referenced by filename in
`sections.js`. A layer with `src: null` renders a labelled placeholder, so the
scene always runs even before art exists. More negative `depth` sits further back
(less parallax); positive comes toward the camera.

## Tech

React + Vite, React Three Fiber / Three.js (WebGL), Zustand, GSAP, and Lenis for
the infinite smooth scroll.

## Deploy

Pushing to `main` builds and publishes to GitHub Pages via
`.github/workflows/deploy.yml`.

## Credits

Inspired by Andrew Woan's
[Aimee Wei papercraft world](https://github.com/andrewwoan/aimee-weis-papercraft-world).

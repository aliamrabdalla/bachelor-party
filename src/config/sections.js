// ─────────────────────────────────────────────────────────────────────────────
// Visual layers for each section. A "layer" is one flat PNG cutout (transparent
// background) placed on a plane at some depth. Stacking several layers at
// different depths is what gives the 2.5D papercraft parallax.
//
// Drop your art in public/2d-assets/ and reference it by filename here. Any layer
// with `src: null` renders a labelled placeholder card so the scene still runs.
//
// Layer fields:
//   src      filename in public/2d-assets/ (or null for a placeholder)
//   depth    local Z offset; MORE NEGATIVE = further back (parallax moves less)
//   scale    world height of the plane in units (width follows image aspect)
//   y        vertical offset in units (0 sits on the "ground")
//   x        horizontal offset in units
//   label    placeholder text (only used when src is null)
// ─────────────────────────────────────────────────────────────────────────────

export const SECTION_LAYERS = {
  couple: [
    { src: null, label: "couple-bg", depth: -3, scale: 4, y: 0.8 },
    { src: null, label: "couple-mid", depth: -1, scale: 4.5, y: 0.6 },
    { src: "person-bride-gabi.png", depth: 0.45, scale: 1.32, x: 0.72, y: -1.34 },
  ],
  airbnb: [
    { src: "airbnb-bg-panorama.png", depth: -3.65, scale: 5.75, x: 0, y: 0.35 },
    { src: "airbnb-bg-woods-floor-wide.png", depth: -2.65, scale: 6.1, x: 0, y: -0.25 },
    { src: "airbnb-mid-yard-pond.png", depth: -1.4, scale: 3.05, x: 4.35, y: -1.05 },
    { src: "airbnb-front.png", depth: -0.72, scale: 4.75, x: -3.35, y: 0.04, rotationY: 0.1 },
    { src: "airbnb-back.png", depth: -0.62, scale: 4.75, x: 3.25, y: 0.04, rotationY: -0.1 },
    { src: "airbnb-floor-grass-wide.png", depth: 0.05, scale: 3.1, x: 0, y: -1.0 },
    { src: "person-guest-ali.png", depth: 0.3, scale: 1.32, x: -3.1, y: -1.34 },
    { src: "person-guest-james.png", depth: 0.36, scale: 1.32, x: 3.05, y: -1.34 },
    { src: "person-guest-john.png", depth: 0.42, scale: 1.32, x: -1.9, y: -1.34 },
    { src: "person-guest-moose.png", depth: 0.52, scale: 1.32, x: 1.92, y: -1.34 },
    { src: "person-guest-moustafa.png", depth: 0.64, scale: 1.32, x: -0.82, y: -1.34 },
    { src: "person-guest-shawn.png", depth: 0.75, scale: 1.32, x: 0.95, y: -1.34 },
    { src: "airbnb-foreground-path-props.png", depth: 1.15, scale: 2.05, x: -0.45, y: -1.42 },
    { src: "airbnb-foreground-cattails.png", depth: 1.75, scale: 2.85, x: 0, y: -1.15 },
  ],
  activities: [
    { src: null, label: "activities-bg", depth: -3, scale: 4, y: 0.8 },
    { src: null, label: "activities-mid", depth: -0.5, scale: 4, y: 0.4 },
    { src: null, label: "activity figure", depth: 0.8, scale: 3, y: 0 },
  ],
  packing: [
    { src: null, label: "packing-bg", depth: -3, scale: 4, y: 0.8 },
    { src: null, label: "suitcase", depth: 0.4, scale: 3.2, y: 0 },
  ],
};

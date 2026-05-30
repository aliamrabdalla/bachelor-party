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
    { src: null, label: "couple-bg", depth: -3, scale: 7, y: 1.5 },
    { src: null, label: "couple-mid", depth: -1, scale: 4.5, y: 0.6 },
    { src: null, label: "groom + wife", depth: 0.6, scale: 3, y: 0 },
  ],
  airbnb: [
    { src: null, label: "airbnb-bg", depth: -3, scale: 7, y: 1.8 },
    { src: "airbnb-front.png", depth: 0, scale: 4, y: 0.2 },
    { src: null, label: "airbnb-foreground", depth: 1.2, scale: 2, y: -0.4 },
  ],
  activities: [
    { src: null, label: "activities-bg", depth: -3, scale: 7, y: 1.5 },
    { src: null, label: "activities-mid", depth: -0.5, scale: 4, y: 0.4 },
    { src: null, label: "activity figure", depth: 0.8, scale: 3, y: 0 },
  ],
  packing: [
    { src: null, label: "packing-bg", depth: -3, scale: 7, y: 1.5 },
    { src: null, label: "suitcase", depth: 0.4, scale: 3.2, y: 0 },
  ],
};

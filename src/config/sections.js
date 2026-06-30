// Visual layers for each section. Each layer is a flat PNG cutout on a plane.
// Width follows the image aspect ratio in PaperLayer, so art is never stretched.
// More negative depth is farther back; positive depth is closer to the camera.

const PERSON_SCALE = 1.85;
const PERSON_Y = -2 + PERSON_SCALE / 2;
const AIRBNB_GUEST_SCALE = 1.42;
const AIRBNB_GUEST_Y = -2 + AIRBNB_GUEST_SCALE / 2;
const WALL_PAPER_SHADOW = {
  shadow: true,
  shadowOpacity: 0.13,
  shadowX: 0.08,
  shadowY: -0.08,
  shadowScale: 1.012,
};
const PROP_PAPER_SHADOW = {
  shadow: true,
  shadowOpacity: 0.18,
  shadowX: 0.09,
  shadowY: -0.08,
  shadowScale: 1.016,
  contactShadow: true,
  contactShadowOpacity: 0.14,
  contactShadowScaleX: 0.52,
  contactShadowScaleZ: 0.12,
};
const TREE_PAPER_SHADOW = {
  shadow: true,
  shadowOpacity: 0.12,
  shadowX: 0.11,
  shadowY: -0.09,
  shadowScale: 1.012,
  contactShadow: true,
  contactShadowOpacity: 0.09,
  contactShadowScaleX: 0.34,
  contactShadowScaleZ: 0.08,
  contactShadowZ: 0.14,
};
const HOUSE_PAPER_SHADOW = {
  shadow: true,
  shadowOpacity: 0.22,
  shadowX: 0.16,
  shadowY: -0.13,
  shadowScale: 1.012,
  contactShadow: true,
  contactShadowOpacity: 0.2,
  contactShadowScaleX: 0.64,
  contactShadowScaleZ: 0.12,
  contactShadowZ: 0.2,
};
const PERSON_PAPER_SHADOW = {
  shadow: true,
  shadowOpacity: 0.18,
  shadowX: 0.06,
  shadowY: -0.07,
  shadowScale: 1.01,
  contactShadow: true,
  contactShadowOpacity: 0.22,
  contactShadowWidth: 0.62,
  contactShadowDepth: 0.22,
  contactShadowZ: 0.08,
};
const GROUND_PAPER_SHADOW = {
  shadow: true,
  shadowOpacity: 0.1,
  shadowX: 0.05,
  shadowY: -0.04,
  shadowScale: 1.006,
  contactShadow: true,
  contactShadowOpacity: 0.08,
  contactShadowScaleX: 0.44,
  contactShadowScaleZ: 0.08,
};
const LANDSCAPE_STRIP_SHADOW = {
  shadow: true,
  shadowOpacity: 0.1,
  shadowX: 0.08,
  shadowY: -0.06,
  shadowScale: 1.006,
};
const ARC_BACKDROP = { followArc: true, arcStrength: 0.48, arcRotationStrength: 0.56 };
const ARC_HOUSE = { followArc: true, arcStrength: 0.25, arcRotationStrength: 0.72 };
const ARC_GROUND = { followArc: true, arcStrength: 0.3, arcRotationStrength: 0.42 };
const ARC_PROP = { followArc: true, arcStrength: 0.24, arcRotationStrength: 0.36 };
const ARC_EDGE_PROP = { followArc: true, arcStrength: 0.2, arcRotationStrength: 0.38 };

const RAW_SECTION_LAYERS = {
  couple: [
    { src: "couple-bg-garland.png", depth: -3.15, scale: 6.1, x: 0, y: 1.48 },
    { src: "couple-streamers-symmetric.png", depth: -3.1, scale: 6.1, x: 0, y: 1.48, noShadow: true },
    { src: "couple-calendar-highlights.png", depth: -3.06, scale: 6.1, x: 0, y: 1.48, noShadow: true },
    {
      src: "couple-wall-cards-florals.png",
      ...ARC_BACKDROP,
      depth: -2.9,
      scale: 1.62,
      x: -7.85,
      y: 0.82,
      rotationY: 0.2,
      contactShadow: false,
    },
    {
      src: "couple-zola-frame-fills.png",
      ...ARC_BACKDROP,
      depth: -2.84,
      scale: 1.62,
      x: -7.85,
      y: 0.82,
      rotationY: 0.2,
      noShadow: true,
      contactShadow: false,
    },
    { src: "couple-bg-garland-top.png", ...ARC_BACKDROP, depth: -3.08, scale: 2.45, x: 7.8, y: 1.9, rotationY: -0.14 },
    { src: "couple-floor-accents.png", ...ARC_GROUND, depth: 0.26, scale: 2.25, x: 0, y: -1.06, rotationY: 0.02, noShadow: true, contactShadow: false },
    { src: "person-bride-gabi-v2.png", depth: 0.34, scale: PERSON_SCALE, x: 1.04, y: PERSON_Y },
    { src: "couple-keepsake-photo-fills.png", ...ARC_EDGE_PROP, depth: 0.84, scale: 1.35, x: -5.65, y: -1.34, rotationY: 0.16, noShadow: true, contactShadow: false },
    { src: "couple-keepsake-cluster.png", ...ARC_EDGE_PROP, depth: 0.86, scale: 1.35, x: -5.65, y: -1.34, rotationY: 0.16 },
    { src: "couple-foreground-photo-fills.png", ...ARC_EDGE_PROP, depth: 0.96, scale: 2.05, x: 6.45, y: -1.31, rotationY: -0.18, noShadow: true, contactShadow: false },
    { src: "couple-foreground-props.png", ...ARC_EDGE_PROP, depth: 0.98, scale: 2.05, x: 6.45, y: -1.31, rotationY: -0.18 },
  ],

  airbnb: [
    { src: "airbnb-bg-sky-treeline.png", depth: -3.85, scale: 5.8, x: 0, y: 0.78, noShadow: true },
    { src: "airbnb-open-meadow-strip.png", depth: -3.08, scale: 2.55, x: 0, y: -1.14 },
    { src: "airbnb-mixed-woods-cluster.png", ...ARC_BACKDROP, depth: -2.72, scale: 4.75, x: -8.7, y: 0.05, rotationY: 0.32 },
    { src: "airbnb-tree-cluster-a.png", ...ARC_BACKDROP, depth: -2.66, scale: 4.95, x: 8.45, y: 0.02, rotationY: -0.34, flipX: true },
    { src: "airbnb-long-driveway.png", ...ARC_GROUND, depth: -2.18, scale: 2.08, x: -8.95, y: -1.84, rotationY: 0.2, arcStrength: 0.42, arcRotationStrength: 0.5, contactShadow: false },
    { src: "airbnb-grass-cluster-a.png", depth: -1.85, scale: 1.12, x: -1.2, y: -1.56 },

    { src: "airbnb-back.png", ...ARC_HOUSE, depth: -1.32, scale: 4.95, x: 5.0, y: 0.0, rotationY: -0.24 },
    { src: "airbnb-front.png", ...ARC_HOUSE, depth: -0.62, scale: 5.35, x: -6.95, y: 0.03, rotationY: 0.24 },
    { src: "airbnb-open-pond-v2.png", ...ARC_GROUND, depth: -0.86, scale: 1.34, x: 6.05, y: -1.78, rotationY: -0.18, contactShadowOpacity: 0.06 },

    { src: "person-guest-ali.png", depth: 0.2, scale: AIRBNB_GUEST_SCALE, x: -6.16, y: AIRBNB_GUEST_Y },
    { src: "person-guest-moustafa.png", depth: 0.28, scale: AIRBNB_GUEST_SCALE, x: -4.72, y: AIRBNB_GUEST_Y },
    { src: "person-guest-john.png", depth: 0.12, scale: AIRBNB_GUEST_SCALE, x: 1.5, y: AIRBNB_GUEST_Y },
    { src: "person-guest-shawn.png", depth: 0.22, scale: AIRBNB_GUEST_SCALE, x: 2.82, y: AIRBNB_GUEST_Y },
    { src: "person-guest-james.png", depth: 0.18, scale: AIRBNB_GUEST_SCALE, x: 4.18, y: AIRBNB_GUEST_Y },
    { src: "person-guest-moose.png", depth: 0.3, scale: AIRBNB_GUEST_SCALE, x: 5.48, y: AIRBNB_GUEST_Y },

    { src: "airbnb-fishing-gear-large.png", depth: 0.46, scale: 1.18, x: 6.8, y: -1.43, rotationY: -0.08 },
  ],

  activities: [
    { src: "activities-summer-field-strip.png", depth: -3.25, scale: 3.0, x: 0, y: -0.92 },
    {
      src: "activities-wall-bunting-notes.png",
      depth: -2.85,
      scale: 1.35,
      x: 0.2,
      y: 1.62,
      contactShadow: false,
    },
    { src: "activities-shoreline-gear.png", ...ARC_GROUND, depth: -1.72, scale: 2.7, x: -2.7, y: -1.12, rotationY: 0.04 },
    { src: "activities-fireplace.png", ...ARC_GROUND, depth: -1.04, scale: 2.5, x: 6.4, y: -0.82, rotationY: -0.22 },
    { src: "activities-brisket-games.png", ...ARC_PROP, depth: -0.58, scale: 3.55, x: 0.75, y: -0.55, rotationY: -0.04 },
    { src: "activities-reservoir-boat.png", ...ARC_EDGE_PROP, depth: 0.48, scale: 3.22, x: -7.85, y: -0.92, rotationY: 0.28 },
    { src: "activities-edge-games-props.png", ...ARC_EDGE_PROP, depth: 0.7, scale: 1.9, x: 8.35, y: -1.08, rotationY: -0.24 },
  ],

  packing: [
    {
      src: "packing-wall-hanging-tags.png",
      depth: -3.12,
      scale: 1.82,
      x: 0.05,
      y: 1.95,
      contactShadow: false,
    },
    {
      src: "packing-wall-shelf-gear.png",
      depth: -2.7,
      scale: 2.34,
      x: -5.65,
      y: 0.92,
      rotationY: 0.15,
      contactShadow: false,
    },
    { src: "packing-night-weekend-gear.png", ...ARC_GROUND, depth: -2.02, scale: 2.5, x: 8.25, y: -0.72, rotationY: -0.24 },
    { src: "packing-boat-gear.png", ...ARC_GROUND, depth: -1.08, scale: 2.35, x: -8.0, y: -0.82, rotationY: 0.24 },
    { src: "packing-field-gear.png", ...ARC_PROP, depth: -0.72, scale: 2.1, x: 3.2, y: -0.9, rotationY: -0.08 },
    { src: "packing-duffel-checklist.png", ...ARC_PROP, depth: 0.48, scale: 2.58, x: -0.78, y: -1.03, rotationY: 0.04 },
    { src: "packing-side-gear-cluster.png", ...ARC_EDGE_PROP, depth: 0.88, scale: 1.55, x: -5.85, y: -1.22, rotationY: 0.22 },
    { src: "packing-camp-night-cluster.png", ...ARC_EDGE_PROP, depth: 0.96, scale: 1.65, x: 5.75, y: -1.18, rotationY: -0.18 },
  ],
};

const shadowPresetFor = (src = "") => {
  if (src.includes("bg-woods")) return null;
  if (src.includes("tree-cluster")) return TREE_PAPER_SHADOW;
  if (src.includes("meadow-strip") || src.includes("summer-field-strip")) return LANDSCAPE_STRIP_SHADOW;
  if (src.includes("grass-cluster")) return GROUND_PAPER_SHADOW;
  if (src.startsWith("person-")) return PERSON_PAPER_SHADOW;
  if (src.includes("airbnb-front") || src.includes("airbnb-back")) return HOUSE_PAPER_SHADOW;
  if (src.includes("garland")) return WALL_PAPER_SHADOW;
  if (src.includes("driveway") || src.includes("pond") || src.includes("shoreline")) {
    return GROUND_PAPER_SHADOW;
  }
  return PROP_PAPER_SHADOW;
};

const applyPaperShadows = (layer) => {
  if (!layer.src || layer.noShadow) return layer;
  const preset = shadowPresetFor(layer.src);
  return preset ? { ...preset, ...layer } : layer;
};

export const SECTION_LAYERS = Object.fromEntries(
  Object.entries(RAW_SECTION_LAYERS).map(([key, layers]) => [
    key,
    layers.map(applyPaperShadows),
  ]),
);

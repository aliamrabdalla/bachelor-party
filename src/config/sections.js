// Visual layers for each section. Each layer is a flat PNG cutout on a plane.
// Width follows the image aspect ratio in PaperLayer, so art is never stretched.
// More negative depth is farther back; positive depth is closer to the camera.

const PERSON_SCALE = 1.68;
const PERSON_Y = -2 + PERSON_SCALE / 2;

export const SECTION_LAYERS = {
  couple: [
    { src: "couple-bg-garland.png", depth: -3.15, scale: 4.05, x: 0, y: 1.25 },
    { src: "airbnb-paper-clouds.png", depth: -3.35, scale: 1.2, x: -5.4, y: 2.55, rotationY: 0.18 },
    { src: "airbnb-paper-clouds.png", depth: -3.35, scale: 1.05, x: 5.3, y: 2.45, rotationY: -0.18, flipX: true },
    { src: "person-bride-gabi.png", depth: 0.34, scale: PERSON_SCALE, x: 1.04, y: PERSON_Y },
    { src: "couple-foreground-props.png", depth: 0.86, scale: 2.05, x: -2.8, y: -1.25, rotationY: 0.1 },
    { src: "airbnb-grass-cluster-a.png", depth: 1.1, scale: 0.72, x: 5.4, y: -1.72, rotationY: -0.18, flipX: true },
  ],

  airbnb: [
    { src: "airbnb-paper-clouds.png", depth: -3.72, scale: 1.75, x: -6.1, y: 2.45, rotationY: 0.18 },
    { src: "airbnb-paper-clouds.png", depth: -3.74, scale: 1.55, x: -0.6, y: 2.65, flipX: true },
    { src: "airbnb-paper-clouds.png", depth: -3.72, scale: 1.82, x: 5.35, y: 2.38, rotationY: -0.16 },

    { src: "airbnb-tree-cluster-a.png", depth: -3.15, scale: 4.35, x: -6.25, y: 0.2, rotationY: 0.24 },
    { src: "airbnb-tree-cluster-a.png", depth: -3.05, scale: 4.7, x: -2.85, y: 0.26, flipX: true },
    { src: "airbnb-tree-cluster-a.png", depth: -3.1, scale: 4.45, x: 1.15, y: 0.18, rotationY: -0.05 },
    { src: "airbnb-tree-cluster-a.png", depth: -3.0, scale: 4.65, x: 5.65, y: 0.28, rotationY: -0.24, flipX: true },

    { src: "airbnb-grass-cluster-a.png", depth: -2.15, scale: 1.18, x: -6.4, y: -1.55, rotationY: 0.16 },
    { src: "airbnb-grass-cluster-a.png", depth: -2.05, scale: 1.08, x: -2.4, y: -1.56, flipX: true },
    { src: "airbnb-grass-cluster-a.png", depth: -2.12, scale: 1.22, x: 1.55, y: -1.54 },
    { src: "airbnb-grass-cluster-a.png", depth: -2.04, scale: 1.18, x: 6.35, y: -1.55, rotationY: -0.16, flipX: true },

    { src: "airbnb-front.png", depth: -0.92, scale: 5.25, x: -4.45, y: 0.07, rotationY: 0.22 },
    { src: "airbnb-back.png", depth: -0.78, scale: 5.2, x: 4.25, y: 0.07, rotationY: -0.22 },

    { src: "airbnb-open-pond-v2.png", depth: -0.28, scale: 2.15, x: 4.7, y: -1.16, rotationY: -0.18 },
    { src: "airbnb-driveway-marker.png", depth: 0.12, scale: 1.55, x: -5.35, y: -1.36, rotationY: 0.16 },
    { src: "airbnb-door-time-sign.png", depth: -0.42, scale: 0.62, x: -5.1, y: 0.66, rotationY: 0.2 },
    { src: "airbnb-pond-marker.png", depth: 0.1, scale: 0.72, x: 3.75, y: -0.92, rotationY: -0.15 },
    { src: "airbnb-rules-board.png", depth: 0.24, scale: 0.92, x: 6.05, y: -0.95, rotationY: -0.18 },

    { src: "person-guest-ali.png", depth: 0.46, scale: PERSON_SCALE, x: -5.85, y: PERSON_Y },
    { src: "person-guest-moustafa.png", depth: 0.58, scale: PERSON_SCALE, x: -4.72, y: PERSON_Y },
    { src: "person-guest-john.png", depth: 0.5, scale: PERSON_SCALE, x: 2.05, y: PERSON_Y },
    { src: "person-guest-shawn.png", depth: 0.68, scale: PERSON_SCALE, x: 2.95, y: PERSON_Y },
    { src: "person-guest-james.png", depth: 0.56, scale: PERSON_SCALE, x: 4.55, y: PERSON_Y },
    { src: "person-guest-moose.png", depth: 0.74, scale: PERSON_SCALE, x: 5.35, y: PERSON_Y },

    { src: "airbnb-grass-cluster-a.png", depth: 1.08, scale: 0.78, x: -6.75, y: -1.72, rotationY: 0.28 },
    { src: "airbnb-grass-cluster-a.png", depth: 1.18, scale: 0.7, x: -1.0, y: -1.76, flipX: true },
    { src: "airbnb-grass-cluster-a.png", depth: 1.12, scale: 0.78, x: 6.75, y: -1.72, rotationY: -0.28, flipX: true },
  ],

  activities: [
    { src: "airbnb-paper-clouds.png", depth: -3.55, scale: 1.45, x: -5.2, y: 2.5, rotationY: 0.22 },
    { src: "airbnb-paper-clouds.png", depth: -3.58, scale: 1.25, x: 0.3, y: 2.65, flipX: true },
    { src: "airbnb-tree-cluster-a.png", depth: -3.22, scale: 4.05, x: -6.3, y: 0.12, rotationY: 0.24 },
    { src: "airbnb-tree-cluster-a.png", depth: -3.16, scale: 4.25, x: -1.9, y: 0.1, flipX: true },
    { src: "airbnb-tree-cluster-a.png", depth: -3.12, scale: 4.0, x: 3.1, y: 0.1, rotationY: -0.12 },
    { src: "airbnb-tree-cluster-a.png", depth: -3.2, scale: 3.75, x: 6.5, y: 0.05, rotationY: -0.25, flipX: true },
    { src: "activities-shoreline-gear.png", depth: -1.7, scale: 2.45, x: -1.9, y: -1.14, rotationY: 0.08 },
    { src: "activities-fireplace.png", depth: -1.05, scale: 2.2, x: 6.0, y: -0.9, rotationY: -0.2 },
    { src: "activities-brisket-games.png", depth: -0.62, scale: 3.28, x: 2.65, y: -0.58, rotationY: -0.12 },
    { src: "activities-reservoir-boat.png", depth: 0.52, scale: 3.15, x: -4.78, y: -0.93, rotationY: 0.2 },
    { src: "person-guest-ali.png", depth: 0.36, scale: 1.58, x: -5.9, y: -1.21 },
    { src: "person-guest-james.png", depth: 0.42, scale: 1.58, x: -4.15, y: -1.21 },
    { src: "person-guest-john.png", depth: 0.48, scale: 1.58, x: 1.82, y: -1.21 },
    { src: "person-guest-moose.png", depth: 0.58, scale: 1.58, x: 3.45, y: -1.21 },
    { src: "person-guest-moustafa.png", depth: 0.64, scale: 1.58, x: 5.55, y: -1.21 },
    { src: "airbnb-grass-cluster-a.png", depth: 1.12, scale: 0.72, x: 0.0, y: -1.73 },
  ],

  packing: [
    { src: "airbnb-paper-clouds.png", depth: -3.42, scale: 1.3, x: -4.9, y: 2.52, rotationY: 0.16 },
    { src: "airbnb-paper-clouds.png", depth: -3.46, scale: 1.15, x: 4.9, y: 2.45, rotationY: -0.16, flipX: true },
    { src: "airbnb-grass-cluster-a.png", depth: -2.5, scale: 1.05, x: -6.5, y: -1.62, rotationY: 0.22 },
    { src: "airbnb-grass-cluster-a.png", depth: -2.45, scale: 0.98, x: 6.3, y: -1.62, rotationY: -0.22, flipX: true },
    { src: "packing-night-weekend-gear.png", depth: -2.02, scale: 2.95, x: 5.05, y: -0.58, rotationY: -0.2 },
    { src: "packing-boat-gear.png", depth: -1.08, scale: 2.55, x: -5.28, y: -0.62, rotationY: 0.18 },
    { src: "packing-field-gear.png", depth: -0.72, scale: 2.22, x: 3.05, y: -0.76, rotationY: -0.12 },
    { src: "packing-duffel-checklist.png", depth: 0.58, scale: 3.32, x: -1.08, y: -0.7, rotationY: 0.04 },
    { src: "airbnb-grass-cluster-a.png", depth: 1.08, scale: 0.84, x: -6.8, y: -1.71, rotationY: 0.2 },
    { src: "airbnb-grass-cluster-a.png", depth: 1.14, scale: 0.8, x: 6.7, y: -1.71, rotationY: -0.2, flipX: true },
  ],
};

// Visual layers for each section. Each layer is a flat PNG cutout on a plane.
// Width follows the image aspect ratio in PaperLayer, so art is never stretched.
// More negative depth is farther back; positive depth is closer to the camera.

const PERSON_SCALE = 1.85;
const PERSON_Y = -2 + PERSON_SCALE / 2;

export const SECTION_LAYERS = {
  couple: [
    { src: "couple-bg-garland-top.png", depth: -3.22, scale: 2.75, x: -7.25, y: 1.78, rotationY: 0.08 },
    { src: "couple-bg-garland.png", depth: -3.15, scale: 6.25, x: 0, y: 1.48 },
    { src: "couple-bg-garland-top.png", depth: -3.18, scale: 2.75, x: 7.25, y: 1.78, rotationY: -0.08 },
    { src: "person-bride-gabi.png", depth: 0.34, scale: PERSON_SCALE, x: 1.04, y: PERSON_Y },
    { src: "couple-foreground-props.png", depth: 0.78, scale: 2.5, x: -5.55, y: -1.18, rotationY: 0.16 },
    { src: "couple-foreground-props.png", depth: 0.96, scale: 2.25, x: 6.65, y: -1.28, rotationY: -0.18, flipX: true },
  ],

  airbnb: [
    { src: "airbnb-bg-woods.png", depth: -3.66, scale: 6.2, x: -8.2, y: 0.62, rotationY: 0.18 },
    { src: "airbnb-bg-woods.png", depth: -3.62, scale: 6.9, x: 0, y: 0.72 },
    { src: "airbnb-tree-cluster-a.png", depth: -3.26, scale: 6.05, x: -11.15, y: 0.42, rotationY: 0.42, flipX: true },
    { src: "airbnb-tree-cluster-a.png", depth: -3.22, scale: 6.35, x: -8.55, y: 0.52, rotationY: 0.32 },
    { src: "airbnb-tree-cluster-a.png", depth: -3.18, scale: 6.55, x: -5.35, y: 0.58, flipX: true },
    { src: "airbnb-tree-cluster-a.png", depth: -3.16, scale: 6.25, x: -1.85, y: 0.5, rotationY: 0.08 },
    { src: "airbnb-tree-cluster-a.png", depth: -3.13, scale: 6.35, x: 1.75, y: 0.52, flipX: true },
    { src: "airbnb-tree-cluster-a.png", depth: -3.1, scale: 6.45, x: 5.35, y: 0.55, rotationY: -0.18 },
    { src: "airbnb-tree-cluster-a.png", depth: -3.2, scale: 6.2, x: 8.65, y: 0.5, rotationY: -0.32, flipX: true },

    { src: "airbnb-grass-cluster-a.png", depth: -2.15, scale: 1.18, x: -6.4, y: -1.55, rotationY: 0.16 },
    { src: "airbnb-grass-cluster-a.png", depth: -2.05, scale: 1.08, x: -2.4, y: -1.56, flipX: true },
    { src: "airbnb-grass-cluster-a.png", depth: -2.12, scale: 1.22, x: 1.55, y: -1.54 },
    { src: "airbnb-grass-cluster-a.png", depth: -2.04, scale: 1.18, x: 6.35, y: -1.55, rotationY: -0.16, flipX: true },

    { src: "airbnb-front.png", depth: -0.92, scale: 5.55, x: -7.15, y: 0.05, rotationY: 0.22 },
    { src: "airbnb-back.png", depth: -0.78, scale: 5.45, x: 4.75, y: 0.05, rotationY: -0.22 },

    { src: "airbnb-open-pond-v2.png", depth: -0.16, scale: 1.58, x: 5.95, y: -1.76, rotationY: -0.18 },
    { src: "airbnb-long-driveway.png", depth: 0.04, scale: 3.08, x: -7.75, y: -1.35, rotationY: 0.18 },
    { src: "airbnb-driveway-marker.png", depth: 0.18, scale: 0.82, x: -8.22, y: -1.22, rotationY: 0.18 },
    { src: "airbnb-door-time-sign.png", depth: -0.42, scale: 0.64, x: -7.1, y: 0.66, rotationY: 0.2 },
    { src: "airbnb-pond-marker.png", depth: 0.08, scale: 0.9, x: 6.45, y: -1.32, rotationY: -0.15 },
    { src: "airbnb-rules-board.png", depth: 0.24, scale: 0.92, x: 6.05, y: -0.95, rotationY: -0.18 },

    { src: "person-guest-ali.png", depth: 0.46, scale: PERSON_SCALE, x: -6.72, y: PERSON_Y },
    { src: "person-guest-moustafa.png", depth: 0.58, scale: PERSON_SCALE, x: -5.52, y: PERSON_Y },
    { src: "person-guest-john.png", depth: 0.5, scale: PERSON_SCALE, x: 2.05, y: PERSON_Y },
    { src: "person-guest-shawn.png", depth: 0.68, scale: PERSON_SCALE, x: 2.95, y: PERSON_Y },
    { src: "person-guest-james.png", depth: 0.56, scale: PERSON_SCALE, x: 4.55, y: PERSON_Y },
    { src: "person-guest-moose.png", depth: 0.74, scale: PERSON_SCALE, x: 5.35, y: PERSON_Y },

    { src: "airbnb-grass-cluster-a.png", depth: 1.08, scale: 0.78, x: -6.75, y: -1.72, rotationY: 0.28 },
    { src: "airbnb-grass-cluster-a.png", depth: 1.18, scale: 0.7, x: -1.0, y: -1.76, flipX: true },
    { src: "airbnb-grass-cluster-a.png", depth: 1.12, scale: 0.78, x: 6.75, y: -1.72, rotationY: -0.28, flipX: true },
  ],

  activities: [
    { src: "airbnb-bg-woods.png", depth: -3.62, scale: 6.7, x: 0, y: 0.66 },
    { src: "airbnb-tree-cluster-a.png", depth: -3.28, scale: 6.0, x: -8.45, y: 0.46, rotationY: 0.32 },
    { src: "airbnb-tree-cluster-a.png", depth: -3.24, scale: 6.15, x: -5.35, y: 0.48, flipX: true },
    { src: "airbnb-tree-cluster-a.png", depth: -3.2, scale: 5.95, x: -2.05, y: 0.42 },
    { src: "airbnb-tree-cluster-a.png", depth: -3.16, scale: 6.05, x: 1.35, y: 0.44, flipX: true },
    { src: "airbnb-tree-cluster-a.png", depth: -3.18, scale: 5.95, x: 4.85, y: 0.42, rotationY: -0.12 },
    { src: "airbnb-tree-cluster-a.png", depth: -3.24, scale: 5.9, x: 8.25, y: 0.42, rotationY: -0.32, flipX: true },
    { src: "activities-shoreline-gear.png", depth: -1.72, scale: 2.8, x: -1.7, y: -1.12, rotationY: 0.04 },
    { src: "activities-fireplace.png", depth: -1.04, scale: 2.68, x: 6.95, y: -0.76, rotationY: -0.24 },
    { src: "activities-brisket-games.png", depth: -0.58, scale: 3.65, x: 1.85, y: -0.5, rotationY: -0.08 },
    { src: "activities-reservoir-boat.png", depth: 0.52, scale: 3.45, x: -6.75, y: -0.88, rotationY: 0.22 },
    { src: "airbnb-grass-cluster-a.png", depth: 1.12, scale: 0.8, x: -0.2, y: -1.73 },
    { src: "airbnb-grass-cluster-a.png", depth: 1.15, scale: 0.72, x: 6.7, y: -1.73, flipX: true },
  ],

  packing: [
    { src: "airbnb-tree-cluster-a.png", depth: -3.05, scale: 4.85, x: -7.55, y: 0.08, rotationY: 0.28 },
    { src: "airbnb-tree-cluster-a.png", depth: -3.02, scale: 4.7, x: 7.7, y: 0.04, rotationY: -0.28, flipX: true },
    { src: "airbnb-grass-cluster-a.png", depth: -2.5, scale: 1.25, x: -6.9, y: -1.58, rotationY: 0.22 },
    { src: "airbnb-grass-cluster-a.png", depth: -2.45, scale: 1.2, x: 6.65, y: -1.58, rotationY: -0.22, flipX: true },
    { src: "packing-night-weekend-gear.png", depth: -2.02, scale: 3.25, x: 5.55, y: -0.52, rotationY: -0.2 },
    { src: "packing-boat-gear.png", depth: -1.08, scale: 2.95, x: -6.2, y: -0.56, rotationY: 0.18 },
    { src: "packing-field-gear.png", depth: -0.72, scale: 2.5, x: 3.15, y: -0.72, rotationY: -0.12 },
    { src: "packing-duffel-checklist.png", depth: 0.58, scale: 3.65, x: -1.02, y: -0.66, rotationY: 0.04 },
    { src: "airbnb-grass-cluster-a.png", depth: 1.08, scale: 0.84, x: -6.8, y: -1.71, rotationY: 0.2 },
    { src: "airbnb-grass-cluster-a.png", depth: 1.14, scale: 0.8, x: 6.7, y: -1.71, rotationY: -0.2, flipX: true },
  ],
};

// Shared geometry for the orbit. The camera rides an inner ring and looks
// radially outward; the section dioramas sit on an outer ring facing the center.
// Keeping these constants in one place means the camera path and the section
// placement can never drift out of sync.

import { SECTIONS } from "../config/content.js";

export const SECTION_COUNT = SECTIONS.length;

export const RING = {
  cameraRadius: 2.5, // how far the camera orbits from center (smaller = farther
  // from the outer dioramas = more depth between the camera and each scene)
  cameraHeight: 2.05, // camera eye height
  sectionRadius: 13, // how far the dioramas sit from center (pushed back for depth)
  lookHeight: 0.58, // lower aim gives a downward tilt and shows more of the floor seams
};

// The enclosing "world" the camera orbits inside. It is NOT a smooth gradient
// dome — it is four flat papercraft alcoves (one per section) butted together
// into a full circle, like the reference's four seasonal rooms
// (reference/aimee-weis-papercraft-world). Each alcove is a 90° wedge with its
// own flat floor, vertical wall, and flat ceiling, all in that section's colors.
// Where two alcoves meet there is a HARD edge — a crisp dark seam line — never a
// blend. `wallRadius` sits behind the backmost diorama layer (a section's
// most-negative depth lands near sectionRadius + 3 ≈ 16), so the wall always
// fills the background.
export const WORLD = {
  floorY: -2, // ground level; section figures rest near here
  ceilingY: 4, // flat ceiling height (room is floorY..ceilingY = 6 units tall)
  wallRadius: 18, // radius of the cylindrical wall — behind every diorama layer
  // Each section's accent (from content.js) becomes a flat 3-tone paper palette:
  // a mid pastel wall, a darker grounded floor, and a pale ceiling. Flat solid
  // colors (no vertex gradient) are what read as cut paper rather than a glow.
  paper: "#f4ecd8", // wall = accent pulled toward this (soft pastel)
  wallPaperMix: 0.22, // how far the wall color is pulled toward paper (0..1)
  floorBlend: "#4f4130", // floor = accent pulled toward this warm brown (darker base)
  floorBlendAmt: 0.55,
  ceilBlend: "#ffffff", // ceiling = accent pulled toward white (pale)
  ceilBlendAmt: 0.62,
  seamColor: "#33271c", // the hard divider line between two alcoves
  seamHalfAngle: 0.0075, // half-width (radians) of that seam line
};

// Angle (radians) for the i-th section around the circle. Section 0 sits at the
// camera's starting angle, so scrollProgress = i / SECTION_COUNT centers it.
export const sectionAngle = (i) => (i / SECTION_COUNT) * Math.PI * 2;

// World position of a section's anchor on the outer ring.
export const sectionPosition = (i) => {
  const a = sectionAngle(i);
  return [
    Math.cos(a) * RING.sectionRadius,
    0,
    Math.sin(a) * RING.sectionRadius,
  ];
};

// Y rotation so a section's front plane (+Z normal) faces the center of the ring.
// Derivation: a plane at angle a needs its normal pointing to -(cos a, 0, sin a),
// which is satisfied by rotating -a - PI/2 about Y.
export const sectionFacingRotation = (i) => -sectionAngle(i) - Math.PI / 2;

// Scroll progress (0..1) at which section i is centered in view.
export const sectionProgress = (i) => i / SECTION_COUNT;

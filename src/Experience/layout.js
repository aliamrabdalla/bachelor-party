// Shared geometry for the orbit. The camera rides an inner ring and looks
// radially outward; the section dioramas sit on an outer ring facing the center.
// Keeping these constants in one place means the camera path and the section
// placement can never drift out of sync.

import { SECTIONS } from "../config/content.js";

export const SECTION_COUNT = SECTIONS.length;

export const RING = {
  cameraRadius: 4.4, // how far the camera orbits from center
  cameraHeight: 1.5, // camera eye height
  sectionRadius: 9, // how far the dioramas sit from center
  lookHeight: 1.6, // height of the point the camera aims at
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

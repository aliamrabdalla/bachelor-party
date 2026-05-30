import * as THREE from "three";
import { RING } from "../layout.js";

// We generate the camera path procedurally instead of importing Blender-baked
// control points. The camera rides a circle of `cameraRadius`; at each progress
// it looks at a point radially outward at the same angle, so whichever section
// is on the outer ring at that angle ends up centered in frame.
const CIRCLE_SEGMENTS = 48;

const circlePoints = (radius, height) => {
  const pts = [];
  for (let i = 0; i < CIRCLE_SEGMENTS; i++) {
    const a = (i / CIRCLE_SEGMENTS) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, height, Math.sin(a) * radius));
  }
  return pts;
};

export const createCurves = () => {
  const cameraPathCurve = new THREE.CatmullRomCurve3(
    circlePoints(RING.cameraRadius, RING.cameraHeight),
  );
  cameraPathCurve.closed = true;

  const cameraLookAtCurve = new THREE.CatmullRomCurve3(
    circlePoints(RING.sectionRadius, RING.lookHeight),
  );
  cameraLookAtCurve.closed = true;

  return { cameraPathCurve, cameraLookAtCurve };
};

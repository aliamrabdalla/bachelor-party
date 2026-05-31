import * as THREE from "three";
import { RING } from "../layout.js";

// Authored camera curves, kept WebGL-native and code-driven. Unlike the first
// circular draft, these points intentionally vary radius, height, and aim so the
// camera feels like it is travelling through a handmade room instead of orbiting
// four flat billboards. Progress landmarks stay stable: sections center at
// 0/.25/.5/.75 and corners sit at .125/.375/.625/.875.
const TAU = Math.PI * 2;

const v = (progress, radius, y, angleOffset = 0) => {
  const a = progress * TAU + angleOffset;
  return new THREE.Vector3(Math.cos(a) * radius, y, Math.sin(a) * radius);
};

const buildAuthoredCurve = (points) => {
  const curve = new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.45);
  curve.closed = true;

  // Three's getPointAt is arc-length based, which would move authored section
  // centers away from exact progress landmarks when point spacing varies. The
  // app uses normalized scroll progress as semantic timing, so sample by the
  // explicit CatmullRom parameter instead.
  curve.getPointAt = (progress, target) =>
    curve.getPoint(THREE.MathUtils.euclideanModulo(progress, 1), target);
  curve.getTangentAt = (progress, target) =>
    curve.getTangent(THREE.MathUtils.euclideanModulo(progress, 1), target);

  return curve;
};

export const createCurves = () => {
  const cameraPathCurve = buildAuthoredCurve([
    // Groom & Bride center: calm, slightly wider, enough floor to show the room.
    v(0.0, 2.25, 2.08, 0.0),
    v(0.03125, 2.4, 2.06, 0.015),
    v(0.0625, 2.55, 2.0, 0.04),
    v(0.09375, 2.78, 1.95, 0.065),
    // Couple -> Airbnb corner: drift toward the fold instead of spinning evenly.
    v(0.125, 3.05, 1.9, 0.08),
    v(0.15625, 2.92, 1.95, 0.045),
    v(0.1875, 2.7, 2.04, 0.01),
    v(0.21875, 2.48, 2.12, -0.02),
    // Airbnb center: pulled back horizontally to reveal front-left and back-right.
    v(0.25, 2.2, 2.16, -0.035),
    v(0.28125, 2.32, 2.18, -0.02),
    v(0.3125, 2.55, 2.14, 0.015),
    v(0.34375, 2.9, 2.02, 0.055),
    // Airbnb -> Weekend corner.
    v(0.375, 3.15, 1.94, 0.09),
    v(0.40625, 2.95, 1.98, 0.04),
    v(0.4375, 2.62, 2.06, -0.005),
    v(0.46875, 2.34, 2.14, -0.035),
    // Weekend center: a touch lower/wider for floor activities.
    v(0.5, 2.18, 2.0, -0.055),
    v(0.53125, 2.35, 2.02, -0.02),
    v(0.5625, 2.65, 2.06, 0.02),
    v(0.59375, 2.95, 2.02, 0.06),
    // Weekend -> Packing corner.
    v(0.625, 3.22, 1.96, 0.09),
    v(0.65625, 3.0, 2.0, 0.04),
    v(0.6875, 2.72, 2.1, 0.0),
    v(0.71875, 2.48, 2.18, -0.03),
    // Packing center: a little closer so the gear pile carries the frame.
    v(0.75, 2.85, 2.2, -0.045),
    v(0.78125, 2.95, 2.15, -0.02),
    v(0.8125, 3.02, 2.04, 0.025),
    v(0.84375, 3.12, 1.96, 0.065),
    // Packing -> Couple loop corner.
    v(0.875, 3.25, 1.92, 0.09),
    v(0.90625, 3.0, 1.96, 0.04),
    v(0.9375, 2.62, 2.04, 0.005),
    v(0.96875, 2.38, 2.1, -0.02),
  ]);

  const lookRadius = RING.sectionRadius + 0.8;
  const cameraLookAtCurve = buildAuthoredCurve([
    v(0.0, lookRadius, 0.72, 0.0),
    v(0.03125, lookRadius, 0.62, 0.03),
    v(0.0625, lookRadius, 0.46, 0.075),
    v(0.09375, lookRadius, 0.38, 0.12),
    v(0.125, lookRadius, 0.34, 0.16),
    v(0.15625, lookRadius, 0.42, 0.115),
    v(0.1875, lookRadius, 0.58, 0.055),
    v(0.21875, lookRadius, 0.68, -0.01),
    v(0.25, lookRadius, 0.66, -0.06),
    v(0.28125, lookRadius, 0.58, -0.03),
    v(0.3125, lookRadius, 0.46, 0.035),
    v(0.34375, lookRadius, 0.36, 0.1),
    v(0.375, lookRadius, 0.34, 0.16),
    v(0.40625, lookRadius, 0.42, 0.1),
    v(0.4375, lookRadius, 0.52, 0.035),
    v(0.46875, lookRadius, 0.6, -0.03),
    v(0.5, lookRadius, 0.48, -0.07),
    v(0.53125, lookRadius, 0.44, -0.02),
    v(0.5625, lookRadius, 0.38, 0.045),
    v(0.59375, lookRadius, 0.34, 0.11),
    v(0.625, lookRadius, 0.34, 0.16),
    v(0.65625, lookRadius, 0.42, 0.11),
    v(0.6875, lookRadius, 0.54, 0.04),
    v(0.71875, lookRadius, 0.68, -0.02),
    v(0.75, lookRadius, 0.58, -0.045),
    v(0.78125, lookRadius, 0.5, -0.01),
    v(0.8125, lookRadius, 0.42, 0.05),
    v(0.84375, lookRadius, 0.36, 0.11),
    v(0.875, lookRadius, 0.34, 0.16),
    v(0.90625, lookRadius, 0.42, 0.105),
    v(0.9375, lookRadius, 0.56, 0.045),
    v(0.96875, lookRadius, 0.68, -0.005),
  ]);

  return { cameraPathCurve, cameraLookAtCurve };
};

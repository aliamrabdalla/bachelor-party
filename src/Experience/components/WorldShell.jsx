import * as THREE from "three";
import { useMemo } from "react";
import { WORLD } from "../layout.js";
import { SECTIONS } from "../../config/content.js";

// One seamless surface = floor + wall + domed ceiling, revolved a full 360°.
// The camera orbits inside it, so there's never empty void behind a diorama.
// It's a single LatheGeometry (a 2D profile spun around Y), which guarantees the
// floor flows into the wall and over into the ceiling with no visible seams.
//
// Vertex colors do the work of making it read as a ROUND ROOM rather than a flat
// void: three height bands (warm floor / accent wall / cool light ceiling) with
// soft darkened seams where they meet, and the WALL hue follows whichever section
// it sits behind — each section's accent — blended smoothly around the ring. So
// each quarter of the world looks like that section's own colored alcove, like
// the reference's four seasonal rooms.
//
// The profile below has 8 points; LatheGeometry emits one ring of vertices per
// point, so a vertex's profile index (j) tells us its height band:
//   j 0,1 floor · 2 floor/wall seam · 3,4 wall · 5 wall/ceiling seam · 6,7 ceiling

const PROFILE_BAND = ["floor", "floor", "seamFW", "wall", "wall", "seamWC", "ceiling", "ceiling"];

// Section accents (in scroll order) as THREE.Colors; the wall blends between them
// around the ring, peaking at each section's center (progress i / count).
const accents = SECTIONS.map((s) => new THREE.Color(s.accent));
const ringAccent = (progress, out) => {
  const n = accents.length;
  const f = (((progress % 1) + 1) % 1) * n;
  const i0 = Math.floor(f) % n;
  const i1 = (i0 + 1) % n;
  let t = f - Math.floor(f);
  t = t * t * (3 - 2 * t); // smoothstep for soft transitions between sections
  return out.copy(accents[i0]).lerp(accents[i1], t);
};

export default function WorldShell() {
  const geometry = useMemo(() => {
    const { floorY, wallRadius, wallTop, ceilingPeak } = WORLD;

    // Profile points (radius, height): floor center → wall → domed ceiling.
    const profile = [
      new THREE.Vector2(0.001, floorY), // 0 floor center (tiny x avoids a pole)
      new THREE.Vector2(wallRadius * 0.55, floorY), // 1 floor
      new THREE.Vector2(wallRadius, floorY), // 2 floor edge / wall base (seam)
      new THREE.Vector2(wallRadius, floorY + (wallTop - floorY) * 0.5), // 3 wall
      new THREE.Vector2(wallRadius, wallTop), // 4 wall top
      new THREE.Vector2(wallRadius * 0.82, wallTop + (ceilingPeak - wallTop) * 0.45), // 5 seam
      new THREE.Vector2(wallRadius * 0.45, wallTop + (ceilingPeak - wallTop) * 0.8), // 6 ceiling
      new THREE.Vector2(0.001, ceilingPeak), // 7 ceiling center
    ];

    const geo = new THREE.LatheGeometry(profile, 96);

    const floorBase = new THREE.Color(WORLD.floorBase);
    const ceilBase = new THREE.Color(WORLD.ceilingBase);
    const paper = new THREE.Color(WORLD.paper);

    const accent = new THREE.Color();
    const band = new THREE.Color();
    const wallC = new THREE.Color();
    const floorC = new THREE.Color();
    const ceilC = new THREE.Color();

    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    for (let v = 0; v < pos.count; v++) {
      const x = pos.getX(v);
      const z = pos.getZ(v);
      const progress = (Math.atan2(z, x) / (Math.PI * 2) + 1) % 1;
      ringAccent(progress, accent);

      // Per-band colors derived from this angle's section accent.
      floorC.copy(floorBase).lerp(accent, WORLD.floorAccentMix);
      wallC.copy(accent).lerp(paper, WORLD.wallPaperMix);
      ceilC.copy(ceilBase).lerp(accent, WORLD.ceilingAccentMix);

      const j = v % profile.length;
      switch (PROFILE_BAND[j]) {
        case "floor":
          band.copy(floorC);
          break;
        case "seamFW":
          band.copy(floorC).lerp(wallC, 0.5).multiplyScalar(WORLD.seamDarken);
          break;
        case "wall":
          band.copy(wallC);
          break;
        case "seamWC":
          band.copy(wallC).lerp(ceilC, 0.5).multiplyScalar(WORLD.seamDarken);
          break;
        default:
          band.copy(ceilC);
      }

      colors[v * 3] = band.r;
      colors[v * 3 + 1] = band.g;
      colors[v * 3 + 2] = band.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} renderOrder={-1}>
      <meshBasicMaterial vertexColors side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

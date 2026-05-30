import * as THREE from "three";
import { useMemo } from "react";
import { WORLD } from "../layout.js";

// One seamless surface = floor + wall + domed ceiling, revolved a full 360°.
// The camera orbits inside it, so there's never empty void behind a diorama.
// It's a single LatheGeometry (a 2D profile spun around Y), which guarantees the
// floor flows into the wall and over into the ceiling with no visible seams.
// The material is unlit (meshBasic) to match the flat papercraft look of the
// layers; a vertical vertex-color gradient (floor → wall → ceiling) adds depth.
//
// Per-section wall tinting (so each stop has its own color, like the reference's
// seasons) is a natural next step — keyed off vertex angle — handled during the
// section build-out.
export default function WorldShell() {
  const geometry = useMemo(() => {
    const { floorY, wallRadius, wallTop, ceilingPeak } = WORLD;

    // Profile points are (radius, height); spinning them makes the shell.
    // From the floor center, out to the wall, up, then curving in to the dome.
    const profile = [
      new THREE.Vector2(0.001, floorY), // floor center (tiny x avoids a degenerate pole)
      new THREE.Vector2(wallRadius * 0.55, floorY),
      new THREE.Vector2(wallRadius, floorY), // floor meets wall base
      new THREE.Vector2(wallRadius, floorY + (wallTop - floorY) * 0.5),
      new THREE.Vector2(wallRadius, wallTop), // top of the straight wall
      new THREE.Vector2(wallRadius * 0.82, wallTop + (ceilingPeak - wallTop) * 0.45),
      new THREE.Vector2(wallRadius * 0.45, wallTop + (ceilingPeak - wallTop) * 0.8),
      new THREE.Vector2(0.001, ceilingPeak), // ceiling center, overhead
    ];

    const geo = new THREE.LatheGeometry(profile, 96);

    // Vertical gradient: floorColor at the floor → wallColor mid → ceilingColor
    // at the dome. Vertex colors blend smoothly across the whole surface.
    const floorC = new THREE.Color(WORLD.floorColor);
    const wallC = new THREE.Color(WORLD.wallColor);
    const ceilC = new THREE.Color(WORLD.ceilingColor);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const t = THREE.MathUtils.clamp(
        (pos.getY(i) - floorY) / (ceilingPeak - floorY),
        0,
        1,
      );
      if (t < 0.5) c.copy(floorC).lerp(wallC, t / 0.5);
      else c.copy(wallC).lerp(ceilC, (t - 0.5) / 0.5);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
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

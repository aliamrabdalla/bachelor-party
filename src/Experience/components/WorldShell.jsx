import * as THREE from "three";
import { useMemo } from "react";
import { WORLD, SECTION_COUNT, sectionAngle } from "../layout.js";
import { SECTIONS } from "../../config/content.js";

// The enclosing world is four flat papercraft alcoves — one per section — butted
// together into a full circle, like the reference's four seasonal rooms. Each
// alcove is a 90° wedge: a flat floor sector, a vertical wall arc, and a flat
// ceiling sector, each a single FLAT solid color (so it reads as cut paper, not
// a glow). Adjacent alcoves use different colors and meet at a HARD edge, and a
// crisp dark seam line is drawn at each of the four boundaries.

const SECTION_ARC = (Math.PI * 2) / SECTION_COUNT; // 90°

// A vertical strip of wall spanning [a0, a1] at `radius`, from yB to yT. Built by
// hand (cos/sin convention matches sectionPosition) so seams land exactly where
// the section boundaries are.
function wallArc(a0, a1, radius, yB, yT, segs = 24) {
  const g = new THREE.BufferGeometry();
  const pos = [];
  const idx = [];
  for (let s = 0; s <= segs; s++) {
    const a = a0 + ((a1 - a0) * s) / segs;
    const x = Math.cos(a) * radius;
    const z = Math.sin(a) * radius;
    pos.push(x, yB, z, x, yT, z);
  }
  for (let s = 0; s < segs; s++) {
    const b = s * 2;
    idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
  }
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  return g;
}

// A flat horizontal wedge (triangle fan from the center) spanning [a0, a1] at
// height y — used for the floor and ceiling of each alcove.
function sector(a0, a1, radius, y, segs = 24) {
  const g = new THREE.BufferGeometry();
  const pos = [0, y, 0];
  for (let s = 0; s <= segs; s++) {
    const a = a0 + ((a1 - a0) * s) / segs;
    pos.push(Math.cos(a) * radius, y, Math.sin(a) * radius);
  }
  const idx = [];
  for (let s = 0; s < segs; s++) idx.push(0, s + 1, s + 2);
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  return g;
}

const hex = (c) => `#${c.getHexString()}`;

export default function WorldShell() {
  const { floorY, ceilingY, wallRadius } = WORLD;

  const sections = useMemo(() => {
    const paper = new THREE.Color(WORLD.paper);
    const floorBlend = new THREE.Color(WORLD.floorBlend);
    const ceilBlend = new THREE.Color(WORLD.ceilBlend);
    return SECTIONS.map((s, i) => {
      const a = sectionAngle(i);
      const a0 = a - SECTION_ARC / 2;
      const a1 = a + SECTION_ARC / 2;
      const accent = new THREE.Color(s.accent);
      return {
        key: s.key,
        wallGeo: wallArc(a0, a1, wallRadius, floorY, ceilingY),
        floorGeo: sector(a0, a1, wallRadius, floorY),
        ceilGeo: sector(a0, a1, wallRadius, ceilingY),
        wall: hex(accent.clone().lerp(paper, WORLD.wallPaperMix)),
        floor: hex(accent.clone().lerp(floorBlend, WORLD.floorBlendAmt)),
        ceil: hex(accent.clone().lerp(ceilBlend, WORLD.ceilBlendAmt)),
      };
    });
  }, [floorY, ceilingY, wallRadius]);

  // A crisp dark line at each of the four alcove boundaries — a thin full-height
  // strip set just inside the wall so the division reads as a hard edge.
  const seams = useMemo(() => {
    const arr = [];
    for (let i = 0; i < SECTION_COUNT; i++) {
      const ab = sectionAngle(i) + SECTION_ARC / 2; // boundary between alcove i and i+1
      arr.push(
        wallArc(ab - WORLD.seamHalfAngle, ab + WORLD.seamHalfAngle, wallRadius * 0.995, floorY, ceilingY, 1),
      );
    }
    return arr;
  }, [floorY, ceilingY, wallRadius]);

  return (
    <group>
      {sections.map((s) => (
        <group key={s.key}>
          <mesh geometry={s.wallGeo} renderOrder={-1}>
            <meshBasicMaterial color={s.wall} side={THREE.DoubleSide} toneMapped={false} />
          </mesh>
          <mesh geometry={s.floorGeo} renderOrder={-1}>
            <meshBasicMaterial color={s.floor} side={THREE.DoubleSide} toneMapped={false} />
          </mesh>
          <mesh geometry={s.ceilGeo} renderOrder={-1}>
            <meshBasicMaterial color={s.ceil} side={THREE.DoubleSide} toneMapped={false} />
          </mesh>
        </group>
      ))}
      {seams.map((g, i) => (
        <mesh key={i} geometry={g} renderOrder={0}>
          <meshBasicMaterial color={WORLD.seamColor} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

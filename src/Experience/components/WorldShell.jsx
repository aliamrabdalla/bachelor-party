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

function seededRandom(seed) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function createPaperTexture(seed, repeatX, repeatY) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const rand = seededRandom(seed);
  const image = ctx.createImageData(size, size);

  for (let i = 0; i < image.data.length; i += 4) {
    const grain = 220 + Math.floor(rand() * 34);
    image.data[i] = grain;
    image.data[i + 1] = grain;
    image.data[i + 2] = grain;
    image.data[i + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);

  ctx.globalAlpha = 0.12;
  for (let i = 0; i < 34; i++) {
    const y = rand() * size;
    ctx.strokeStyle = rand() > 0.5 ? "#ffffff" : "#7a6a54";
    ctx.lineWidth = 0.5 + rand() * 1.2;
    ctx.beginPath();
    ctx.moveTo(-10, y);
    ctx.bezierCurveTo(size * 0.35, y + rand() * 18 - 9, size * 0.7, y + rand() * 18 - 9, size + 10, y + rand() * 10 - 5);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

// A vertical strip of wall spanning [a0, a1] at `radius`, from yB to yT. Built by
// hand (cos/sin convention matches sectionPosition) so seams land exactly where
// the section boundaries are.
function wallArc(a0, a1, radius, yB, yT, segs = 24) {
  const g = new THREE.BufferGeometry();
  const pos = [];
  const uv = [];
  const idx = [];
  for (let s = 0; s <= segs; s++) {
    const a = a0 + ((a1 - a0) * s) / segs;
    const x = Math.cos(a) * radius;
    const z = Math.sin(a) * radius;
    pos.push(x, yB, z, x, yT, z);
    uv.push(s / segs, 0, s / segs, 1);
  }
  for (let s = 0; s < segs; s++) {
    const b = s * 2;
    idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
  }
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

// A flat horizontal wedge (triangle fan from the center) spanning [a0, a1] at
// height y — used for the floor and ceiling of each alcove.
function sector(a0, a1, radius, y, segs = 24) {
  const g = new THREE.BufferGeometry();
  const pos = [0, y, 0];
  const uv = [0.5, 0.5];
  for (let s = 0; s <= segs; s++) {
    const a = a0 + ((a1 - a0) * s) / segs;
    const x = Math.cos(a) * radius;
    const z = Math.sin(a) * radius;
    pos.push(x, y, z);
    uv.push((x / radius + 1) / 2, (z / radius + 1) / 2);
  }
  const idx = [];
  for (let s = 0; s < segs; s++) idx.push(0, s + 1, s + 2);
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

function radialStrip(a, radius, y, halfWidth, innerRadius = 0.35) {
  const g = new THREE.BufferGeometry();
  const dx = Math.cos(a);
  const dz = Math.sin(a);
  const px = -Math.sin(a) * halfWidth;
  const pz = Math.cos(a) * halfWidth;
  const innerX = dx * innerRadius;
  const innerZ = dz * innerRadius;
  const outerX = dx * radius;
  const outerZ = dz * radius;

  g.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      [
        innerX + px, y, innerZ + pz,
        outerX + px, y, outerZ + pz,
        innerX - px, y, innerZ - pz,
        outerX - px, y, outerZ - pz,
      ],
      3,
    ),
  );
  g.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1, 1, 1], 2));
  g.setIndex([0, 1, 2, 1, 3, 2]);
  return g;
}

const hex = (c) => `#${c.getHexString()}`;

export default function WorldShell() {
  const { floorY, ceilingY, wallRadius } = WORLD;

  const paperTextures = useMemo(
    () => ({
      wall: createPaperTexture(11, 5, 2),
      floor: createPaperTexture(29, 7, 7),
      ceiling: createPaperTexture(47, 5, 5),
    }),
    [],
  );

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
        floor: s.shell?.floor ?? hex(accent.clone().lerp(floorBlend, WORLD.floorBlendAmt)),
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
      arr.push({
        wall: wallArc(ab - WORLD.seamHalfAngle, ab + WORLD.seamHalfAngle, wallRadius * 0.995, floorY, ceilingY, 1),
        floor: radialStrip(ab, wallRadius * 0.985, floorY + 0.012, 0.055),
        ceiling: radialStrip(ab, wallRadius * 0.985, ceilingY - 0.012, 0.055),
      });
    }
    return arr;
  }, [floorY, ceilingY, wallRadius]);

  return (
    <group>
      {sections.map((s) => (
        <group key={s.key}>
          <mesh geometry={s.wallGeo} renderOrder={-1}>
            <meshBasicMaterial
              color={s.wall}
              map={paperTextures.wall}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
          <mesh geometry={s.floorGeo} renderOrder={-1}>
            <meshBasicMaterial
              color={s.floor}
              map={paperTextures.floor}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
          <mesh geometry={s.ceilGeo} renderOrder={-1}>
            <meshBasicMaterial
              color={s.ceil}
              map={paperTextures.ceiling}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
      {seams.map((g, i) => (
        <group key={i}>
          <mesh geometry={g.wall} renderOrder={0}>
            <meshBasicMaterial color={WORLD.seamColor} side={THREE.DoubleSide} toneMapped={false} />
          </mesh>
          <mesh geometry={g.floor} renderOrder={0}>
            <meshBasicMaterial
              color={WORLD.seamColor}
              transparent
              opacity={0.62}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
          <mesh geometry={g.ceiling} renderOrder={0}>
            <meshBasicMaterial
              color={WORLD.seamColor}
              transparent
              opacity={0.48}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

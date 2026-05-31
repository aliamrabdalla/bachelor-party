import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { asset } from "../../config/assets.js";
import { RING, WORLD, SECTION_COUNT } from "../layout.js";
import { useCurveProgressStore } from "../../store/useCurveProgressStore.js";

const GROOM_SCENES = [
  { front: "person-groom-couple.png", side: "person-groom-couple-side.png" },
  { front: "person-groom-youssef.png", side: "person-groom-airbnb-side.png" },
  { front: "person-groom-weekend.png", side: "person-groom-weekend-side.png" },
  { front: "person-groom-packing.png", side: "person-groom-packing-side.png" },
];

const GROOM_IMAGES = GROOM_SCENES.flatMap((scene) => [scene.front, scene.side]);
const GROOM_SCALE = 1.85;
const GROOM_CENTER_Y = WORLD.floorY + GROOM_SCALE / 2 + 0.07;
const TAU = Math.PI * 2;

const v = (progress, radius, y, angleOffset = 0) => {
  const a = progress * TAU + angleOffset;
  return new THREE.Vector3(Math.cos(a) * radius, y, Math.sin(a) * radius);
};

const buildGroomCurve = () => {
  const curve = new THREE.CatmullRomCurve3(
    [
      v(0, RING.sectionRadius - 1.15, GROOM_CENTER_Y, -0.02),
      v(0.0625, RING.sectionRadius - 1.05, GROOM_CENTER_Y, 0.02),
      v(0.125, RING.sectionRadius - 1.35, GROOM_CENTER_Y, 0.05),
      v(0.1875, RING.sectionRadius - 1.0, GROOM_CENTER_Y, -0.02),
      v(0.25, RING.sectionRadius - 1.18, GROOM_CENTER_Y, -0.04),
      v(0.3125, RING.sectionRadius - 1.08, GROOM_CENTER_Y, 0.01),
      v(0.375, RING.sectionRadius - 1.38, GROOM_CENTER_Y, 0.05),
      v(0.4375, RING.sectionRadius - 1.05, GROOM_CENTER_Y, -0.02),
      v(0.5, RING.sectionRadius - 1.2, GROOM_CENTER_Y, -0.05),
      v(0.5625, RING.sectionRadius - 1.1, GROOM_CENTER_Y, 0.01),
      v(0.625, RING.sectionRadius - 1.35, GROOM_CENTER_Y, 0.04),
      v(0.6875, RING.sectionRadius - 1.0, GROOM_CENTER_Y, -0.02),
      v(0.75, RING.sectionRadius - 1.12, GROOM_CENTER_Y, -0.04),
      v(0.8125, RING.sectionRadius - 1.05, GROOM_CENTER_Y, 0.01),
      v(0.875, RING.sectionRadius - 1.32, GROOM_CENTER_Y, 0.05),
      v(0.9375, RING.sectionRadius - 1.02, GROOM_CENTER_Y, -0.02),
    ],
    true,
    "catmullrom",
    0.45,
  );

  curve.getPointAt = (progress, target) =>
    curve.getPoint(THREE.MathUtils.euclideanModulo(progress, 1), target);

  return curve;
};

export default function MovingGroom() {
  const textures = useTexture(GROOM_IMAGES.map(asset));
  const groupRef = useRef();
  const innerRef = useRef();
  const groomRef = useRef();
  const shadowRef = useRef();
  const target = useRef(new THREE.Vector3());
  const previousProgress = useRef(0);
  const scrollVelocity = useRef(0);
  const activeImage = useRef(-1);

  const groomPath = useMemo(() => buildGroomCurve(), []);

  const spriteSizes = useMemo(() => {
    return textures.map((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      const img = texture.image;
      const aspect = img && img.width ? img.width / img.height : 2 / 3;
      return [GROOM_SCALE * aspect, GROOM_SCALE];
    });
  }, [textures]);

  useFrame((state) => {
    if (!groupRef.current || !innerRef.current || !groomRef.current || !shadowRef.current) return;

    const progress = useCurveProgressStore.getState().scrollProgress;
    let delta = progress - previousProgress.current;
    if (delta > 0.5) delta -= 1;
    if (delta < -0.5) delta += 1;
    const loopJump = Math.abs(delta) > 0.35;
    if (loopJump) delta = 0;

    scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, delta, 0.34);
    const moving = Math.abs(scrollVelocity.current) > 0.00018;
    const direction = moving && scrollVelocity.current < 0 ? -1 : 1;
    const bob = Math.sin(state.clock.elapsedTime * 6.2 + progress * TAU * 6) * 0.11;
    const sway = Math.sin(state.clock.elapsedTime * 3.7 + progress * TAU * 5) * 0.065;
    const sectionIndex = Math.floor(((progress + 0.125) % 1) * SECTION_COUNT);
    const imageIndex = sectionIndex * 2 + (moving ? 1 : 0);

    target.current.copy(groomPath.getPointAt(progress));
    target.current.y += bob;

    if (loopJump) groupRef.current.position.copy(target.current);
    else groupRef.current.position.lerp(target.current, 0.16);

    const angle = Math.atan2(groupRef.current.position.z, groupRef.current.position.x);
    groupRef.current.rotation.set(0, -angle - Math.PI / 2, 0);
    innerRef.current.rotation.set(0, 0, sway + scrollVelocity.current * 28);
    shadowRef.current.position.y = WORLD.floorY + 0.026 - groupRef.current.position.y;

    if (activeImage.current !== imageIndex) {
      groomRef.current.material.map = textures[imageIndex];
      groomRef.current.material.needsUpdate = true;
      activeImage.current = imageIndex;
    }
    const [width, height] = spriteSizes[imageIndex] ?? spriteSizes[0];
    groomRef.current.scale.set(width * (moving ? direction : 1), height, 1);

    previousProgress.current = progress;
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={shadowRef}
        position={[0, WORLD.floorY + 0.026 - GROOM_CENTER_Y, -0.08]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.78, 0.26, 1]}
        renderOrder={0}
      >
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial
          color="#2b2118"
          transparent
          opacity={0.24}
          depthWrite={false}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
      <group ref={innerRef}>
        <mesh position={[0, -0.56, -0.018]}>
          <planeGeometry args={[0.07, 1.12]} />
          <meshBasicMaterial color="#7b522f" side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.08, 0.035]}>
          <circleGeometry args={[0.055, 18]} />
          <meshBasicMaterial color="#c28b52" side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
        <mesh ref={groomRef} position={[0, 0, 0.02]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={textures[0]}
            transparent
            alphaTest={0.5}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

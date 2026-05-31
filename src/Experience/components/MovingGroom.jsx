import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { asset } from "../../config/assets.js";
import { RING, WORLD, SECTION_COUNT, sectionFacingRotation } from "../layout.js";
import { useCurveProgressStore } from "../../store/useCurveProgressStore.js";

const GROOM_IMAGES = [
  "person-groom-couple.png",
  "person-groom-youssef.png",
  "person-groom-weekend.png",
  "person-groom-packing.png",
];

const GROOM_SCALE = 1.85;
const GROOM_RADIUS = RING.sectionRadius - 1.1;
const GROOM_CENTER_Y = WORLD.floorY + GROOM_SCALE / 2 + 0.07;

export default function MovingGroom() {
  const textures = useTexture(GROOM_IMAGES.map(asset));
  const groupRef = useRef();
  const innerRef = useRef();
  const groomRef = useRef();
  const shadowRef = useRef();
  const target = useRef(new THREE.Vector3());
  const previousProgress = useRef(0);
  const activeTexture = useRef(0);

  const [width, height] = useMemo(() => {
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
    });
    const img = textures[0].image;
    const aspect = img && img.width ? img.width / img.height : 2 / 3;
    return [GROOM_SCALE * aspect, GROOM_SCALE];
  }, [textures]);

  useFrame((state) => {
    if (!groupRef.current || !innerRef.current || !groomRef.current || !shadowRef.current) return;

    const progress = useCurveProgressStore.getState().scrollProgress;
    const angle = progress * Math.PI * 2;
    const loopJump = Math.abs(progress - previousProgress.current) > 0.5;
    const bob = Math.sin(state.clock.elapsedTime * 5.4 + progress * Math.PI * 12) * 0.085;
    const sway = Math.sin(state.clock.elapsedTime * 3.2 + progress * Math.PI * 10) * 0.045;
    const sectionIndex = Math.floor(((progress + 0.125) % 1) * SECTION_COUNT);

    target.current.set(
      Math.cos(angle) * GROOM_RADIUS,
      GROOM_CENTER_Y + bob,
      Math.sin(angle) * GROOM_RADIUS,
    );

    if (loopJump) groupRef.current.position.copy(target.current);
    else groupRef.current.position.lerp(target.current, 0.16);

    groupRef.current.rotation.set(0, sectionFacingRotation(progress * SECTION_COUNT), 0);
    innerRef.current.rotation.set(0, 0, sway);
    shadowRef.current.position.y = WORLD.floorY + 0.026 - groupRef.current.position.y;

    if (activeTexture.current !== sectionIndex) {
      groomRef.current.material.map = textures[sectionIndex];
      groomRef.current.material.needsUpdate = true;
      activeTexture.current = sectionIndex;
    }

    previousProgress.current = progress;
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={shadowRef}
        position={[0, WORLD.floorY + 0.026 - GROOM_CENTER_Y, -0.08]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.72, 0.24, 1]}
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
        <mesh position={[0, -0.78, -0.018]}>
          <planeGeometry args={[0.07, 1.95]} />
          <meshBasicMaterial color="#7b522f" side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.1, 0.035]}>
          <circleGeometry args={[0.055, 18]} />
          <meshBasicMaterial color="#c28b52" side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
        <mesh ref={groomRef} position={[0, 0, 0.02]}>
          <planeGeometry args={[width, height]} />
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

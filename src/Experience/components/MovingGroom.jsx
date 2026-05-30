import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { asset } from "../../config/assets.js";
import { RING, sectionFacingRotation } from "../layout.js";
import { useCurveProgressStore } from "../../store/useCurveProgressStore.js";

const GROOM_SCALE = 1.32;
const GROOM_RADIUS = RING.sectionRadius - 1.35;
const GROOM_Y = -1.34;

export default function MovingGroom() {
  const texture = useTexture(asset("person-groom-youssef.png"));
  const meshRef = useRef();
  const target = useRef(new THREE.Vector3());
  const previousProgress = useRef(0);

  const [width, height] = useMemo(() => {
    const img = texture.image;
    const aspect = img && img.width ? img.width / img.height : 1;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    return [GROOM_SCALE * aspect, GROOM_SCALE];
  }, [texture]);

  useFrame(() => {
    if (!meshRef.current) return;

    const progress = useCurveProgressStore.getState().scrollProgress;
    const angle = progress * Math.PI * 2;
    const loopJump = Math.abs(progress - previousProgress.current) > 0.5;
    const bob = Math.sin(progress * Math.PI * 16) * 0.035;

    target.current.set(
      Math.cos(angle) * GROOM_RADIUS,
      GROOM_Y + bob,
      Math.sin(angle) * GROOM_RADIUS,
    );

    if (loopJump) meshRef.current.position.copy(target.current);
    else meshRef.current.position.lerp(target.current, 0.16);

    meshRef.current.rotation.set(0, sectionFacingRotation(progress * 4), 0);
    previousProgress.current = progress;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.5}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

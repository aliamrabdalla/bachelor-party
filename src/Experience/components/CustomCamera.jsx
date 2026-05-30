import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { useCurveProgressStore } from "../../store/useCurveProgressStore";
import { useResponsiveStore } from "../../store/useResponsiveStore";
import { useExperienceStore } from "../../store/useExperienceStore";
import { useCameraStore } from "../../store/useCameraStore";

// Drives the camera around the orbit. A group rides the path curve and aims at
// the lookAt curve; the inner camera adds a small pointer-driven parallax so the
// scene feels like it has depth as you move the mouse.
const CustomCamera = () => {
  const { pointer } = useThree();
  const curves = useCurveProgressStore((s) => s.curves);

  const groupRef = useRef();
  const camRef = useRef();

  const targetPosition = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const currentPointer = useRef(new THREE.Vector2());
  const isFirstFrame = useRef(true);

  useFrame(() => {
    if (useExperienceStore.getState().openPanel) return;
    if (!groupRef.current || !camRef.current) return;

    const progress = useCurveProgressStore.getState().scrollProgress;
    curves.cameraPathCurve.getPointAt(progress, targetPosition.current);
    curves.cameraLookAtCurve.getPointAt(progress, targetLookAt.current);

    if (isFirstFrame.current) {
      groupRef.current.position.copy(targetPosition.current);
      currentLookAt.current.copy(targetLookAt.current);
      groupRef.current.lookAt(currentLookAt.current);
      isFirstFrame.current = false;
      return;
    }

    // Smoothly chase the sampled path/lookAt so scroll feels eased, not snappy.
    groupRef.current.position.lerp(targetPosition.current, 0.1);
    currentLookAt.current.lerp(targetLookAt.current, 0.1);
    groupRef.current.lookAt(currentLookAt.current);

    // group.lookAt() points the GROUP's +Z at the target, but a camera looks
    // down -Z, so the inner camera is rotated 180° about Y to face the target.
    // Pointer parallax adds a small offset on top (disabled on mobile).
    const isMobile = useResponsiveStore.getState().isMobile;
    const targetX = isMobile ? 0 : pointer.x;
    const targetY = isMobile ? 0 : pointer.y;
    currentPointer.current.lerp({ x: targetX, y: targetY }, 0.08);
    camRef.current.position.set(
      currentPointer.current.x * 0.25,
      currentPointer.current.y * 0.15,
      0,
    );
    camRef.current.rotation.set(
      -currentPointer.current.y * 0.06,
      Math.PI - currentPointer.current.x * 0.06,
      0,
    );

    // Apply the user's zoom (from the ZoomSlider) to the perspective camera.
    const zoom = useCameraStore.getState().zoom;
    if (camRef.current.zoom !== zoom) {
      camRef.current.zoom = zoom;
      camRef.current.updateProjectionMatrix();
    }
  });

  return (
    <group ref={groupRef}>
      <PerspectiveCamera makeDefault fov={55} near={0.1} far={100} ref={camRef} />
    </group>
  );
};

export default CustomCamera;

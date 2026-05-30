import { useEffect } from "react";
import CustomCamera from "./components/CustomCamera.jsx";
import WorldShell from "./components/WorldShell.jsx";
import Section from "./components/Section.jsx";
import MovingGroom from "./components/MovingGroom.jsx";
import { SECTIONS } from "../config/content.js";
import { useExperienceStore } from "../store/useExperienceStore";

// Signals that the scene mounted so the loading screen can hand off.
const SceneReadySentinel = () => {
  const setIsSceneReady = useExperienceStore((s) => s.setIsSceneReady);
  useEffect(() => setIsSceneReady(true), [setIsSceneReady]);
  return null;
};

export default function Scene() {
  return (
    <>
      <CustomCamera />
      <ambientLight intensity={1} />
      <WorldShell />
      {SECTIONS.map((section, i) => (
        <Section key={section.key} section={section} index={i} />
      ))}
      <MovingGroom />
      <SceneReadySentinel />
    </>
  );
}

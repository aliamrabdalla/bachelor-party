import { Html } from "@react-three/drei";
import { useExperienceStore } from "../../store/useExperienceStore";
import "./SceneMarker.css";

export default function SceneMarker({ marker, accent, sectionKey }) {
  const setOpenPanel = useExperienceStore((s) => s.setOpenPanel);
  const {
    title,
    lines = [],
    x = 0,
    y = 1,
    depth = -0.5,
    width = 150,
    distanceFactor = 6,
    className = "",
  } = marker;
  const label = [title, ...lines].filter(Boolean).join(": ");

  return (
    <Html
      transform
      center
      position={[x, y, depth]}
      distanceFactor={distanceFactor}
      pointerEvents="auto"
      style={{ "--accent": accent, width }}
    >
      <button
        className={`scene-marker ${className}`}
        type="button"
        aria-label={label || "Open details"}
        title={label || "Open details"}
        onClick={(e) => {
          e.stopPropagation();
          setOpenPanel(sectionKey);
        }}
      >
        <span className="scene-marker-pin">!</span>
      </button>
    </Html>
  );
}

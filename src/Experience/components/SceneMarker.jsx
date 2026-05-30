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
        onClick={(e) => {
          e.stopPropagation();
          setOpenPanel(sectionKey);
        }}
      >
        {title && <span className="scene-marker-title">{title}</span>}
        {lines.map((line, i) => (
          <span className="scene-marker-line" key={i}>
            {line}
          </span>
        ))}
      </button>
    </Html>
  );
}

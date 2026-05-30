import { Suspense } from "react";
import PaperLayer from "./PaperLayer.jsx";
import SceneNote from "./SceneNote.jsx";
import SceneMarker from "./SceneMarker.jsx";
import { SECTION_LAYERS } from "../../config/sections.js";
import { sectionPosition, sectionFacingRotation } from "../layout.js";
import { useExperienceStore } from "../../store/useExperienceStore";

// A single diorama parked on the outer ring, rotated to face the center so its
// flat layers always present toward the orbiting camera. Clicking any layer
// opens that section's info panel.
export default function Section({ section, index }) {
  const layers = SECTION_LAYERS[section.key] ?? [];
  const setOpenPanel = useExperienceStore((s) => s.setOpenPanel);

  return (
    <group
      position={sectionPosition(index)}
      rotation={[0, sectionFacingRotation(index), 0]}
      onClick={(e) => {
        e.stopPropagation();
        setOpenPanel(section.key);
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <Suspense fallback={null}>
        {layers.map((layer, i) => (
          <PaperLayer key={i} layer={layer} accent={section.accent} />
        ))}
        {section.sceneNotes?.map((note, i) => (
          <SceneNote key={`note-${i}`} note={note} accent={section.accent} />
        ))}
        {section.sceneMarkers?.map((marker, i) => (
          <SceneMarker
            key={`marker-${i}`}
            marker={marker}
            accent={section.accent}
            sectionKey={section.key}
          />
        ))}
      </Suspense>
    </group>
  );
}

import { useCameraStore, ZOOM } from "../../store/useCameraStore";
import { useExperienceStore } from "../../store/useExperienceStore";
import "./ZoomSlider.css";

// Bottom-right HUD: zoom the camera in/out. The − / + buttons step the zoom and
// the slider gives fine control; all three write to useCameraStore, which
// CustomCamera reads each frame. Hidden until the experience is ready and while
// an info panel is open (matching SectionNav).
const clamp = (v) => Math.min(ZOOM.max, Math.max(ZOOM.min, v));
const STEP = 0.15;

export default function ZoomSlider() {
  const isReady = useExperienceStore((s) => s.isExperienceReady);
  const openPanel = useExperienceStore((s) => s.openPanel);
  const zoom = useCameraStore((s) => s.zoom);
  const setZoom = useCameraStore((s) => s.setZoom);

  if (!isReady) return null;

  return (
    <div className={`zoom-slider ${openPanel ? "is-hidden" : ""}`}>
      <button
        className="zoom-btn"
        aria-label="Zoom out"
        onClick={() => setZoom(clamp(zoom - STEP))}
      >
        −
      </button>
      <input
        type="range"
        className="zoom-range"
        aria-label="Zoom"
        min={ZOOM.min}
        max={ZOOM.max}
        step={ZOOM.step}
        value={zoom}
        onChange={(e) => setZoom(parseFloat(e.target.value))}
      />
      <button
        className="zoom-btn"
        aria-label="Zoom in"
        onClick={() => setZoom(clamp(zoom + STEP))}
      >
        +
      </button>
    </div>
  );
}

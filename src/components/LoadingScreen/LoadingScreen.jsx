import { useState } from "react";
import { useProgress } from "@react-three/drei";
import { SITE } from "../../config/content.js";
import { useExperienceStore } from "../../store/useExperienceStore";
import "./LoadingScreen.css";

// Paper cover over the canvas. Shows load progress, then an "Enter" button that
// peels the cover away and unlocks scrolling.
export default function LoadingScreen() {
  const { progress } = useProgress();
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const setIsExperienceReady = useExperienceStore((s) => s.setIsExperienceReady);

  const loaded = progress >= 100;

  const enter = () => {
    setLeaving(true);
    setIsExperienceReady(true);
    setTimeout(() => setGone(true), 900);
  };

  if (gone) return null;

  return (
    <div className={`loading ${leaving ? "loading--leaving" : ""}`}>
      <div className="loading-inner">
        <h1 className="loading-title">{SITE.title}</h1>
        <p className="loading-subtitle">{SITE.subtitle}</p>

        {!loaded ? (
          <div className="loading-bar">
            <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        ) : (
          <button className="loading-enter" onClick={enter}>
            Enter
          </button>
        )}

        <p className="loading-hint">Scroll or swipe to explore</p>
      </div>
    </div>
  );
}

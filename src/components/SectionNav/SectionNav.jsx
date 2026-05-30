import { useEffect, useState } from "react";
import { SECTIONS } from "../../config/content.js";
import { sectionProgress, SECTION_COUNT } from "../../Experience/layout.js";
import { useCurveProgressStore } from "../../store/useCurveProgressStore";
import { useExperienceStore } from "../../store/useExperienceStore";
import { scrollToProgress } from "../../lib/lenis.js";
import "./SectionNav.css";

// Bottom HUD: shows the current stop and lets guests jump between the four
// sections. The active item is whichever section the scroll progress is nearest.
export default function SectionNav() {
  const isReady = useExperienceStore((s) => s.isExperienceReady);
  const openPanel = useExperienceStore((s) => s.openPanel);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsub = useCurveProgressStore.subscribe((state) => {
      const p = state.scrollProgress;
      // Nearest section center on a wrapping ring.
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < SECTION_COUNT; i++) {
        const c = sectionProgress(i);
        const d = Math.min(Math.abs(p - c), 1 - Math.abs(p - c));
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      setActive(best);
    });
    return unsub;
  }, []);

  if (!isReady) return null;

  return (
    <nav className={`section-nav ${openPanel ? "is-hidden" : ""}`}>
      {SECTIONS.map((section, i) => (
        <button
          key={section.key}
          className={`section-nav-item ${i === active ? "is-active" : ""}`}
          style={{ "--accent": section.accent }}
          onClick={() => scrollToProgress(sectionProgress(i))}
        >
          <span className="section-nav-dot" />
          <span className="section-nav-label">{section.label}</span>
        </button>
      ))}
    </nav>
  );
}

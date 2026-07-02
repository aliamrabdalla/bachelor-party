import { useEffect, useState } from "react";
import { PARTY_START, SECTIONS } from "../../config/content.js";
import { SECTION_COUNT, sectionProgress } from "../../Experience/layout.js";
import { useCurveProgressStore } from "../../store/useCurveProgressStore";
import { useExperienceStore } from "../../store/useExperienceStore";
import "./CountdownRibbon.css";

const target = new Date(PARTY_START).getTime();

function getRemaining() {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function nearestSection(progress) {
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < SECTION_COUNT; i++) {
    const center = sectionProgress(i);
    const dist = Math.min(Math.abs(progress - center), 1 - Math.abs(progress - center));
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  }
  return best;
}

export default function CountdownRibbon() {
  const isReady = useExperienceStore((s) => s.isExperienceReady);
  const openPanel = useExperienceStore((s) => s.openPanel);
  const [active, setActive] = useState(0);
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const unsub = useCurveProgressStore.subscribe((state) => {
      setActive(nearestSection(state.scrollProgress));
    });
    return unsub;
  }, []);

  if (!isReady) return null;

  const section = SECTIONS[active];
  const units = remaining
    ? [
        ["days", remaining.days],
        ["hrs", remaining.hours],
        ["min", remaining.minutes],
        ["sec", remaining.seconds],
      ]
    : null;

  return (
    <div
      className={`countdown-ribbon ${openPanel ? "is-hidden" : ""}`}
      style={{ "--accent": section.accent, "--section-floor": section.shell?.floor ?? section.accent }}
    >
      <div className="countdown-ribbon-inner">
        <span className="countdown-ribbon-kicker">July 31, 2026</span>
        {units ? (
          <span className="countdown-ribbon-units" aria-label="Countdown to check-in">
            {units.map(([label, value]) => (
              <span className="countdown-ribbon-unit" key={label}>
                <span className="countdown-ribbon-value">{String(value).padStart(2, "0")}</span>
                <span className="countdown-ribbon-label">{label}</span>
              </span>
            ))}
          </span>
        ) : (
          <span className="countdown-ribbon-live">It's happening.</span>
        )}
      </div>
    </div>
  );
}

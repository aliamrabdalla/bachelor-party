import { useEffect, useState } from "react";
import { SECTIONS } from "../../config/content.js";
import { useExperienceStore } from "../../store/useExperienceStore";
import Countdown from "../Countdown/Countdown.jsx";
import "./SectionPanel.css";

// Slide-over panel for the currently opened section. Reads the open key from the
// store; the packing section additionally shows the live countdown.
export default function SectionPanel() {
  const openPanel = useExperienceStore((s) => s.openPanel);
  const setOpenPanel = useExperienceStore((s) => s.setOpenPanel);

  // Keep the section mounted during the close animation.
  const [rendered, setRendered] = useState(openPanel);
  useEffect(() => {
    if (openPanel) setRendered(openPanel);
  }, [openPanel]);

  const section = SECTIONS.find((s) => s.key === (openPanel || rendered));
  if (!section) return null;

  const isOpen = Boolean(openPanel);
  const { panel, accent } = section;

  return (
    <div
      className={`panel-backdrop ${isOpen ? "is-open" : ""}`}
      onClick={() => setOpenPanel(null)}
    >
      <aside
        className={`panel ${isOpen ? "is-open" : ""}`}
        style={{ "--accent": accent }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="panel-close" onClick={() => setOpenPanel(null)} aria-label="Close">
          ✕
        </button>

        <span className="panel-kicker">{section.label}</span>
        <h2 className="panel-heading">{panel.heading}</h2>
        <p className="panel-body">{panel.body}</p>

        {panel.facts?.length > 0 && (
          <ul className="panel-facts">
            {panel.facts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        )}

        {section.key === "packing" && (
          <>
            <div className="panel-countdown-label">The countdown</div>
            <Countdown />
          </>
        )}
      </aside>
    </div>
  );
}

import { useEffect, useState } from "react";
import { PARTY_START } from "../../config/content.js";
import "./Countdown.css";

const target = new Date(PARTY_START).getTime();

const getRemaining = () => {
  const diff = target - Date.now();
  if (diff <= 0) return null; // party has started
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
};

export default function Countdown() {
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!remaining) {
    return <div className="countdown countdown--live">It's happening. 🎉</div>;
  }

  const units = [
    ["days", remaining.days],
    ["hrs", remaining.hours],
    ["min", remaining.minutes],
    ["sec", remaining.seconds],
  ];

  return (
    <div className="countdown">
      {units.map(([label, value]) => (
        <div className="countdown-unit" key={label}>
          <span className="countdown-value">{String(value).padStart(2, "0")}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

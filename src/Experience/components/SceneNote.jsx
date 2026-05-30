import { Html } from "@react-three/drei";
import "./SceneNote.css";

export default function SceneNote({ note, accent }) {
  const {
    title,
    body,
    facts = [],
    x = 0,
    y = 1.2,
    depth = -1,
    width = 260,
    distanceFactor = 7,
  } = note;

  return (
    <Html
      transform
      center
      position={[x, y, depth]}
      distanceFactor={distanceFactor}
      pointerEvents="none"
      style={{ "--accent": accent, width }}
    >
      <div className="scene-note">
        {title && <div className="scene-note-title">{title}</div>}
        {body && <p className="scene-note-body">{body}</p>}
        {facts.length > 0 && (
          <ul className="scene-note-facts">
            {facts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        )}
      </div>
    </Html>
  );
}

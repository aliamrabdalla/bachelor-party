import { useTexture, Html } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";
import { asset } from "../../config/assets.js";

// One flat cutout on a plane. Width is derived from the image aspect ratio so
// art never stretches. Layers sit at different local Z (`depth`) within their
// section group, and the real perspective camera turns that into parallax.

function TexturedLayer({ src, depth, scale, x, y }) {
  const texture = useTexture(asset(src));

  const [w, h] = useMemo(() => {
    const img = texture.image;
    const aspect = img && img.width ? img.width / img.height : 1;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    return [scale * aspect, scale];
  }, [texture, scale]);

  return (
    <mesh position={[x, y, depth]}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.5}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

function PlaceholderLayer({ label, depth, scale, x, y, accent }) {
  return (
    <group position={[x, y, depth]}>
      <mesh>
        <planeGeometry args={[scale * 0.9, scale]} />
        <meshBasicMaterial color={accent} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <Html center distanceFactor={10} pointerEvents="none">
        <div
          style={{
            font: "600 14px/1.2 system-ui, sans-serif",
            color: "#fff",
            textAlign: "center",
            whiteSpace: "nowrap",
            textShadow: "0 1px 3px rgba(0,0,0,.5)",
            userSelect: "none",
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

export default function PaperLayer({ layer, accent }) {
  const { src, depth = 0, scale = 3, x = 0, y = 0, label = "layer" } = layer;
  return src ? (
    <TexturedLayer src={src} depth={depth} scale={scale} x={x} y={y} />
  ) : (
    <PlaceholderLayer label={label} depth={depth} scale={scale} x={x} y={y} accent={accent} />
  );
}

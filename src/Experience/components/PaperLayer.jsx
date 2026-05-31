import { useTexture, Html } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";
import { asset } from "../../config/assets.js";
import { WORLD } from "../layout.js";

// One flat cutout on a plane. Width is derived from the image aspect ratio so
// art never stretches. Layers sit at different local Z (`depth`) within their
// section group, and the real perspective camera turns that into parallax.

const SHADOW_COLOR = "#2b2118";

function TexturedLayer({
  src,
  depth,
  scale,
  x,
  y,
  rotationX,
  rotationY,
  rotationZ,
  flipX,
  shadow,
  shadowOpacity,
  shadowX,
  shadowY,
  shadowScale,
  shadowDepthOffset,
  shadowAlphaTest,
  contactShadow,
  contactShadowOpacity,
  contactShadowX,
  contactShadowY,
  contactShadowZ,
  contactShadowScaleX,
  contactShadowScaleZ,
  contactShadowWidth,
  contactShadowDepth,
}) {
  const texture = useTexture(asset(src));

  const [w, h] = useMemo(() => {
    const img = texture.image;
    const aspect = img && img.width ? img.width / img.height : 1;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    return [scale * aspect, scale];
  }, [texture, scale]);

  const contactW = contactShadowWidth ?? Math.max(0.34, w * contactShadowScaleX);
  const contactD = contactShadowDepth ?? Math.max(0.18, scale * contactShadowScaleZ);

  return (
    <group>
      {contactShadow ? (
        <mesh
          position={[x + contactShadowX, contactShadowY, depth + contactShadowZ]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[contactW, contactD, 1]}
          renderOrder={0}
        >
          <circleGeometry args={[0.5, 32]} />
          <meshBasicMaterial
            color={SHADOW_COLOR}
            transparent
            opacity={contactShadowOpacity}
            depthWrite={false}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      ) : null}
      {shadow ? (
        <mesh
          position={[x + shadowX, y + shadowY, depth - shadowDepthOffset]}
          rotation={[rotationX, rotationY, rotationZ]}
          scale={[flipX ? -shadowScale : shadowScale, shadowScale, 1]}
          renderOrder={1}
        >
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial
            color={SHADOW_COLOR}
            map={texture}
            transparent
            opacity={shadowOpacity}
            alphaTest={shadowAlphaTest}
            depthWrite={false}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      ) : null}
      <mesh
        position={[x, y, depth]}
        rotation={[rotationX, rotationY, rotationZ]}
        scale={[flipX ? -1 : 1, 1, 1]}
        renderOrder={2}
      >
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.5}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
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
  const {
    src,
    depth = 0,
    scale = 3,
    x = 0,
    y = 0,
    rotationX = 0,
    rotationY = 0,
    rotationZ = 0,
    flipX = false,
    shadow = false,
    shadowOpacity = 0.18,
    shadowX = 0.08,
    shadowY = -0.08,
    shadowScale = 1.015,
    shadowDepthOffset = 0.035,
    shadowAlphaTest = 0.28,
    contactShadow = false,
    contactShadowOpacity = 0.18,
    contactShadowX = 0,
    contactShadowY = WORLD.floorY + 0.026,
    contactShadowZ = 0.08,
    contactShadowScaleX = 0.56,
    contactShadowScaleZ = 0.13,
    contactShadowWidth,
    contactShadowDepth,
    label = "layer",
  } = layer;
  return src ? (
    <TexturedLayer
      src={src}
      depth={depth}
      scale={scale}
      x={x}
      y={y}
      rotationX={rotationX}
      rotationY={rotationY}
      rotationZ={rotationZ}
      flipX={flipX}
      shadow={shadow}
      shadowOpacity={shadowOpacity}
      shadowX={shadowX}
      shadowY={shadowY}
      shadowScale={shadowScale}
      shadowDepthOffset={shadowDepthOffset}
      shadowAlphaTest={shadowAlphaTest}
      contactShadow={contactShadow}
      contactShadowOpacity={contactShadowOpacity}
      contactShadowX={contactShadowX}
      contactShadowY={contactShadowY}
      contactShadowZ={contactShadowZ}
      contactShadowScaleX={contactShadowScaleX}
      contactShadowScaleZ={contactShadowScaleZ}
      contactShadowWidth={contactShadowWidth}
      contactShadowDepth={contactShadowDepth}
    />
  ) : (
    <PlaceholderLayer label={label} depth={depth} scale={scale} x={x} y={y} accent={accent} />
  );
}

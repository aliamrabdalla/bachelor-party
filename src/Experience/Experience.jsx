import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import Scene from "./Scene.jsx";
import { useCurveProgressStore } from "../store/useCurveProgressStore";
import { useExperienceStore } from "../store/useExperienceStore";
import { setLenis } from "../lib/lenis.js";

// Smooth, INFINITE scroll: a tall invisible div makes the page scrollable; Lenis
// reports normalized progress (0..1, wrapping forever) which we push into the
// store for the camera to consume. The 3D canvas itself is fixed full-screen.
export default function Experience() {
  const setScrollProgress = useCurveProgressStore((s) => s.setScrollProgress);
  const isExperienceReady = useExperienceStore((s) => s.isExperienceReady);
  const openPanel = useExperienceStore((s) => s.openPanel);
  const [lenisRef, setLenisRef] = useState(null);

  // Start every visit at the groom-and-bride quarter instead of restoring an
  // old scroll position from the browser.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    setScrollProgress(0);
    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, [setScrollProgress]);

  // Lock scrolling until the user enters, and while a panel is open.
  useEffect(() => {
    const lenis = lenisRef?.lenis;
    if (!lenis) return;
    if (isExperienceReady && !openPanel) lenis.start();
    else lenis.stop();
  }, [isExperienceReady, openPanel, lenisRef]);

  // Drive Lenis from the GSAP ticker and forward progress to the store.
  useEffect(() => {
    const lenis = lenisRef?.lenis;
    if (!lenis) return;

    setLenis(lenis);
    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);

    const onScroll = (e) => setScrollProgress(e.progress);
    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(update);
    };
  }, [lenisRef, setScrollProgress]);

  return (
    <ReactLenis
      ref={setLenisRef}
      root
      options={{ autoRaf: false, infinite: true, syncTouch: true }}
    >
      <Canvas
        id="canvas-container"
        style={{ position: "fixed", inset: 0 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#1a1410"]} />
        <Scene />
      </Canvas>
      {/* Invisible scroll track — its height sets how far one loop takes. */}
      <div style={{ height: "600vh", width: "100%", pointerEvents: "none" }} />
    </ReactLenis>
  );
}

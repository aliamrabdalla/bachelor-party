import { create } from "zustand";
import { createCurves } from "../Experience/components/Curves.js";

// scrollProgress is 0..1 around the loop, fed by Lenis (infinite). The camera and
// any path-following objects sample the shared curves at this value each frame.
export const useCurveProgressStore = create((set) => ({
  curves: createCurves(),
  scrollProgress: 0,
  setScrollProgress: (value) => set({ scrollProgress: value }),
}));

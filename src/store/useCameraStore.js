import { create } from "zustand";

// Camera zoom, driven by the ZoomSlider and read by CustomCamera each frame.
// 1 = the default framing tuned in layout.js (whole diorama + floor in view);
// > 1 zooms in, < 1 zooms out further.
export const ZOOM = { min: 0.6, max: 2, default: 1.22, step: 0.01 };

export const useCameraStore = create((set) => ({
  zoom: ZOOM.default,
  setZoom: (zoom) => set({ zoom }),
}));

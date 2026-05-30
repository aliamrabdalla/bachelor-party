import { create } from "zustand";

// Lifecycle + UI flags shared across the canvas and the DOM overlay.
export const useExperienceStore = create((set) => ({
  isExperienceReady: false, // user clicked "Enter", loading screen gone
  isSceneReady: false, // R3F scene mounted + first assets resolved
  openPanel: null, // section key whose info panel is open, or null
  setIsExperienceReady: (b) => set({ isExperienceReady: b }),
  setIsSceneReady: (b) => set({ isSceneReady: b }),
  setOpenPanel: (key) => set({ openPanel: key }),
}));

import { create } from "zustand";

const MOBILE_MAX = 764;

export const useResponsiveStore = create((set) => ({
  isMobile: typeof window !== "undefined" && window.innerWidth < MOBILE_MAX,
}));

if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    useResponsiveStore.setState({ isMobile: window.innerWidth < MOBILE_MAX });
  });
}

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this project under https://<user>.github.io/bachelor-party/
// so production assets must be referenced from that subpath. Dev stays at root.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/bachelor-party/" : "/",
  plugins: [react()],
}));

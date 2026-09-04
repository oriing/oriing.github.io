import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { sites } from "./build/sites-vite-plugin";

export default defineConfig({
  base: "./",
  plugins: [react(), sites()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname),
    },
  },
  server: {
    host: "0.0.0.0",
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});

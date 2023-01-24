import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: resolve(__dirname, "./dist"),
    assetsDir: "assets",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        register: resolve(__dirname, "./userRegistrationPage/index.html"),
      },
      output: {
        entryFileNames: "static/assets/frontend-[name].js",
        chunkFileNames: "static/assets/frontend-[name].js",
        assetFileNames: "static/assets/frontend-[name].[ext]",
      },
    },
    manifest: true,
  },
  resolve: {
    alias: {
      Assets: resolve(__dirname, "./assets"),
    },
  },
  plugins: [
    react(),
  ],
});

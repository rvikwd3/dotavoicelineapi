import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "static/assets/obsBrowserSource-[name].js",
        chunkFileNames: "static/assets/obsBrowserSource-[name].js",
        assetFileNames: "static/assets/obsBrowserSource-[name].[ext]",
      }
    },
    manifest: true,
  },
  plugins: [],
})
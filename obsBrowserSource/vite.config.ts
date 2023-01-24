import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/obsBrowserSource-[name].js",
        chunkFileNames: "assets/obsBrowserSource-[name].js",
        assetFileNames: "assets/obsBrowserSource-[name].[ext]",
      }
    },
    manifest: true,
  },
  plugins: [],
})
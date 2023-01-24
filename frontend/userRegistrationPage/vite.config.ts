import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: resolve(__dirname, '../dist/registrationPage'),
  },
  resolve: {
    alias: {
      'Assets': resolve(__dirname, '../assets')
    },
  },
  plugins: [react()],
})

import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tsconfigPaths()],
  build: {
    target: 'esnext',
    outDir: '../../../dashboard',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'main.html'),
        settings: resolve(__dirname, 'settings.html'),
        showcase: resolve(__dirname, 'showcase.html'),
        panel1: resolve(__dirname, 'panel1.html'),
        panel2: resolve(__dirname, 'panel2.html'),
        panel3: resolve(__dirname, 'panel3.html'),
      },
    },
  },
})

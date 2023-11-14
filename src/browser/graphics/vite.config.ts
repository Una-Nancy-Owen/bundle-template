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
    outDir: '../../../graphics',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        square_one: resolve(__dirname, 'square_one.html'),
        square_two: resolve(__dirname, 'square_two.html'),
        square_four: resolve(__dirname, 'square_four.html'),
        wide_one: resolve(__dirname, 'wide_one.html'),
        wide_two: resolve(__dirname, 'wide_two.html'),
        wide_four: resolve(__dirname, 'wide_four.html'),
        standby: resolve(__dirname, 'standby.html'),
      },
    },
  },
})

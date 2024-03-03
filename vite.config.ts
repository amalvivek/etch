import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
import vitePluginSingleSpa from 'vite-plugin-single-spa'
import vercel from 'vite-plugin-vercel'

const plugins: any[] = [tailwindcss]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginSingleSpa({
      type: 'mife',
      serverPort: 3003
    }),
    vercel()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins
    }
  },
  server: {
    hmr: false
  },
  base: 'http://localhost:3003'
})

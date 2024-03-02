import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
import vitePluginSingleSpa from 'vite-plugin-single-spa'
import { configDefaults } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginSingleSpa({
      type: 'mife',
      serverPort: 3003
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss]
    }
  },
  server: {
    hmr: false
  },
  base: 'http://localhost:3003'
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import daisyui from "daisyui"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  server: {
    watch: {
      usePolling: true
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 3000, 
    proxy: {
      '/api': {
        target: 'https://task-server-3rjgxneb5q-ue.a.run.app',
        secure: false, 
        changeOrigin: true,
      },
    },
  },
})

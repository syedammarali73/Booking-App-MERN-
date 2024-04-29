import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
      target: 'http://localhost:7000/api',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },

  plugins: [react()],
})

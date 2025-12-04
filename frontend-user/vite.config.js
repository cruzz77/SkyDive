import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],



  server: {
    proxy: {
      '/api': {
        target: 'https://skydive-backend-qzsl.onrender.com',
        secure: false,
        changeOrigin: true,
      }
    }
  }
})

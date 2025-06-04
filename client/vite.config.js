import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    // For local dev: default is localhost (127.0.0.1)
    host: 'localhost',  
    port: 3000
  },
  build: {
    // Explicit output folder for production build
    outDir: 'dist'
  }
})

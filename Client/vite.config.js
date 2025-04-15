import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // ← allows access from anywhere
    port: 3000        // ← make sure it matches what's exposed in docker-compose
  }
})

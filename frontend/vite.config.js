import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true, // Allows any external host (fixes the Cloudflare block)
    // cors: true,         // Enables CORS for all origins
  },//tbh cors not for same origin of code sentby vite requesting be(self proving as be cors needed) and also that code doesnt request vite itself self-origin lol not in anycase
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // This exposes the Vite server to the external network
    port: process.env.PORT || 5173, // Ensure it uses the correct port (dynamic if needed)
  },
});

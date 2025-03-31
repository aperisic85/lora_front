import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
  allowedHosts: ['all','https://ina.plovput.hr'],
  port: 3001,},
  
  plugins: [react()],
})

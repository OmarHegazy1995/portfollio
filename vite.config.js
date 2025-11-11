import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfollio/'   // مهم جدًا، لازم يكون مطابق لاسم الريبو على GitHub
})

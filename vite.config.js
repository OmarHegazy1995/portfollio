import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfollio/' // مهم جدًا، لازم يكون مطابق لاسم الريبو
})

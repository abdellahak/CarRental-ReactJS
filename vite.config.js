import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// const flowbite = require("flowbite-react/tailwind");
// https://vite.dev/config/
export default defineConfig({
  // content : [flowbite.content()],
  plugins: [react(), tailwindcss()],
  // plugins: [react(), tailwindcss(), flowbite.plugin()],
  // plugins: {'@tailwindcss/postcss': {}},
  // plugins: [react()],
})

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// const flowbite = require("flowbite-react/tailwind");
// https://vite.dev/config/
export default defineConfig({
  // content : [flowbite.content()],
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // plugins: [react(), tailwindcss(), flowbite.plugin()],
  // plugins: {'@tailwindcss/postcss': {}},
  // plugins: [react()],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/users": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/companies": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/questions": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/admin": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/bookmarks": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/notifications": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
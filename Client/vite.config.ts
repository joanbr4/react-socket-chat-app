import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/login": "http://localhost:4000/api",
      "/logout": "http://localhost:4000/api",
      "/landing": "http://localhost:4000/api",
      "/register": "http://localhost:4000/api",
      "/chat/": "http://localhost:4000/api",
      "/search/": "http://localhost:4000/api",
      "/rooms/": "http://localhost:4000/api",
      "/sessions/": "http://localhost:4000/api",
      "/auth/": "http://localhost:4000/api",
    },
  },
})

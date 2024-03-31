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
      // "/chat/:owner/:with": "http://localhost:4000/api",
      // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      "/socket.io": {
        target: "http://localhost:4000",
        ws: true,
      },
    },
  },
})

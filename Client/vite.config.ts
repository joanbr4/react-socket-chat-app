import { loadEnv } from "vite"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""))

  const isDocker = process.env.VITE_DOCKER

  return {
    plugins: [react()],
    server: {
      //Dockerize a vite, specifing ports, etc
      port: 5173,
      host: true,
      // strictPort: true,
      // origin: "http://0.0.0.0:5173",
      //For windows and had hot reloads doesn't work
      watch: {
        usePolling: true,
      },
      proxy: {
        ...(isDocker && {
          // Proxy to server Container
          "/login": "http://server:4000/api",
          "/logout": "http://server:4000/api",
          "/landing": "http://server:4000/api",
          "/register": "http://server:4000/api",
          "/chat/": "http://server:4000/api",
          "/search/": "http://server:4000/api",
          "/rooms/": "http://server:4000/api",
          "/sessions/": "http://server:4000/api",
          "/auth/": "http://server:4000/api",
        }),
        ...(!isDocker && {
          "/login": "http://localhost:4000/api",
          "/logout": "http://localhost:4000/api",
          "/landing": "http://localhost:4000/api",
          "/register": "http://localhost:4000/api",
          "/chat/": "http://localhost:4000/api",
          "/search/": "http://localhost:4000/api",
          "/rooms/": "http://localhost:4000/api",
          "/sessions/": "http://localhost:4000/api",
          "/auth/": "http://localhost:4000/api",
        }),
      },
    },
  }
})

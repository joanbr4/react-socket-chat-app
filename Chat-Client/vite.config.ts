import { defineConfig, loadEnv } from "vite"
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

      // "/chat/:owner/:with": "http://localhost:4000/api",
      // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io

      // "/socket.io": {
      //   target: "http://localhost:4000",
      //   ws: true,
      // },
    },
  },
})
// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), "")
//   return {
//     define: {
//       "process.env.PORT": JSON.stringify(env.PORT),
//       "process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID": JSON.stringify(
//         env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
//       ),
//       "process.env.NEXT_PUBLIC_SERVER_ENDPOINT": JSON.stringify(
//         env.NEXT_PUBLIC_SERVER_ENDPOINT
//       ),
//       "process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL": JSON.stringify(
//         env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL
//       ),
//     },
//     plugins: [react()],
//     server: {
//       proxy: {
//         "/login": "http://localhost:4000/api",
//         "/logout": "http://localhost:4000/api",
//         "/landing": "http://localhost:4000/api",
//         "/register": "http://localhost:4000/api",
//         "/chat/": "http://localhost:4000/api",
//         "/search/": "http://localhost:4000/api",
//         "/rooms/": "http://localhost:4000/api",

//         // "/chat/:owner/:with": "http://localhost:4000/api",
//         // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io

//         // "/socket.io": {
//         //   target: "http://localhost:4000",
//         //   ws: true,
//         // },
//       },
//     },
//   }
// })

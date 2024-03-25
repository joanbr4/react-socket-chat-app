// import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, Router } from "react-router-dom"
import router from "./App.tsx"

import "./index.css"
import { UserProvider } from "./routes/UserContext.tsx"

export function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
      {/* <Router>{router}</Router> */}
    </UserProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root")!)
root.render(<App />)
// root.render(<RouterProvider router={router} />)

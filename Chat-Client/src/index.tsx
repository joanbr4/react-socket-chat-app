// import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import router from "./setup/App.tsx"

import "./assets/index.css"
import { UserProvider } from "./pages/layouts/UserContext.tsx"

export function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root")!)
root.render(<App />)

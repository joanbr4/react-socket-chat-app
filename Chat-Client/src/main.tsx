// import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import router from "./App.tsx"

import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root")!)
root.render(<RouterProvider router={router} />)

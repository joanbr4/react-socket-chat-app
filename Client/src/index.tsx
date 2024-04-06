import ReactDOM from "react-dom/client"
import { Route, RouterProvider, Routes } from "react-router-dom"
import router from "./setup/App.tsx"

import "./assets/index.css"
import { UserProvider } from "./pages/layouts/UserContext.tsx"
// import { ErrorBoundary } from "./pages/errors/ErrorBoundary.tsx"
import { StrictMode } from "react"
import { HomeLayout } from "./pages/layouts/HomeLayout.tsx"
import { Landing, action as landingAction } from "./pages/landing.tsx"
import { PublicRoute } from "./setup/FilteredRoutes.tsx"
import { GoogleOAuthProvider } from "@react-oauth/google"
// import App from "./setup/App.tsx"

// function ErrorScreen() {}

// function TheRouter(props: { children: ReactNode }) {
//   return <BrowserRouter>{props.children}</BrowserRouter> //Not possible a createBrowserRouter withing BrowserRouter
// }

export function Api() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        {/* pages */}
        <Route
          path="/"
          // element={<Landing />}
          // errorELement={<ErrorPage />}
          element={<PublicRoute element={<Landing />} />}
          action={landingAction}
        />
      </Route>
    </Routes>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root")!)
// root.render(<Api />)
root.render(
  <StrictMode>
    <UserProvider>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      >
        {/* <RouterProvider> */}
        {/* <TheRouter> */}
        {/* <Api /> */}
        <RouterProvider router={router} />
        {/* </TheRouter> */}
        {/* </RouterProvider> */}
      </GoogleOAuthProvider>
    </UserProvider>
  </StrictMode>
)

// import { useState } from "react"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import "./App.css"
import { Register, action as registerAction } from "./routes/register"
import {
  MainLayout,
  // action as landingAction,
  loader as landingLoader,
} from "./routes/layout"
import { Sala, action as salaAction } from "./routes/sala"
import { Landing, action as homeAction } from "./routes/landing"
// import { Navigation, action as navigationACtion } from "./routes/navigation"
import { PublicRoute, PrivateRoute } from "./routes/managinRoutes"
import { Home, loader as homeLoader } from "./routes/home"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route element={<MainLayout />} errorELements={<ErrorPage />} /> */}
      <Route
        element={<MainLayout />}
        loader={landingLoader}
        // action={landingAction}
      >
        <Route
          path="/"
          element={<Landing />}
          // element={<PublicRoute element={<Home />} />}
          // action={landingAction}
          action={homeAction}
          // loader={gameLoader}
        />
        <Route
          path="/sala/:id"
          element={<Sala />}
          // element={<PublicRoute element={<Sala />} />}
          action={salaAction}
          // loader={gameLoader}
        />
        <Route
          path="/home"
          element={<Home />}
          // element={<PrivateRoute element={<Sala />} />}
          action={salaAction}
          loader={homeLoader}
        />
      </Route>
      {/* <Route element={<Navigation />} action={navigationACtion} /> */}
      <Route path="/signIn" element={<Register />} action={registerAction} />
    </>
  )
)

export default router

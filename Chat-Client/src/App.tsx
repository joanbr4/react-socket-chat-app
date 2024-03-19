// import { useState } from "react"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./App.css";
import { Register, action as registerAction } from "./routes/register";
import {
  MainLayout,
  // action as landingAction,
  loader as landingLoader,
} from "./routes/layout";
import { Sala, action as salaAction } from "./routes/sala";
import { Home, action as homeAction } from "./routes/home";
// import { Navigation, action as navigationACtion } from "./routes/navigation"
import { PublicRoute, PrivateRoute } from "./routes/managinRoutes";

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
          element={<Home />}
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
          path="/user"
          element={<Sala />}
          // element={<PrivateRoute element={<Sala />} />}
          action={salaAction}
          // loader={gameLoader}
        />
      </Route>
      {/* <Route element={<Navigation />} action={navigationACtion} /> */}
      <Route path="/signIn" element={<Register />} action={registerAction} />
    </>
  )
);

export default router;

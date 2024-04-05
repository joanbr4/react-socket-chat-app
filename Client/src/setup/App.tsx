import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import "../assets/App.css"
import { Register, action as registerAction } from "../pages/register"
import { HomeLayout } from "../pages/layouts/HomeLayout"
import { Sala, action as salaAction } from "../pages/sala"
import { Landing, action as landingAction } from "../pages/landing"
import { PublicRoute, PrivateRoute } from "./FilteredRoutes"
import { Home, loader as homeLoader } from "../pages/home"
import { Chat, loader as loaderChat } from "../pages/chat"
import { ListUsers } from "../pages/listUsers"
import { NotFoundPage } from "../pages/errors/NotFoundPage"
import { ErrorBoundary } from "../pages/errors/ErrorBoundary"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<HomeLayout />} errorElement={<ErrorBoundary />}>
        {/* pages */}
        <Route
          path="/"
          // element={<Landing />}
          // errorELement={<ErrorPage />}
          element={<PublicRoute element={<Landing />} />}
          action={landingAction}
        />
        <Route
          path="/sala/:id"
          element={<PublicRoute element={<Sala />} />}
          action={salaAction}
        />
        <Route
          path="/home"
          // element={<Home />}
          element={<PrivateRoute element={<Home />} />}
          loader={homeLoader}
        >
          <Route
            path="/home/browse"
            element={<ListUsers />}
            loader={loaderChat}
          />
          <Route
            path="/home/chat/:user"
            element={<Chat />}
            loader={loaderChat}
          />
        </Route>
      </Route>
      <Route path="/signIn" element={<Register />} action={registerAction} />

      {/* other */}
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
)

export default router

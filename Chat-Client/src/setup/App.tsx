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
// import { Navigation, action as navigationACtion } from "./routes/navigation"
import { PublicRoute, PrivateRoute } from "./managinRoutes"
import { Home, loader as homeLoader, action as homeAction } from "../pages/home"
import { Chat, loader as loaderChat } from "../pages/chat"
import { ListUsers } from "../pages/listUsers"
// import { UserProvider } from "./routes/UserContext"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route element={<MainLayout />} errorELements={<ErrorPage />} /> */}
      <Route
        element={<HomeLayout />}
        // loader={landingLoader}
        // action={landingAction}
      >
        <Route
          path="/"
          element={<Landing />}
          // element={<PublicRoute element={<Home />} />}
          // action={landingAction}
          action={landingAction}
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
          // path="/home/:user"
          element={<Home />}
          // element={<PrivateRoute element={<Sala />} />}
          action={homeAction}
          loader={homeLoader}
        >
          <Route
            path="/home/browse/"
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
      {/* <Route element={<Navigation />} action={navigationACtion} /> */}
      <Route path="/signIn" element={<Register />} action={registerAction} />
    </>
  )
)

export default router

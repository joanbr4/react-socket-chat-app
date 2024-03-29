import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./App.css";
import { Register, action as registerAction } from "./routes/register";
import { MainLayout } from "./routes/layout";
import { Sala, action as salaAction } from "./routes/sala";
import { Landing, action as landingAction } from "./routes/landing";
// import { Navigation, action as navigationACtion } from "./routes/navigation"
import { PublicRoute, PrivateRoute } from "./routes/managinRoutes";
import {
  Home,
  loader as homeLoader,
  action as homeAction,
} from "./routes/home";
import { Chat, loader as loaderChat } from "./routes/chat";
// import { UserProvider } from "./routes/UserContext"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route element={<MainLayout />} errorELements={<ErrorPage />} /> */}
      <Route
        element={<MainLayout />}
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
          <Route path="/home/:user" element={<Chat />} loader={loaderChat} />
        </Route>
      </Route>
      {/* <Route element={<Navigation />} action={navigationACtion} /> */}
      <Route path="/signIn" element={<Register />} action={registerAction} />
    </>
  )
);

export default router;

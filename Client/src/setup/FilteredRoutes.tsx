import { ReactNode, useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { UserContext } from "../pages/layouts/UserContext"

export const PrivateRoute = ({ element }: { element: ReactNode }) => {
  // const location = useLocation()
  // console.log("email", location.state?.email)
  const { userRef } = useContext(UserContext) ?? {}

  return userRef?.current != null ? (
    element || <Outlet />
  ) : (
    <Navigate to="/signIn" replace />
  )
}

export const PublicRoute = ({ element }: { element: ReactNode }) => {
  const { userRef } = useContext(UserContext) ?? {}
  return userRef?.current != null
    ? element || <Outlet />
    : element || <Outlet />
  // <Navigate to="/" replace />
}

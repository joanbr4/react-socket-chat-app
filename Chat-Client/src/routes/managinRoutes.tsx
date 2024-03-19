import { Outlet, Navigate, useOutletContext } from "react-router-dom";

export const PrivateRoute = ({ element }) => {
  const session = useOutletContext(); //
  return session.data ? element || <Outlet /> : <Navigate to="/" replace />;
};

export const PublicRoute = ({ element }) => {
  const session = useOutletContext();
  return session.data ? element || <Outlet /> : <Navigate to="/" replace />;
};

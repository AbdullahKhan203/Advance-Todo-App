import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {

  const token = localStorage.getItem("token");

  return token ? <Navigate to="/table" /> : <Outlet />;
}

export default PublicRoute;
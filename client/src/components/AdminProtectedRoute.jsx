import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AdminProtectedRoute() {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {

    const decoded = jwtDecode(token);

    if (decoded.role !== "admin") {
      return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;

  } catch (error) {

    return <Navigate to="/login" />;

  }

}

export default AdminProtectedRoute;
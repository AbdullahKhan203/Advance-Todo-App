// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }){

//   const token = localStorage.getItem("token");

//   if(!token){
//     return <Navigate to="/login" />;
//   }

//   return children;
// }



import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {

  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
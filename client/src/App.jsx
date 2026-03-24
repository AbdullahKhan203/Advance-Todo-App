import { Routes, Route } from "react-router-dom";
import './App.css'
import Table from './pages/table/table.jsx'
import Form from './pages/form/formPage.jsx'
import Register from './pages/register/register.jsx'
import NotFound from './pages/not-found.jsx'
import Login from './pages/login/login.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
// import { db } from "./../src/firebase.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  // console.log("db in app.js",db);
  
  return (
    <>
        <Routes>

        {/* Public Routes */}
        <Route element={<PublicRoute />}>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Route>


        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          <Route path="/table" element={<Table />} />
          <Route path="/form" element={<Form />} />

        </Route>


          <Route path="*" element={<NotFound />} />
      </Routes>

        <ToastContainer 
        position="top-right"
        autoClose={3000}
      />



    </>
  )
}

export default App

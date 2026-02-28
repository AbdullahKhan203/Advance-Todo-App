import { Routes, Route } from "react-router-dom";
import './App.css'
import Table from './pages/table/table.jsx'
import Form from './pages/form/formPage.jsx'
import { db } from "./../src/firebase.js";


function App() {
  console.log("db in app.js",db);
  
  return (
    <>
    {/* <Table /> */}
    {/* <Form /> */}
    <Routes>
      <Route path="/" element={<Table />} />
      <Route path="/formPage" element={<Form />} />
    </Routes>
    </>
  )
}

export default App

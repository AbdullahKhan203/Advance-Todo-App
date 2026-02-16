import { Routes, Route } from "react-router-dom";
import './App.css'
import Table from './pages/table/table.jsx'
import Form from './pages/form/formPage.jsx'

function App() {

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

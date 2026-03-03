// import React, { useState } from "react";
// import Form from 'react-bootstrap/Form';

// export default function FormPage() {
//    const [data,setData]=useState({
//     title:"",
//     description:"",
//     location:"",
//     email:"",
//     status:"",
//     catagory:"",
//     priority:"",
//     time:"",
//    })

// const statusOptions=[
//     {value:"pending",label:"Pending"},
//     {value:"inProgress",label:"In Progress"},
//     {value:"done",label:"Done"},
// ]
// const catagoryOptions=[
//     {value:"personal",label:"Personal"},
//     {value:"delegate",label:"Delegate"},
// ]
// const priorotyOptions=[
//     {value:"low",label:"Low"},
//     {value:"medium",label:"Medium"},
//     {value:"high",label:"High"},
// ]


//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };
 
// let todos=JSON.parse(localStorage.getItem('myTodoTask')) || []
 
//   const handleSubmit = (event) => {
//     event.preventDefault();
    
//     console.log(data);
//     todos.push(data)
//     localStorage.setItem("myTodoTask",JSON.stringify(todos))

//    setData({
//   title: "",
//   description: "",
//   location: "",
//   email: "",
//   status: "",
//   catagory: "",
//   priority: "",
//   time: "",
// });
    
//   };
    
//   return (
//     <div className="min-h-screen flex flex-col items-center gap-4">
//       <h1 className="text-center text-3xl font-bold mt-4">Enter Todo Here</h1>
//       <form
//         className="bg-gray-100 w-[90%] p-4 rounded-2xl flex flex-col gap-2"
//         onSubmit={handleSubmit}
//       >
//         <div>
//           <Form.Control className="font-bold" htmlFor="title">
//             Title
//           </Form.Control>
//           <br />
//           <input
//             className="border-none focus:outline-none w-full bg-white px-2"
//             type="text"
//             name="title"
//             id="title"
//             placeholder="enter title"
//             value={data.title}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label className="font-bold" htmlFor="description">
//             Description
//           </label>
//           <br />
//           <input
//             className="border-none focus:outline-none w-full bg-white px-2"
//             type="text"
//             name="description"
//             id="description"
//             placeholder="enter description"
//             value={data.description}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label className="font-bold" htmlFor="location">
//             Location
//           </label>
//           <br />
//           <input
//             className="border-none focus:outline-none w-full bg-white px-2"
//             type="text"
//             name="location"
//             id="location"
//             placeholder="enter location"
//             value={data.location}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label className="font-bold" htmlFor="email">
//             Email
//           </label>
//           <br />
//           <input
//             className="border-none focus:outline-none w-full bg-white px-2"
//             type="text"
//             name="email"
//             id="email"
//             placeholder="enter email"
//             value={data.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label className="font-bold" htmlFor="status">
//             Status
//           </label>
//           <br />
//           <select className="w-full bg-white" name="status" id="status" value={data.status} onChange={handleChange} required>
//             <option value="">Seletct Status</option>
//             {/* <option value="pending">Pending</option>
//             <option value="inProgress">In Progress</option>
//             <option value="done">Done</option> */}
//             {statusOptions.map((item,i)=>{
//              return <option value={item.value}>{item.label}</option>
//             })}
//           </select>
//         </div>
//          <div>
//           <label className="font-bold" htmlFor="catagory">
//             Catagory
//           </label>
//           <br />
//           <select className="w-full bg-white" name="catagory" id="catagory"  value={data.catagory}  onChange={handleChange} required>
//            <option value="">Seletct Catagory</option>
//     {/* <option value="personal">Personal</option>
//   <option value="delegated">Delegated</option> */}
//   {catagoryOptions.map((item)=>{
//  return <option value={item.value}>{item.label}</option>
//             })}
//           </select>
//         </div>
//         <div>
//           <label className="font-bold" htmlFor="priority">
//             Priority
//           </label>
//           <br />
//           <select className="w-full bg-white"  id="priority"  name="priority"  value={data.priority}  onChange={handleChange} required>
//             <option value="">Seletct priority</option>
//     {/* <option value="high">High</option>
//   <option value="low">Low</option>
//   <option value="medium">Medium</option> */}
//   {priorotyOptions.map((item)=>{
//  return <option value={item.value}>{item.label}</option>
//             })}
//           </select>
//         </div>
//         <div>
//           <label className="font-bold" htmlFor="time">
//             Time
//           </label>
//           <br />
//           <input
//             className="border-none focus:outline-none w-full bg-white px-2"
//             type="time"
//              name="time" 
//             id="time"
//             placeholder="enter email"
//             value={data.time}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <button className="w-full bg-green-400 rounded">Save</button>
//         </div>
//       </form>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom';

// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../../firebase.js";

// export default function FormPage() {
//   const navigate = useNavigate();
//   const [data, setData] = useState({
//     title: "",
//     description: "",
//     id:"",
//     location: "",
//     email: "",
//     status: "",
//     catagory: "",
//     priority: "",
//     time: "",
//   });

//   const statusOptions = [
//     { value: "pending", label: "Pending" },
//     { value: "inProgress", label: "In Progress" },
//     { value: "done", label: "Done" },
//   ];

//   const catagoryOptions = [
//     { value: "personal", label: "Personal" },
//     { value: "delegate", label: "Delegate" },
//   ];

//   const priorityOptions = [
//     { value: "low", label: "Low" },
//     { value: "medium", label: "Medium" },
//     { value: "high", label: "High" },
//   ];

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   let todos = JSON.parse(localStorage.getItem("myTodoTask")) || [];

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     data.id=crypto.randomUUID();
// //     console.log(data);
// //     todos.push(data);
// //     localStorage.setItem("myTodoTask", JSON.stringify(todos));

// //     // reset state
// //     setData({
// //       title: "",
// //       description: "",
// //       location: "",
// //       email: "",
// //       status: "",
// //       catagory: "",
// //       priority: "",
// //       time: "",
// //     });
// // navigate('/')
// //   };

// const handleSubmit = async (event) => {
//   event.preventDefault();

//   try {
//     await addDoc(collection(db, "todos"), {
//       title: data.title,
//       description: data.description,
//       location: data.location,
//       email: data.email,
//       status: data.status,
//       catagory: data.catagory,
//       priority: data.priority,
//       time: data.time,
//       createdAt: new Date()
//     });

//     alert("Todo saved to Firestore!");

//     // reset form
//     setData({
//       title: "",
//       description: "",
//       location: "",
//       email: "",
//       status: "",
//       catagory: "",
//       priority: "",
//       time: "",
//     });

//     navigate("/");
//   } catch (error) {
//     console.error("Error adding document:", error);
//   }
// };

//   return (
//     <Container fluid className="min-h-full w-full d-flex flex-column align-items-center py-2 bg-[#D3D3D3]">
//       <h1 className="text-center text-3xl mb-2">Enter Todo Here</h1>
//       <Form
//         className="p-4 bg-light rounded-3  w-[90%] shadow-xl"
//         // style={{ maxWidth: "600px" }}
//         onSubmit={handleSubmit}
//       >
//         <Form.Group className="mb-1" controlId="title">
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter title"
//             name="title"
//             value={data.title}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-1" controlId="description">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter description"
//             name="description"
//             value={data.description}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-1" controlId="location">
//           <Form.Label>Location</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter location"
//             name="location"
//             value={data.location}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-1" controlId="email">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             name="email"
//             value={data.email}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-1" controlId="status">
//           <Form.Label>Status</Form.Label>
//           <Form.Select
//             name="status"
//             value={data.status}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Status</option>
//             {statusOptions.map((item, i) => (
//               <option key={i} value={item.value}>
//                 {item.label}
//               </option>
//             ))}
//           </Form.Select>
//         </Form.Group>

//         <Form.Group className="mb-1" controlId="catagory">
//           <Form.Label>Category</Form.Label>
//           <Form.Select
//             name="catagory"
//             value={data.catagory}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Category</option>
//             {catagoryOptions.map((item, i) => (
//               <option key={i} value={item.value}>
//                 {item.label}
//               </option>
//             ))}
//           </Form.Select>
//         </Form.Group>

//         <Form.Group className="mb-1" controlId="priority">
//           <Form.Label>Priority</Form.Label>
//           <Form.Select
//             name="priority"
//             value={data.priority}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Priority</option>
//             {priorityOptions.map((item, i) => (
//               <option key={i} value={item.value}>
//                 {item.label}
//               </option>
//             ))}
//           </Form.Select>
//         </Form.Group>

//         <Form.Group className="mb-1" controlId="time">
//           <Form.Label>Time</Form.Label>
//           <Form.Control
//             type="time"
//             name="time"
//             value={data.time}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Button variant="success" type="submit" className="w-100">
//           Save
//         </Button>
//       </Form>
//     </Container>
//   );
// }









import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase.js";

export default function FormPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
    id:"",
    location: "",
    email: "",
    status: "",
    catagory: "",
    priority: "",
    time: "",
  });

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "inProgress", label: "In Progress" },
    { value: "done", label: "Done" },
  ];

  const catagoryOptions = [
    { value: "personal", label: "Personal" },
    { value: "delegate", label: "Delegate" },
  ];

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  let todos = JSON.parse(localStorage.getItem("myTodoTask")) || [];

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     data.id=crypto.randomUUID();
//     console.log(data);
//     todos.push(data);
//     localStorage.setItem("myTodoTask", JSON.stringify(todos));

//     // reset state
//     setData({
//       title: "",
//       description: "",
//       location: "",
//       email: "",
//       status: "",
//       catagory: "",
//       priority: "",
//       time: "",
//     });
// navigate('/')
//   };

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    await addDoc(collection(db, "todos"), {
      title: data.title,
      description: data.description,
      location: data.location,
      email: data.email,
      status: data.status,
      catagory: data.catagory,
      priority: data.priority,
      time: data.time,
      createdAt: new Date()
    });

    alert("Todo saved to Firestore!");

    // reset form
    setData({
      title: "",
      description: "",
      location: "",
      email: "",
      status: "",
      catagory: "",
      priority: "",
      time: "",
    });

    navigate("/");
  } catch (error) {
    console.error("Error adding document:", error);
  }
};

  return (
    <Container fluid className="min-h-full w-full d-flex flex-column align-items-center py-2 bg-[#D3D3D3]">
      <h1 className="text-center text-3xl mb-2">Enter Todo Here</h1>
      <Form
        className="p-4 bg-light rounded-3  w-[90%] shadow-xl"
        // style={{ maxWidth: "600px" }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-1" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={data.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-1" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            name="description"
            value={data.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-1" controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            name="location"
            value={data.location}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-1" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-1" controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={data.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            {statusOptions.map((item, i) => (
              <option key={i} value={item.value}>
                {item.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-1" controlId="catagory">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="catagory"
            value={data.catagory}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {catagoryOptions.map((item, i) => (
              <option key={i} value={item.value}>
                {item.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-1" controlId="priority">
          <Form.Label>Priority</Form.Label>
          <Form.Select
            name="priority"
            value={data.priority}
            onChange={handleChange}
            required
          >
            <option value="">Select Priority</option>
            {priorityOptions.map((item, i) => (
              <option key={i} value={item.value}>
                {item.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-1" controlId="time">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={data.time}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Save
        </Button>
      </Form>
    </Container>
  );
}







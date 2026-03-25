import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import api from "../../api/api";
import { toast } from "react-toastify";


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

  // let todos = JSON.parse(localStorage.getItem("myTodoTask")) || [];

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
     console.log("data=>",data);
      
    //  api.post('http://localhost:4000/api/todo/create',data)

    const response = await api.post(
    "http://localhost:4000/api/todo/create",
    data
  );

  console.log("todo created successfully:", response.data);
 toast.success(response.data.success && "todo created successfully");
  // localStorage.setItem("token", response.data.accessTokens);

  // console.log("TOKEN SAVED:", localStorage.getItem("token"));

  navigate("/");

    
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

    navigate("/table");
  } catch (error) {
    toast.error("failed to add a todo");
    console.error("Error adding documents:", error);
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








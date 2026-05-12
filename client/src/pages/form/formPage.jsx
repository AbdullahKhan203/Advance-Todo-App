import React, { useState } from "react"; 
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import api from "../../api/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../../features/todo/todoThunk";
import * as Yup from "yup"; 

export default function FormPage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.todos);

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

  const [errors, setErrors] = useState({}); // ✅ added

  // ✅ Yup schema
  const schema = Yup.object({
    title: Yup.string().required("Title is required"),

    description: Yup.string()
      .min(5, "Description must be at least 5 characters")
      .required("Description is required"),

    location: Yup.string().required("Location is required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    status: Yup.string().required("Status is required"),
    catagory: Yup.string().required("Category is required"),
    priority: Yup.string().required("Priority is required"),

    time: Yup.string().required("Time is required"),
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

    // ✅ remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // ✅ validate before submit
      await schema.validate(data, { abortEarly: false });

      setErrors({});

      const result = await dispatch(createTodo(data));

      if (createTodo.fulfilled.match(result)){
        toast.success("Todo created successfully");
        navigate("/");

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

      } else {
        toast.error(result.payload || "Failed to add todo");
      }

    } catch (validationError){
      const newErrors = {};
      validationError.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };


const handleSaveClose = async () => {
  const ok = await saveTodo();
  if (ok) {
    navigate("/");
  }
};

const handleSaveStay = async () => {
  const ok = await saveTodo();
    if (ok) {
    toast.success("Saved (staying on form)");
  }
};

const handleSaveNext = async () => {
  const ok = await saveTodo();
  if (ok) {
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
  }
};


const saveTodo = async () => {
  try {
    const result = await dispatch(createTodo(data));

    if (createTodo.fulfilled.match(result)) {
      toast.success("Todo created successfully");
      return true;
    } else {
      toast.error(result.payload || "Failed to add todo");
      return false;
    }
  } catch (err) {
    toast.error("Something went wrong");
    return false;
  }
};


const handleWatchTable=()=>{
   try {
    navigate("/");
  } catch (err) {
    toast.error("Faied to go on talbe");
    return false;
  }
}


  return (
    <Container fluid className="min-h-full w-full d-flex flex-column align-items-center py-2 bg-[#D3D3D3]">
      <h1 className="text-center text-3xl mb-2">Enter Todo Here</h1>

      <Form className="p-4 bg-light rounded-3  w-[90%] shadow-xl" onSubmit={handleSubmit}>

        <Form.Group className="mb-1" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          {errors.title && <small className="text-danger">{errors.title}</small>}
        </Form.Group>

        <Form.Group className="mb-1" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
          {errors.description && <small className="text-danger">{errors.description}</small>}
        </Form.Group>

        <Form.Group className="mb-1" controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            name="location"
            value={data.location}
            onChange={handleChange}
          />
          {errors.location && <small className="text-danger">{errors.location}</small>}
        </Form.Group>

        <Form.Group className="mb-1" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </Form.Group>

        <Form.Group className="mb-1" controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Select name="status" value={data.status} onChange={handleChange}>
            <option value="">Select Status</option>
            {statusOptions.map((item, i) => (
              <option key={i} value={item.value}>
                {item.label}
              </option>
            ))}
          </Form.Select>
          {errors.status && <small className="text-danger">{errors.status}</small>}
        </Form.Group>

        <Form.Group className="mb-1" controlId="catagory">
          <Form.Label>Category</Form.Label>
          <Form.Select name="catagory" value={data.catagory} onChange={handleChange}>
            <option value="">Select Category</option>
            {catagoryOptions.map((item, i) => (
              <option key={i} value={item.value}>
                {item.label}
              </option>
            ))}
          </Form.Select>
          {errors.catagory && <small className="text-danger">{errors.catagory}</small>}
        </Form.Group>

        <Form.Group className="mb-1" controlId="priority">
          <Form.Label>Priority</Form.Label>
          <Form.Select name="priority" value={data.priority} onChange={handleChange}>
            <option value="">Select Priority</option>
            {priorityOptions.map((item, i) => (
              <option key={i} value={item.value}>
                {item.label}
              </option>
            ))}
          </Form.Select>
          {errors.priority && <small className="text-danger">{errors.priority}</small>}
        </Form.Group>

        <Form.Group className="mb-1" controlId="time">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={data.time}
            onChange={handleChange}
          />
          {errors.time && <small className="text-danger">{errors.time}</small>}
        </Form.Group>


<div className="d-flex gap-2 mt-3 justify-around flex-wrap">
  <Button
    variant="primary"
    type="button"
    onClick={handleSaveClose}
    disabled={loading}
  >
    {loading ? "Saving..." : "Save & Close"}
  </Button>

  <Button
    variant="success"
    type="button"
    onClick={handleSaveStay}
    disabled={loading}
  >
    {loading ? "Saving..." : "Save & Stay"}
  </Button>

  <Button
    variant="warning"
    type="button"
    onClick={handleSaveNext}
    disabled={loading}
  >
    {loading ? "Saving..." : "Save & Next"}
  </Button>
  <Button
    variant="secondary"
    type="button"
    onClick={handleWatchTable}
    disabled={loading}
  >
    {loading ? "Saving..." : "Redirect without Save"}
  </Button>
</div>

      </Form>
    </Container>
  );
}
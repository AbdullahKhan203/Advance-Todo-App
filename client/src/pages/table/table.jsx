import React, { useMemo, useState,useEffect } from "react";
import {
  FaRegEdit,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

import { MdDeleteOutline } from "react-icons/md";
import { CiBoxList, CiFilter, CiCircleMinus } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { Button, Container, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoGridOutline } from "react-icons/io5";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import api from "../../api/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodos, updateTodo } from "../../features/todo/todoThunk.js";

export default function Table(){
  const navigate = useNavigate();
  const itemsPerPage = 10;
  

  // const [todos, setTodos] = useState([])
 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [isGridView, setIsGridView] = useState(false);

  // filter states
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");

  // multi-delete states
  const [isMultiDelete, setIsMultiDelete] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState([]);

  // Edit modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedData, setEditedData] = useState({});

// asending order states
const [sortConfig, setSortConfig] = useState({
  key: null,
  direction: "asc",
});
useEffect(() => {
  const timer = setTimeout(() => {
    setSearchTerm2(searchTerm);
  }, 1000);

  return () => clearTimeout(timer);
}, [searchTerm]);

 const dispatch = useDispatch();
const { todos, totalPages, loading } = useSelector((state) => state.todos);

useEffect(() => {
  // fetchTodos();
   dispatch(fetchTodos({
    search: searchTerm2,
    status: selectedStatus,
    page: currentPage,
    limit: itemsPerPage,
    sortBy: sortConfig.key || "createdAt",
    order: sortConfig.direction
  }));
}, [searchTerm2, selectedStatus, currentPage, sortConfig,dispatch]);

const handleSort = (key) => {
  setSortConfig((prev) => {
    if (prev.key === key) {
      return {
        key,
        direction: prev.direction === "asc" ? "desc" : "asc",
      };
    }

    return {
      key,
      direction: "asc", // reset new column to default ASC
    };
  });

  setCurrentPage(1);
};

  // Pagination functions
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Toggle multi-delete mode when clicking todo delete icon
  const handleToggleMultiDelete = (id) => {
    if (isMultiDelete) {
      setIsMultiDelete(false);
      setSelectedTodos([]);
    } else {
      setIsMultiDelete(true);
      setSelectedTodos([id]);
    }
  };

  // Toggle checkbox selection
  const toggleSelectTodo = (id) => {
    setSelectedTodos((prev) =>
      prev.includes(id)
        ? prev.filter((todoId) => todoId !== id)
        : [...prev, id],
    );
  };

const deleteSelectedTodosHandler = async () => {
  const result = await dispatch(deleteTodos(selectedTodos));

  if (deleteTodos.fulfilled.match(result)) {
    toast.success("todo deleted successfully");
  } else {
    toast.error(result.payload);
  }

  setSelectedTodos([]);
  setIsMultiDelete(false);
};

  // Open Edit  Modal
  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setEditedData({ ...todo }); // copy for editing
    setShowEditModal(true);
  };

const handleSaveEdit = async () => {
  try {
    const { _id, createdAt, updatedAt, __v, user, ...cleanData } = editedData;

    const result = await dispatch(
      updateTodo({ id: editingTodo._id, data: cleanData })
    );

    if (updateTodo.fulfilled.match(result)) {
      toast.success("Todo updated");
      setShowEditModal(false);
      setEditingTodo(null);
    } else {
      toast.error(result.payload);
    }

  } catch (error) {
    console.error(error);
  }
};

  // Cancel Edit
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingTodo(null);
  };

  const handleLogout=()=>{
    try {
      localStorage.removeItem('token')
      
      toast.success("logout successfully")   
      setTimeout(()=>{
        window.location.reload();
      },1000)
    } catch (error){
      toast.error("logout failed")   
    }
  }

 

  return (
    <Container
      fluid
      className="min-h-screen flex flex-col items-center gap-2 bg-[#D3D3D3]"
    >
      <h1 className="text-center text-3xl font-bold mt-2">Advance Todo App</h1>

      <div className="w-[90%] rounded-xl p-4 shadow-xl bg-white">
        {/* Top Controls */}
        <div className="w-full h-[40px] flex items-center px-2">
          <input
            type="text"
            className="w-[70%] focus:outline-none px-2 bg-[#D3D3D3]"
            placeholder="search by title"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <Button
            variant="outline-info"
            className="mx-1"
            onClick={() => setIsGridView((prev) => !prev)}
          >
            {isGridView ? <CiBoxList /> : <IoGridOutline />}
          </Button>

          <div className="relative">
            <Button
              variant="outline-info"
              className="mx-0 sm:mx-1"
              onClick={() => setShowFilter((prev) => !prev)}
            >
              <CiFilter />
            </Button>
            {showFilter && (
              <div className="mt-2 mb-2 absolute top-[80%] right-0 bg-white">
                <select
                  className="border p-2 rounded"
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All</option>
                  <option value="inProgress">inProgress</option>
                  <option value="pending">pending</option>
                  <option value="done">done</option>
                </select>
              </div>
            )}
          </div>

          <Button
            variant="outline-info"
            className="mx-1"
            onClick={() => navigate("/form")}
          >
            <IoIosAdd />
          </Button>

          {isMultiDelete && (
            <Button
              variant="outline-danger"
              className="mx-1"
              onClick={deleteSelectedTodosHandler}
              disabled={selectedTodos.length === 0}
            >
              <CiCircleMinus />
            </Button>
          )}
        </div>

        {/* Table View */}
        {/* laader start */}
        {loading ?
        <div className="w-full h-[200px] border-amber-200 flex justify-center items-center">
        <div class="spinner-border text-secondary" role="status">
  <span class="sr-only">Loading...</span>
</div>
</div>
        :
         <>
        {!isGridView ? (
          <div className="overflow-x-auto mt-2">
            <table className="w-full rounded-2xl">
              <thead>
                <tr>
                  {isMultiDelete && <th className="text-center">Select</th>}
                  <th className="text-center mx-2">#</th>
                  {/* <th className="px-2 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span>Title</span>
                      <FaArrowUp />
                    </div>
                  </th> */}
                  <th
  onClick={() => handleSort("title")}
  className="px-2 whitespace-nowrap cursor-pointer"
>
  <div className="flex items-center gap-1">
    <span>Title</span>

    {sortConfig.key === "title" ? (
      sortConfig.direction === "asc" ? (
        <FaArrowUp />
      ) : (
        <FaArrowDown />
      )
    ) : (
      <FaArrowUp className="opacity-30" />
    )}
  </div>
</th>



                  
                  <th
  onClick={() => handleSort("description")}
  className="px-2 whitespace-nowrap cursor-pointer"
>
  <div className="flex items-center gap-1">
    <span>Description</span>

    {sortConfig.key === "description" ? (
      sortConfig.direction === "asc" ? (
        <FaArrowUp />
      ) : (
        <FaArrowDown />
      )
    ) : (
      <FaArrowUp className="opacity-30" />
    )}
  </div>
</th>

                <th
  onClick={() => handleSort("location")}
  className="px-2 whitespace-nowrap cursor-pointer"
>
  <div className="flex items-center gap-1">
    <span>Location</span>

    {sortConfig.key === "location" ? (
      sortConfig.direction === "asc" ? (
        <FaArrowUp />
      ) : (
        <FaArrowDown />
      )
    ) : (
      <FaArrowUp className="opacity-30" />
    )}
  </div>
</th>

                 <th
  onClick={() => handleSort("email")}
  className="px-2 whitespace-nowrap cursor-pointer"
>
  <div className="flex items-center gap-1">
    <span>Email</span>

    {sortConfig.key === "email" ? (
      sortConfig.direction === "asc" ? (
        <FaArrowUp />
      ) : (
        <FaArrowDown />
      )
    ) : (
      <FaArrowUp className="opacity-30" />
    )}
  </div>
</th>


                 <th
  onClick={() => handleSort("status")}
  className="px-2 whitespace-nowrap cursor-pointer"
>
  <div className="flex items-center gap-1">
    <span>Status</span>

    {sortConfig.key === "status" ? (
      sortConfig.direction === "asc" ? (
        <FaArrowUp />
      ) : (
        <FaArrowDown />
      )
    ) : (
      <FaArrowUp className="opacity-30" />
    )}
  </div>
</th>

                  <th
  onClick={() => handleSort("catagory")}
  className="px-2 whitespace-nowrap cursor-pointer"
>
  <div className="flex items-center gap-1">
    <span>Catagory</span>

    {sortConfig.key === "catagory" ? (
      sortConfig.direction === "asc" ? (
        <FaArrowUp />
      ) : (
        <FaArrowDown />
      )
    ) : (
      <FaArrowUp className="opacity-30" />
    )}
  </div>
</th>

                 <th
  onClick={() => handleSort("priority")}
  className="px-2 whitespace-nowrap cursor-pointer"
>
  <div className="flex items-center gap-1">
    <span>Priority</span>

    {sortConfig.key === "priority" ? (
      sortConfig.direction === "asc" ? (
        <FaArrowUp />
      ) : (
        <FaArrowDown />
      )
    ) : (
      <FaArrowUp className="opacity-30" />
    )}
  </div>
</th>

                  <th className="px-2 relative">Edit</th>
                  <th className="px-2 relative">Del</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((item, i) => (
                  <tr key={item._id || i} className="border-t">
                    {isMultiDelete && (
                      <td className="text-center px-1">
                        <input
                          type="checkbox"
                          checked={selectedTodos.includes(item._id)}
                          onChange={() => toggleSelectTodo(item._id)}
                        />
                      </td>
                    )}
                    <td className="text-center px-1">
                      {(currentPage - 1) * itemsPerPage + i + 1}
                    </td>
                    <td className="px-1">{item.title}</td>
                    <td className="text-center px-1">{item.description}</td>
                    <td className="text-center px-1">{item.location}</td>
                    <td className="text-center px-1">{item.email}</td>
                    <td className="text-center px-1">{item.status}</td>
                    <td className="text-center px-1">{item.catagory}</td>
                    <td className="text-center px-1">{item.priority}</td>
                    <td className="text-center px-1">{item.time}</td>
                    <td className="px-1">
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => handleEditClick(item)}
                      >
                        <FaRegEdit />
                      </Button>
                    </td>
                    <td className="px-1">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleToggleMultiDelete(item._id)}
                      >
                        <MdDeleteOutline />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {todos.map((item, i) => (
              <div
                key={item.id || i}
                className="border rounded-xl p-4 shadow-md bg-gray-50 relative"
              >
                {isMultiDelete && (
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedTodos.includes(item._id)}
                      onChange={() => toggleSelectTodo(item._id)}
                    />
                  </div>
                )}
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p>
                  <b>Description:</b> {item.description}
                </p>
                <p>
                  <b>Location:</b> {item.location}
                </p>
                <p>
                  <b>Email:</b> {item.email}
                </p>
                <p>
                  <b>Status:</b> {item.status}
                </p>
                <p>
                  <b>Category:</b> {item.catagory}
                </p>
                <p>
                  <b>Priority:</b> {item.priority}
                </p>
                <p>
                  <b>Time:</b> {item.time}
                </p>

                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => handleEditClick(item)}
                  >
                    <FaRegEdit />
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleToggleMultiDelete(item._id)}
                  >
                    <MdDeleteOutline />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
</>

        }
        {/* loader end */}

        {/* Pagination */}
        <div className="flex justify-between mt-3 items-center gap-2">
          <Button variant="outline-danger" onClick={handleLogout}>
            <CiLogout />
          </Button>
         <div className="flex">
          <Button variant="outline-info" onClick={prevPage}>
            <FaAngleDoubleLeft />
          </Button>

          <div className="px-1 text-[14px] md:text-[20px] flex gap-0.5 items-center">
            Page <b>{currentPage}</b> of <b>{totalPages}</b>
          </div>

          <Button variant="outline-info" onClick={nextPage}>
            <FaAngleDoubleRight />
          </Button>
        </div>
        </div>

      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCancelEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingTodo && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editedData.title}
                  onChange={(e) =>
                    setEditedData({ ...editedData, title: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={editedData.description}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={editedData.location}
                  onChange={(e) =>
                    setEditedData({ ...editedData, location: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editedData.email}
                  onChange={(e) =>
                    setEditedData({ ...editedData, email: e.target.value })
                  }
                />
              </Form.Group>

              {/* Status Dropdown */}
              <Form.Group className="mb-2">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={editedData.status}
                  onChange={(e) =>
                    setEditedData({ ...editedData, status: e.target.value })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="done">Done</option>
                </Form.Select>
              </Form.Group>

              {/* Category Dropdown */}
              <Form.Group className="mb-2">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={editedData.catagory}
                  onChange={(e) =>
                    setEditedData({ ...editedData, catagory: e.target.value })
                  }
                >
                  <option value="personal">Personal</option>
                  <option value="delegate">Delegate</option>
                </Form.Select>
              </Form.Group>

              {/* Priority Dropdown */}
              <Form.Group className="mb-2">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  value={editedData.priority}
                  onChange={(e) =>
                    setEditedData({ ...editedData, priority: e.target.value })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="text"
                  value={editedData.time}
                  onChange={(e) =>
                    setEditedData({ ...editedData, time: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}



// import { useNavigate } from "react-router-dom";

// function Table(){

//   const navigate = useNavigate();

//   const handleLogout = ()=>{

//     localStorage.removeItem("token");

//     navigate("/login");

//   }

//   return(
//     <>
//       <h1>Todo Table</h1>

//       <button onClick={handleLogout}>
//         Logout
//       </button>
//     </>
//   )

// }

// export default Table;
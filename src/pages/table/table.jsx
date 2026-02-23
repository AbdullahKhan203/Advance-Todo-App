// import React, { useMemo, useState } from "react";
// import { FaRegEdit, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
// import { MdDeleteOutline } from "react-icons/md";
// import { CiBoxList, CiFilter, CiCircleMinus } from "react-icons/ci";
// import { IoIosAdd } from "react-icons/io";
// import { Button, Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { IoGridOutline } from "react-icons/io5";

// export default function Table() {
//   const navigate = useNavigate();
//   const itemsPerPage = 10;

//   const [todos, setTodos] = useState(
//     JSON.parse(localStorage.getItem("myTodoTask")) || []
//   );

//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isGridView, setIsGridView] = useState(false);

//   // filter states
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState("all");

//   // multi-delete states
//   const [isMultiDelete, setIsMultiDelete] = useState(false);
//   const [selectedTodos, setSelectedTodos] = useState([]);

//   // Derived todos based on search + filter
//   const filteredTodos = todos.filter((todo) => {
//     const matchesSearch = todo.title
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       selectedStatus === "all" || todo.status === selectedStatus;
//     return matchesSearch && matchesStatus;
//   });

//   const totalPages = Math.ceil(filteredTodos.length / itemsPerPage) || 1;

//   const paginatedTodos = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     return filteredTodos.slice(start, end);
//   }, [filteredTodos, currentPage]);

//   // Pagination functions
//   const prevPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };
//   const nextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   // Toggle multi-delete mode when clicking todo delete icon
//   const handleToggleMultiDelete = (id) => {
//     if (isMultiDelete) {
//       // disable multi-delete mode
//       setIsMultiDelete(false);
//       setSelectedTodos([]);
//     } else {
//       // enable multi-delete mode and select clicked todo
//       setIsMultiDelete(true);
//       setSelectedTodos([id]);
//     }
//   };

//   // Toggle checkbox selection
//   const toggleSelectTodo = (id) => {
//     setSelectedTodos((prev) =>
//       prev.includes(id)
//         ? prev.filter((todoId) => todoId !== id)
//         : [...prev, id]
//     );
//   };

//   // Delete all selected todos
//   const deleteSelectedTodos = () => {
//     const updated = todos.filter((todo) => !selectedTodos.includes(todo.id));
//     setTodos(updated);
//     localStorage.setItem("myTodoTask", JSON.stringify(updated));
//     setSelectedTodos([]);
//     setIsMultiDelete(false);
//   };

//   return (
//     <Container fluid className="min-h-screen flex flex-col items-center gap-2 bg-[#D3D3D3]">
//       <h1 className="text-center text-3xl font-bold mt-2">Advance Todo App</h1>

//       <div className="w-[90%] rounded-xl p-4 shadow-xl bg-white">
//         {/* Top Controls */}
//         <div className="w-full h-[40px] flex items-center px-2">
//           <input
//             type="text"
//             className="w-[70%] focus:outline-none px-2 bg-[#D3D3D3]"
//             placeholder="search by title"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//           />

//           <Button
//             variant="outline-info"
//             className="mx-1"
//             onClick={() => setIsGridView((prev) => !prev)}
//           >
//             {isGridView ? <CiBoxList /> : <IoGridOutline />}
//           </Button>

//           <div className="relative">
//             <Button
//               variant="outline-info"
//               className="mx-0 sm:mx-1"
//               onClick={() => setShowFilter((prev) => !prev)}
//             >
//               <CiFilter />
//             </Button>
//             {showFilter && (
//               <div className="mt-2 mb-2 absolute top-[80%] right-0 bg-white">
//                 <select
//                   className="border p-2 rounded"
//                   value={selectedStatus}
//                   onChange={(e) => {
//                     setSelectedStatus(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                 >
//                   <option value="all">All</option>
//                   <option value="inProgress">inProgress</option>
//                   <option value="pending">pending</option>
//                   <option value="done">done</option>
//                 </select>
//               </div>
//             )}
//           </div>

//           <Button
//             variant="outline-info"
//             className="mx-1"
//             onClick={() => navigate("/formPage")}
//           >
//             <IoIosAdd />
//           </Button>

//           {isMultiDelete && (
//             <Button
//               variant="outline-danger"
//               className="mx-1"
//               onClick={deleteSelectedTodos}
//               disabled={selectedTodos.length === 0}
//             >
//               <CiCircleMinus />
//             </Button>
//           )}
//         </div>

//         {/* Table View */}
//         {!isGridView ? (
//           <div className="overflow-x-auto mt-2">
//             <table className="w-full rounded-2xl">
//               <thead>
//                 <tr>
//                   {isMultiDelete && <th className="text-center">Select</th>}
//                   <th className="text-center mx-2">#</th>
//                   <th className="px-2">Title</th>
//                   <th className="px-2">Description</th>
//                   <th className="px-2">Location</th>
//                   <th className="px-2">Email</th>
//                   <th className="px-2">Status</th>
//                   <th className="px-2">Category</th>
//                   <th className="px-2">Priority</th>
//                   <th className="px-2">Time</th>
//                   <th className="px-2">Edit</th>
//                   <th className="px-2">Del</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedTodos.map((item, i) => (
//                   <tr key={item.id || i} className="border-t">
//                     {isMultiDelete && (
//                       <td className="text-center px-1">
//                         <input
//                           type="checkbox"
//                           checked={selectedTodos.includes(item.id)}
//                           onChange={() => toggleSelectTodo(item.id)}
//                         />
//                       </td>
//                     )}
//                     <td className="text-center px-1">
//                       {(currentPage - 1) * itemsPerPage + i + 1}
//                     </td>
//                     <td>{item.title}</td>
//                     <td>{item.description}</td>
//                     <td>{item.location}</td>
//                     <td>{item.email}</td>
//                     <td>{item.status}</td>
//                     <td>{item.catagory}</td>
//                     <td>{item.priority}</td>
//                     <td>{item.time}</td>
//                     <td className="px-1">
//                       <Button variant="outline-info" size="sm">
//                         <FaRegEdit />
//                       </Button>
//                     </td>
//                     <td className="px-1">
//                       <Button
//                         variant="outline-danger"
//                         size="sm"
//                         onClick={() => handleToggleMultiDelete(item.id)}
//                       >
//                         <MdDeleteOutline />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           /* Grid View */
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
//             {paginatedTodos.map((item, i) => (
//               <div
//                 key={item.id || i}
//                 className="border rounded-xl p-4 shadow-md bg-gray-50 relative"
//               >
//                 {isMultiDelete && (
//                   <div className="absolute top-2 left-2">
//                     <input
//                       type="checkbox"
//                       checked={selectedTodos.includes(item.id)}
//                       onChange={() => toggleSelectTodo(item.id)}
//                     />
//                   </div>
//                 )}
//                 <h3 className="font-bold text-lg mb-2">{item.title}</h3>
//                 <p>
//                   <b>Description:</b> {item.description}
//                 </p>
//                 <p>
//                   <b>Location:</b> {item.location}
//                 </p>
//                 <p>
//                   <b>Email:</b> {item.email}
//                 </p>
//                 <p>
//                   <b>Status:</b> {item.status}
//                 </p>
//                 <p>
//                   <b>Category:</b> {item.catagory}
//                 </p>
//                 <p>
//                   <b>Priority:</b> {item.priority}
//                 </p>
//                 <p>
//                   <b>Time:</b> {item.time}
//                 </p>

//                 <div className="flex gap-2 mt-3">
//                   <Button variant="outline-info" size="sm">
//                     <FaRegEdit />
//                   </Button>

//                   <Button
//                     variant="outline-danger"
//                     size="sm"
//                     onClick={() => handleToggleMultiDelete(item.id)}
//                   >
//                     <MdDeleteOutline />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="flex justify-end mt-3 items-center gap-2">
//           <Button variant="outline-info" onClick={prevPage}>
//             <FaAngleDoubleLeft />
//           </Button>

//           <div>
//             Page <b>{currentPage}</b> of <b>{totalPages}</b>
//           </div>

//           <Button variant="outline-info" onClick={nextPage}>
//             <FaAngleDoubleRight />
//           </Button>
//         </div>
//       </div>
//     </Container>
//   );
// }



import React, { useMemo, useState } from "react";
import {
  FaRegEdit,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiBoxList, CiFilter, CiCircleMinus } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { Button, Container, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoGridOutline } from "react-icons/io5";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Table() {
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("myTodoTask")) || [],
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
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



  // Derived todos based on search + filter
  // const filteredTodos = todos.filter((todo) => {
  //   const matchesSearch = todo.title
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  //   const matchesStatus =
  //     selectedStatus === "all" || todo.status === selectedStatus;
  //   return matchesSearch && matchesStatus;
  // });

const filteredTodos = useMemo(() => {
  let filtered = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || todo.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (sortConfig.key) {
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";

      if (aValue < bValue)
        return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue)
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  return filtered;
}, [todos, searchTerm, selectedStatus, sortConfig]);

// const handleSort = (key) => {
//   setSortConfig((prev) => {
//     if (prev.key === key) {
//       // toggle direction
//       return {
//         key,
//         direction: prev.direction === "asc" ? "desc" : "asc",
//       };
//     }
//     return { key, direction: "desc" }; // first click DESC
//   });

//   setCurrentPage(1);
// };

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

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage) || 1;

  const paginatedTodos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredTodos.slice(start, end);
  }, [filteredTodos, currentPage]);

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

  // Delete all selected todos
  const deleteSelectedTodos = () => {
    const updated = todos.filter((todo) => !selectedTodos.includes(todo.id));
    setTodos(updated);
    localStorage.setItem("myTodoTask", JSON.stringify(updated));
    setSelectedTodos([]);
    setIsMultiDelete(false);
  };

  // Open Edit Modal
  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setEditedData({ ...todo }); // copy for editing
    setShowEditModal(true);
  };

  // Save Edited Todo
  const handleSaveEdit = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editingTodo.id ? { ...editedData } : todo,
    );
    
    setTodos(updatedTodos);
    localStorage.setItem("myTodoTask", JSON.stringify(updatedTodos));
    setShowEditModal(false);
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingTodo(null);
  };

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
            onClick={() => navigate("/formPage")}
          >
            <IoIosAdd />
          </Button>

          {isMultiDelete && (
            <Button
              variant="outline-danger"
              className="mx-1"
              onClick={deleteSelectedTodos}
              disabled={selectedTodos.length === 0}
            >
              <CiCircleMinus />
            </Button>
          )}
        </div>

        {/* Table View */}
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



                  {/* <th className="px-2 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span>Description</span>
                      <FaArrowUp />
                    </div>
                  </th> */}
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

                  {/* <th className="px-2 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span>Location</span>
                      <FaArrowUp />
                    </div>
                  </th> */}
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



                  {/* <th className="px-2 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span>Email</span>
                      <FaArrowUp />
                    </div>
                  </th> */}

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

                  {/* <th className="px-2 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span>Status</span>
                      <FaArrowUp />
                    </div>
                  </th> */}

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



                  {/* <th className="px-2 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span>Catagory</span>
                      <FaArrowUp />
                    </div>
                  </th> */}
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


                  {/* <th className="px-2 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span>Priority</span>
                      <FaArrowUp />
                    </div>
                  </th> */}

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
                {paginatedTodos.map((item, i) => (
                  <tr key={item.id || i} className="border-t">
                    {isMultiDelete && (
                      <td className="text-center px-1">
                        <input
                          type="checkbox"
                          checked={selectedTodos.includes(item.id)}
                          onChange={() => toggleSelectTodo(item.id)}
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
                        onClick={() => handleToggleMultiDelete(item.id)}
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
            {paginatedTodos.map((item, i) => (
              <div
                key={item.id || i}
                className="border rounded-xl p-4 shadow-md bg-gray-50 relative"
              >
                {isMultiDelete && (
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedTodos.includes(item.id)}
                      onChange={() => toggleSelectTodo(item.id)}
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
                    onClick={() => handleToggleMultiDelete(item.id)}
                  >
                    <MdDeleteOutline />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-end mt-3 items-center gap-2">
          <Button variant="outline-info" onClick={prevPage}>
            <FaAngleDoubleLeft />
          </Button>

          <div>
            Page <b>{currentPage}</b> of <b>{totalPages}</b>
          </div>

          <Button variant="outline-info" onClick={nextPage}>
            <FaAngleDoubleRight />
          </Button>
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

// import React, { useState } from 'react'
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../../features/auth/authThunk.js";

// export default function Register() {
//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.auth);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await dispatch(registerUser(data));

//     if (registerUser.fulfilled.match(result)) {
//       toast.success(result.payload.message);
//       navigate("/login");
//     } else {
//       toast.error(
//         typeof result.payload === "string"
//           ? result.payload.replace(/"/g, "")
//           : "Register failed"
//       );
//     }

//     setData({
//       username: "",
//       email: "",
//       password: "",
//     });
//   };

//   return (
//         <div className='h-[100vh] w-full flex flex-col items-center justify-center'>
//         <div className='flex flex-col gap-0.5 w-[90%] shadow-lg rounded'>
//         <h1 className='text-center  m-0'>Register</h1>
//         <form className='flex flex-col items-center p-4 w-full rounded m-0' onSubmit={handleSubmit} >
//             <div className='mb-2 flex flex-col w-full'>
//             <label htmlFor="username">Username</label>
//             <input className='border-1 rounded px-2 outline-none' type="text" name="username" id="username" value={data.username} onChange={handleChange}  placeholder='username'/>
//             </div>
//             <div className='mb-2 mb-3 flex flex-col w-full'>
//             <label htmlFor="email">Email</label>
//             <input className='border-1 rounded  px-2 outline-none' type="email" name="email" id="email" value={data.email} onChange={handleChange} placeholder='email'/>
//             </div>
//             <div className='mb-2 flex flex-col w-full'>
//                  <label htmlFor="password">Password</label>
//             <input className='border-1 rounded  px-2 outline-none' type="password" name="password" id="password"  value={data.password} onChange={handleChange}  placeholder='password'/>
//             </div>
//             <button className='bg-green-500 rounded w-full' disabled={loading}>{loading ? "Registering..." : "Register"} </button>
//             <span className='self-start'>Already have an account <b onClick={()=>navigate('/login')} className='underline text-blue-500  cursor-pointer'>login</b></span>
       
//         </form>
//         </div>
//     </div>
//   );
// }

















import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authThunk.js";
import * as Yup from "yup"; // ✅ added

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // ✅ added

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // ✅ Yup schema
  const schema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));

    // ✅ remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ validate before submit
      await schema.validate(data, { abortEarly: false });

      setErrors({}); // clear errors

      const result = await dispatch(registerUser(data));

      if (registerUser.fulfilled.match(result)) {
        toast.success(result.payload.message);
        navigate("/login");
      } else {
        toast.error(
          typeof result.payload === "string"
            ? result.payload.replace(/"/g, "")
            : "Register failed"
        );
      }

      setData({
        username: "",
        email: "",
        password: "",
      });

    } catch (validationError) {
      // ✅ collect all errors
      const newErrors = {};
      validationError.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className='h-[100vh] w-full flex flex-col items-center justify-center'>
      <div className='flex flex-col gap-0.5 w-[90%] shadow-lg rounded'>
        <h1 className='text-center  m-0'>Register</h1>

        <form className='flex flex-col items-center p-4 w-full rounded m-0' onSubmit={handleSubmit}>

          <div className='mb-2 flex flex-col w-full'>
            <label htmlFor="username">Username</label>
            <input
              className='border-1 rounded px-2 outline-none'
              type="text"
              name="username"
              id="username"
              value={data.username}
              onChange={handleChange}
              placeholder='username'
            />
            {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
          </div>

          <div className='mb-2 mb-3 flex flex-col w-full'>
            <label htmlFor="email">Email</label>
            <input
              className='border-1 rounded  px-2 outline-none'
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={handleChange}
              placeholder='email'
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          <div className='mb-2 flex flex-col w-full'>
            <label htmlFor="password">Password</label>
            <input
              className='border-1 rounded  px-2 outline-none'
              type="password"
              name="password"
              id="password"
              value={data.password}
              onChange={handleChange}
              placeholder='password'
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>

          <button className='bg-green-500 rounded w-full' disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <span className='self-start'>
            Already have an account
            <b onClick={() => navigate('/login')} className='underline text-blue-500  cursor-pointer'>
              login
            </b>
          </span>

        </form>
      </div>
    </div>
  );
}
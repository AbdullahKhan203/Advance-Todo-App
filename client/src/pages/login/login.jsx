// import React, { useState, useEffect } from 'react'
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../features/auth/authThunk";
// import { useNavigate } from 'react-router-dom'
// import * as Yup from "yup";

// export default function Login() {
//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     username: "",
//     password: "",
//   });

//    const [errors, setErrors] = useState({});

//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.auth);

//     // ✅ Yup schema
//     const schema = Yup.object({
//       username: Yup.string()
//         .min(3, "Username must be at least 3 characters")
//         .required("Username is required"),
  
//       password: Yup.string()
//         .min(6, "Password must be at least 6 characters")
//         .required("Password is required"),
//     });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) navigate("/");
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setData((prev) => ({
//       ...prev,
//       [name]: value
//     }));

//     // ✅ remove error while typing
//     setErrors((prev) => ({
//       ...prev,
//       [name]: ""
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await dispatch(loginUser(data));

//     if (loginUser.fulfilled.match(result)) {
//       toast.success(result.payload.message);
//       navigate("/");
//     } else {
//       toast.error(
//         typeof result.payload === "string"
//           ? result.payload
//           : "Login failed"
//       );
//     }

//     setData({
//       username: "",
//       password: "",
//     });
//   };

//   return (
 
//       <div className='h-[100vh] w-full flex flex-col items-center justify-center'>
//          <div className='flex flex-col gap-0.5 w-[90%] shadow-lg rounded'>
//          <h1 className='text-center  m-0'>Login</h1>
//          <form className='flex flex-col items-center p-4 w-full rounded m-0' onSubmit={handleSubmit} >
//              <div className='mb-2 flex flex-col w-full'>
//              <label htmlFor="username">Username</label>
//              <input className='border-1 rounded px-2 outline-none' type="text" name="username" id="username" value={data.username} onChange={handleChange}  placeholder='username'/>
//              </div>
//              <div className='mb-2 flex flex-col w-full'>
//                   <label htmlFor="password">Password</label>
//              <input className='border-1 rounded  px-2 outline-none' type="password" name="password" id="password"  value={data.password} onChange={handleChange}  placeholder='password'/>
//              </div>
//              <button className='bg-green-500 rounded w-full' disabled={loading}>  {loading ? "Logging..." : "Login"} </button>
//          <span className='self-start'>Not have an account <b onClick={()=>navigate('/register')} className='underline text-blue-500  cursor-pointer'>register</b></span>
//          </form>
//          </div>
//      </div>
//   );
// }


























import React, { useState, useEffect } from 'react'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authThunk";
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

   const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

    // ✅ Yup schema
    const schema = Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
  
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, []);

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

      const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      toast.success(result.payload.message);
      navigate("/");
    } else {
      toast.error(
        typeof result.payload === "string"
          ? result.payload.replace(/"/g, "")
          : "Login failed"
      );
    }

    setData({
      username: "",
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
         <h1 className='text-center  m-0'>Login</h1>
         <form className='flex flex-col items-center p-4 w-full rounded m-0' onSubmit={handleSubmit} >
             <div className='mb-2 flex flex-col w-full'>
             <label htmlFor="username">Username</label>
             <input className='border-1 rounded px-2 outline-none' type="text" name="username" id="username" value={data.username} onChange={handleChange}  placeholder='username'/>
              {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
             </div>
             <div className='mb-2 flex flex-col w-full'>
                  <label htmlFor="password">Password</label>
             <input className='border-1 rounded  px-2 outline-none' type="password" name="password" id="password"  value={data.password} onChange={handleChange}  placeholder='password'/>
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
             </div>
             <button className='bg-green-500 rounded w-full' disabled={loading}>  {loading ? "Logging..." : "Login"} </button>
         <span className='self-start'>Not have an account <b onClick={()=>navigate('/register')} className='underline text-blue-500  cursor-pointer'>register</b></span>
         </form>
         </div>
     </div>
  );
}
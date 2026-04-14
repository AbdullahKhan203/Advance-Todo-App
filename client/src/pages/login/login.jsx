import React, { useState, useEffect } from 'react'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authThunk";
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      toast.success(result.payload.message);
      navigate("/");
    } else {
      toast.error(
        typeof result.payload === "string"
          ? result.payload
          : "Login failed"
      );
    }

    setData({
      username: "",
      password: "",
    });
  };

  return (
    // ✅ UI SAME (no change)
    // <div className='h-[100vh] w-full flex flex-col items-center justify-center'>
    //   <div className='flex flex-col gap-0.5 w-[90%] shadow-lg rounded'>
    //     <h1 className='text-center  m-0'>Login</h1>
    //     <form className='flex flex-col items-center p-4 w-full rounded m-0' onSubmit={handleSubmit} >
    //       <div className='mb-2 flex flex-col w-full'>
    //         <label htmlFor="username">Username</label>
    //         <input className='border-1 rounded px-2 outline-none' type="text" name="username" value={data.username} onChange={handleChange}/>
    //       </div>

    //       <div className='mb-2 flex flex-col w-full'>
    //         <label>Password</label>
    //         <input className='border-1 rounded px-2 outline-none' type="password" name="password" value={data.password} onChange={handleChange}/>
    //       </div>

    //       <button disabled={loading}>
    //         {loading ? "Logging..." : "Login"}
    //       </button>
    //     </form>
    //   </div>
    // </div>

      <div className='h-[100vh] w-full flex flex-col items-center justify-center'>
         <div className='flex flex-col gap-0.5 w-[90%] shadow-lg rounded'>
         <h1 className='text-center  m-0'>Login</h1>
         <form className='flex flex-col items-center p-4 w-full rounded m-0' onSubmit={handleSubmit} >
             <div className='mb-2 flex flex-col w-full'>
             <label htmlFor="username">Username</label>
             <input className='border-1 rounded px-2 outline-none' type="text" name="username" id="username" value={data.username} onChange={handleChange}  placeholder='username'/>
             </div>
             {/* <div className='mb-2 mb-3 flex flex-col w-full'>
//             <label htmlFor="email">Email</label>
//             <input className='border-1 rounded  px-2 outline-none' type="email" name="email" id="email" value={data.email} onChange={handleChange} placeholder='email'/>
//             </div> */}
             <div className='mb-2 flex flex-col w-full'>
                  <label htmlFor="password">Password</label>
             <input className='border-1 rounded  px-2 outline-none' type="password" name="password" id="password"  value={data.password} onChange={handleChange}  placeholder='password'/>
             </div>
             <button className='bg-green-500 rounded w-full' disabled={loading}>  {loading ? "Logging..." : "Login"} </button>
         <span className='self-start'>Not have an account <b onClick={()=>navigate('/register')} className='underline text-blue-500  cursor-pointer'>register</b></span>
         </form>
         </div>
     </div>
  );
}
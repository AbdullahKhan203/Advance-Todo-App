import React from 'react'
import { useState } from 'react';
import { useEffect } from "react";
import api from '../../api/api';
import { toast } from "react-toastify";




import axios from 'axios';
import {useNavigate} from 'react-router-dom'
export default function Login() {
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
    const [data,setData]=useState({
        username:"",
        password:"",
    })


    useEffect(() => {

  const token = localStorage.getItem("token");

  if (token) {
    navigate("/");
  }

}, []);

    const handleChange = (e) => {
    const element = e.target.name;
    const value = e.target.value;

    setData((prev) => ({
        ...prev,
        [element]: value
    }));
};


    const handleSubmit=async(e)=>{
        e.preventDefault();
      console.log("data",data);

      try {
        setLoading(true); 
  const response = await api.post(
    "/auth/login",
    data
  );

  console.log("LOGIN RESPONSE:", response.data);
   toast.success(response.data.message);

  localStorage.setItem("token", response.data.accessTokens);

  console.log("TOKEN SAVED:", localStorage.getItem("token"));

  navigate("/");

} catch (error) {
  console.log(error.response?.data?.message);
  toast.error(error.response?.data?.message);
} finally {
        setLoading(false); // ✅ stop loader
      }

      
   setData({
        username:"",
        password:"",
    });

}
  return (
    <div className='h-[100vh] w-full flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-0.5 w-[90%] shadow-lg rounded'>
        <h1 className='text-center  m-0'>Login</h1>
        <form className='flex flex-col items-center p-4 w-full rounded m-0' onSubmit={handleSubmit} >
            <div className='mb-2 flex flex-col w-full'>
            <label htmlFor="username">Username</label>
            <input className='border-1 rounded px-2 outline-none' type="text" name="username" id="username" value={data.username} onChange={handleChange}  placeholder='username'/>
            </div>
            {/* <div className='mb-2 mb-3 flex flex-col w-full'>
            <label htmlFor="email">Email</label>
            <input className='border-1 rounded  px-2 outline-none' type="email" name="email" id="email" value={data.email} onChange={handleChange} placeholder='email'/>
            </div> */}
            <div className='mb-2 flex flex-col w-full'>
                 <label htmlFor="password">Password</label>
            <input className='border-1 rounded  px-2 outline-none' type="password" name="password" id="password"  value={data.password} onChange={handleChange}  placeholder='password'/>
            </div>
            <button className='bg-green-500 rounded w-full' disabled={loading}>  {loading ? "Logging..." : "Login"} </button>
        <span className='self-start'>Not have an account <b onClick={()=>navigate('/register')} className='underline text-blue-500  cursor-pointer'>register</b></span>
        </form>
        </div>
    </div>
  )
}

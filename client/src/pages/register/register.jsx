import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import api from '../../api/api';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate=useNavigate()
    const [data,setData]=useState({
        username:"",
        email:"",
        password:"",
    })

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
        if(!data.username || !data.email || !data.password ){
            return alert("all fields are required");
        }
      console.log("data",data);

      try {
        const response=await axios.post("http://localhost:4000/api/auth/register",data);
        console.log(response.data);
        console.log("status",response.status);
        navigate("/table");
      } catch (error) {
        console.log("error",error.response?.data || error.message);
      }

//      try {

//        const res = await api.post("/auth/register",data);
    
//     //  localStorage.setItem("token",res.data);
//         localStorage.setItem("token",res.data.accessTokens);
        

//     console.log(response.data);
//     console.log(response.status);
//      navigate("/table");

//   } catch (error) {
//     console.log(error.response?.data || error.message);
//     console.log(error.message.status);
//   }
      
   setData({
        username:"",
        email:"",
        password:"",
    });
    }
  return (
    <div className='h-[100vh] w-full flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-0.5 w-[90%] shadow-lg rounded'>
        <h1 className='text-center  m-0'>Register</h1>
        <form className='flex flex-col items-center p-4 w-full rounded m-0' onSubmit={handleSubmit} >
            <div className='mb-2 flex flex-col w-full'>
            <label htmlFor="username">Username</label>
            <input className='border-1 rounded px-2 outline-none' type="text" name="username" id="username" value={data.username} onChange={handleChange}  placeholder='username'/>
            </div>
            <div className='mb-2 mb-3 flex flex-col w-full'>
            <label htmlFor="email">Email</label>
            <input className='border-1 rounded  px-2 outline-none' type="email" name="email" id="email" value={data.email} onChange={handleChange} placeholder='email'/>
            </div>
            <div className='mb-2 flex flex-col w-full'>
                 <label htmlFor="password">Password</label>
            <input className='border-1 rounded  px-2 outline-none' type="password" name="password" id="password"  value={data.password} onChange={handleChange}  placeholder='password'/>
            </div>
            <button className='bg-green-500 rounded w-full'>Register</button>
            <span className='self-start'>Already have an account <b onClick={()=>navigate('/login')} className='underline text-blue-500  cursor-pointer'>login</b></span>
       
        </form>
        </div>
    </div>
  )
}

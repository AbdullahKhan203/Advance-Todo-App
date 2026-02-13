import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { FaAngleDoubleLeft,FaAngleDoubleRight } from "react-icons/fa";



import { Button, Alert, Container} from 'react-bootstrap';
// import Table  from 'react-bootstrap/Table';



export default function Table() {
    

  const todos=JSON.parse(localStorage.getItem('myTodoTask'))
  console.log("todos in table page",todos);
  
  return (
    <Container fluid  className="min-h-screen flex flex-col items-center gap-2  bg-[#D3D3D3]">
      <h1 className="text-center text-3xl font-bold mt-2 mb-0">
        Advance Todo App
      </h1>
      <div className='w-[90%] rounded-xl p-4 shadow-xl bg-white'>
       <div className='w-full h-[40px] flex items-center px-2'>
         <input type="text" name="" id="" className='w-[70%] focus:outline-none px-2 bg-[#D3D3D3]' placeholder='search by title' />
         <Button  variant='outline-info' className='px-2 mx-1' size='lg'><CiBoxList /></Button>
         <Button  variant='outline-info' className='px-2 mx-1' size='lg'><CiFilter/></Button>
         <Button  variant='outline-info'  className='px-2 mx-1' size='lg'><IoIosAdd/></Button>
        </div> 
      <table className='w-full rounded-2xl'>
         <thead>
            <tr>
                <th className="checkbox-header"></th>
                <th className="px-0.5 text-center">#</th>
                <th className="px-0.5 text-center">Title <i className="fa-solid fa-arrow-up"></i></th>
                <th className="px-0.5 text-center">Description <i className="fa-solid fa-arrow-up"></i></th>
                <th className="px-0.5 text-center">Location <i className="fa-solid fa-arrow-up"></i></th>
                <th className="px-0.5 text-center">Email <i className="fa-solid fa-arrow-up"></i></th>
                <th className="px-0.5 text-center">Status<i className="fa-solid fa-arrow-up"></i></th>
                <th className="px-0.5 text-center">Category<i className="fa-solid fa-arrow-up"></i></th>
                <th className="px-0.5 text-center">Priority<i className="fa-solid fa-arrow-up"></i></th> 
                <th className="px-0.5 text-center">Time<i className="fa-solid fa-arrow-up"></i></th>
                <th className="px-0.5 text-center">Edit</th>
                <th className="px-0.5 text-center">Del</th>
            </tr>
            </thead>
            <tbody>
              {todos.map((item,i)=>{
              return <tr key={i} className='border-t-[0.2px] py-3'>
                <td className="px-0.5"></td>
                <td className="px-0.5  text-center">{i+1}</td>
                <td className="px-0.5 text-center">{item.title} <i className="fa-solid fa-arrow-up"></i></td>
                <td className="px-0.5 text-center">{item.description} <i className="fa-solid fa-arrow-up"></i></td>
                <td className=" px-0.5 text-center">{item.location} <i className="fa-solid fa-arrow-up"></i></td>
                <td className="px-0.5 text-center">{item.email} <i className="fa-solid fa-arrow-up"></i></td>
                <td className=" px-0.5 text-center">{item.status}<i className="fa-solid fa-arrow-up"></i></td>
                <td className=" px-0.5 text-center">{item.catagory}<i className="fa-solid fa-arrow-up"></i></td>
                <td className="px-0.5 text-center">{item.priority}<i className="fa-solid fa-arrow-up"></i></td> 
                <td className="px-0.5 text-center">{item.time}<i className="fa-solid fa-arrow-up"></i></td>
                <td className="px-0.5 text-center"><Button variant='outline-info'  size="sm"><FaRegEdit /></Button></td>
                <td className="px-0.5 text-center"><Button variant='outline-danger'  size="sm"><MdDeleteOutline className='color'/></Button></td>
              </tr>})}
            </tbody>
               
      </table>
       <div className='flex justify-end mt-1'>
                <Button variant='outline-info'><FaAngleDoubleLeft/></Button>
                <div className='text-nowrap px-2'>Current Page</div>
                <Button variant='outline-info'><FaAngleDoubleRight/></Button>
            </div>
      </div>
    </Container>
  )
}

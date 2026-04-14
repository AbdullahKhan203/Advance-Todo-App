import Todo from '../models/Todo.js'
import { asyncHandler } from '../utills/asyncHandler.js';
import {deleteTodoService,updateTodoService,getSingleTodoService,createTodoService,getTodosService} from '../services/todoService.js'

const deleteTodo=asyncHandler(async(req,res)=>{
    const { ids } = req.body;

     // ✅ extract only what service needs
      const userId = req.user._id;

      const result=await deleteTodoService({userId,ids});

    res.status(200).json({
      success: true,
      message: result.message,
      deletedCount: result.deletedCount
    });
})

const updateTodo=asyncHandler(async(req,res)=>{

    const todoId=req.params.id;
    const userId=req.user._id;
    const body=req.body;

    const result=await updateTodoService({todoId,userId,body})

     res.status(200).json({
      success: true,
      data: result.data,
      message:result.message
    });

  
})

const findSingleTodo=asyncHandler(async(req,res)=>{
      
        const todoId= req.params.id;
        const userId= req.user._id;

      const todo=await getSingleTodoService({userId,todoId})


        res.status(200).json({
          success: true,
          data: todo.data
        });
})

const getTodos = asyncHandler(async (req, res) => {
  const queryObj = req.query;
  const userId = req.user._id;

  const result = await getTodosService(queryObj, userId);

  res.status(200).json({
    success: true,
    ...result
  });
});

const createTodo=asyncHandler(async(req,res)=>{
      let userData={
          user: req.user._id, // <-- assign logged-in user automatically
          title: req.body.title,
          description: req.body.description,
          location: req.body.location,
          email: req.body.email,
          status: req.body.status,
          catagory: req.body.catagory,
          priority: req.body.priority,
          time: req.body.time,
        }    

        let todo=await createTodoService(userData)

        res.status(201).json({
          success: true,
          data: todo.data
        });
})

export { deleteTodo ,updateTodo,findSingleTodo,getTodos,createTodo};
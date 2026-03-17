import Todo from '../models/Todo.js'


const createTodo=async()=>{
    try {
        const todo=await Todo.create(req.body);
        res.status(201).json({
            success:true,
            data:todo,
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }

};
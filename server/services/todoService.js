import Todo from '../models/Todo.js'




const deleteTodoService=async({userId,ids})=>{

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
       let error=new Error('Please provide an array of todo IDs');
       error.statusCode=400;
       throw error;
    }

    const result = await Todo.deleteMany({
       _id: { $in: ids },
       user: userId
    });

return{
      message: "Todos deleted successfully",
      deletedCount: result.deletedCount
}
}



const updateTodoService=async({todoId,userId,body})=>{

      const todo = await Todo.findOneAndUpdate(
            {
              _id: todoId,
              user: userId
            },
            body,
            {
              new: true,
              runValidators: true
            }
          );
      
          if (!todo) {
            let error=new Error("Todo not found")
           error.statusCode=404
           throw error;
          }


      return {
        data:todo,
        message:"todo updated successfully"
      }    
}


const getSingleTodoService=async({userId,todoId})=>{
        const todo = await Todo.findOne({
          _id: todoId,
          user: userId
        });
        if (!todo) {
          let error=new Error("Todo not found");
          error.statusCode=404;
          throw error;
        }

        return{
            data:todo
        }

}



const createTodoService=async(userData)=>{
      const todo = await Todo.create(userData);
     

      return {
        data:todo
      }
}







const getTodosService = async (queryObj, userId) => {
  const {
    search = "",
    status = "all",
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "asc"
  } = queryObj;

  const pageNum = Number(page);
  const limitNum = Number(limit);

  let query = {
    user: userId
  };

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (status !== "all") {
    query.status = status;
  }

  const skip = (pageNum - 1) * limitNum;

  const sortOrder = order === "asc" ? 1 : -1;

  const todos = await Todo.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limitNum);

  const total = await Todo.countDocuments(query);

  return {
    data: todos,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
    totalTodos: total
  };
};



export {deleteTodoService,updateTodoService,getSingleTodoService,createTodoService,getTodosService}
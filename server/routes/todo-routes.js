import express from "express";
import Todo from "../models/Todo.js";
import { protect } from "../middleware/todo-middleware.js";
import {createTodo, deleteTodo,findSingleTodo,getTodos,updateTodo} from './../controllers/todo-controller.js' 

const router = express.Router();

router.post("/create", protect,createTodo)

router.get("/", protect,getTodos)


router.get("/:id", protect,findSingleTodo)

router.put("/:id",protect,updateTodo);

router.delete("/", protect, deleteTodo);

export default router;


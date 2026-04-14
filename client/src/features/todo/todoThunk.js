import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.get("/todo", { params });
      console.log("fetch res object",res);  //res.data.data[]
      
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch todos");
    }
  }
);

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/todo/create", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create todo");
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/todo/${id}`, data);
         console.log("updated res object",res); 
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update todo");
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (ids, { rejectWithValue }) => {
    try {
      await api.delete("/todo", {
        data: { ids }
      });
      return ids; // return deleted ids
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete todos");
    }
  }
);



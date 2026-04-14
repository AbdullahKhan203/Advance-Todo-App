import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodos
} from "./todoThunk.js";

const initialState = {
  todos: [],
  totalPages: 1,
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     .addCase(createTodo.pending, (state) => {
      state.loading = true;
      })
    .addCase(createTodo.fulfilled, (state, action) => {
     state.loading = false;

     const newTodo = action.payload.data || action.payload;

     
     // add new todo to list (instant UI update)
     state.todos=[newTodo,...state.todos]  //another way
    //  state.todos.unshift(newTodo);
    })

    .addCase(createTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
     
     .addCase(updateTodo.fulfilled, (state, action) => {
  state.loading = false;

  const updatedTodo = action.payload.data; // or action.payload (see below)

  state.todos = state.todos.map((todo) =>
    todo._id === updatedTodo._id ? updatedTodo : todo
  );
})

      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteTodos.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.loading = false;

        // remove deleted todos from state
        state.todos = state.todos.filter(
          (todo) => !action.payload.includes(todo._id)
        );
      })

      .addCase(deleteTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default todoSlice.reducer;
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", data);
         console.log("login res object",res); 
      // res has 4 properties { type, payload, meta, error }
      return res.data;  //redux captures it, goest to action.payload
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Register failed"
      );
    }
  }
);
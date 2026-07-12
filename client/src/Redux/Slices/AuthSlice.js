import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data") || "{}"),
};

export const createAccount = createAsyncThunk("auth/signup", async (data) => {
  try {
    const responsePromise = axiosInstance.post("/user/register", data);

    toast.promise(responsePromise, {
      loading: "Creating your account...",
      success: (res) => res.data.message,
      error: "Failed to create account",
    });

    const response = await responsePromise;

    return response.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error.message || "Something went wrong",
    );

    throw error;
  }
});

export const loginAccount = createAsyncThunk(
  "auth/login",
  async (loginData) => {
    try {
      const response = axiosInstance.post("/user/login", loginData);

      toast.promise(response, {
        loading: "Logging you in...",
        success: (data) => data?.data?.message,
        error: "Failed to login",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");

      throw error;
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(loginAccount.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.role = action.payload.user.role;
      state.data = action.payload.user;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", action.payload.user.role);
      localStorage.setItem("data", JSON.stringify(action.payload.user));
    });
  },
});

export default authSlice.reducer;
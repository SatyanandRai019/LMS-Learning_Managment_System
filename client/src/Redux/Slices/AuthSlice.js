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

export const logoutAccount = createAsyncThunk("auth/logout", async () => {
  try {
    const response = axiosInstance.get("/user/logout");

    toast.promise(response, {
      loading: "Logging out...",
      success: (data) => data?.data?.message,
      error: "Failed to logout",
    });

    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong");

    throw error;
  }
});

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData) => {
    try {
      const response = axiosInstance.post(
        "/user/change-password",
        passwordData,
      );

      toast.promise(response, {
        loading: "Changing password...",
        success: (data) => data?.data?.message,
        error: "Failed to change password",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw error;
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email) => {
    try {
      const response = axiosInstance.post("/user/reset", { email });

      toast.promise(response, {
        loading: "Sending reset email...",
        success: (data) => data?.data?.message,
        error: "Failed to send reset email",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw error;
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data) => {
    try {
      const response = axiosInstance.post(`/user/reset/${data.resetToken}`, {
        password: data.password,
      });

      toast.promise(response, {
        loading: "Resetting password...",
        success: (data) => data?.data?.message,
        error: "Failed to reset password",
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

    builder.addCase(logoutAccount.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.role = "";
      state.data = {};

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      localStorage.removeItem("data");
    });

    builder.addCase(changePassword.fulfilled, (state) => {});
  },
});

export default authSlice.reducer;

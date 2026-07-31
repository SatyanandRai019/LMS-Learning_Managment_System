import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  dashboardData: {
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
  },
  loading: false,
  error: null,
};

export const getDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/dashboard");

      return response.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load dashboard"
      );

      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = {
          totalUsers: action.payload.totalUsers,
          totalCourses: action.payload.totalCourses,
          totalRevenue: action.payload.totalRevenue,
        };
      })

      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
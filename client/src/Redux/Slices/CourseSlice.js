import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  courseData: [],
  loading: false,
  error: null,
};

export const getAllCourses = createAsyncThunk(
  "course/getAllCourses",
  async () => {
    try {
      const response = axiosInstance.get("/courses");

      toast.promise(response, {
        loading: "Fetching courses...",
        success: (data) => data?.data?.message,
        error: "Failed to fetch courses",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");

      throw error;
    }
  },
);

export const createCourse = createAsyncThunk(
  "course/createCourse",
  async (data) => {
    try {
      const response = axiosInstance.post("/courses", data);

      toast.promise(response, {
        loading: "Creating course...",
        success: (data) => data?.data?.message,
        error: "Failed to create course",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");

      throw error;
    }
  },
);

export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (id) => {
    try {
      const response = axiosInstance.delete(`/courses/${id}`);

      toast.promise(response, {
        loading: "Deleting course...",
        success: (data) => data.data.message,
        error: "Failed to delete course",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw error;
    }
  },
);

export const addLecture = createAsyncThunk(
  "course/addLecture",
  async ({ id, formData }) => {
    try {
      const response = axiosInstance.post(`/courses/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.promise(response, {
        loading: "Uploading lecture...",
        success: (data) => data.data.message,
        error: "Failed to upload lecture",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw error;
    }
  },
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllCourses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.courseData = action.payload.courses;
      state.error = null;
    });
    builder.addCase(getAllCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(createCourse.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteCourse.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteCourse.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addLecture.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addLecture.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(addLecture.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default courseSlice.reducer;

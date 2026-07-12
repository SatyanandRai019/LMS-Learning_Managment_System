import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import courseReducer from "./Slices/CourseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
  },
});

export default store;
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Slices/AuthSlice";
import courseReducer from "./Slices/CourseSlice";
import paymentReducer from "./Slices/paymentSlice";
import dashboardReducer from "./Slices/dashboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    payment: paymentReducer,
    dashboard: dashboardReducer,
  },

  devTools: true,
});

export default store;
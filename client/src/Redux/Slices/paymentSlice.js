import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  key: "",
  order: null,
  loading: false,
  error: null,
};

export const getRazorpayKey = createAsyncThunk(
  "payment/getRazorpayKey",
  async () => {
    try {
      const response = axiosInstance.get("/payments/razorpay-key");

      toast.promise(response, {
        loading: "Loading Razorpay...",
        success: (data) => data?.data?.message,
        error: "Failed to load Razorpay",
      });

      return (await response).data;
    } catch (error) {
      console.log("RAZORPAY KEY ERROR:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw error;
    }
  },
);

export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async (courseId) => {
    try {
      const response = axiosInstance.post(`/payments/create-order/${courseId}`);

      toast.promise(response, {
        loading: "Creating order...",
        success: (data) => data?.data?.message,
        error: "Failed to create order",
      });

      return (await response).data;
    } catch (error) {
      console.log("CREATE ORDER ERROR:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw error;
    }
  },
);

export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData) => {
    try {
      const response = axiosInstance.post("/payments/verify", paymentData);

      toast.promise(response, {
        loading: "Verifying payment...",
        success: (data) => data?.data?.message,
        error: "Payment verification failed",
      });

      return (await response).data;
    } catch (error) {
      console.log("VERIFY PAYMENT ERROR:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw error;
    }
  },
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getRazorpayKey.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRazorpayKey.fulfilled, (state, action) => {
        state.loading = false;
        state.key = action.payload.key;
      })
      .addCase(getRazorpayKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })

      .addCase(verifyPayment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default paymentSlice.reducer;
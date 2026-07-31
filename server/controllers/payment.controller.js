import AppError from "../utils/error.util.js";
import { razorpay } from "../server.js";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import Payment from "../models/payment.model.js";
import crypto from "crypto";
 
export const getRazorpayApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razorpay API Key fetched successfully",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
 
export const createOrder = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { id } = req.user;
 
    const user = await User.findById(id);
 
    if (!user) {
      return next(new AppError("Unauthorized, please login first!!!", 401));
    }
 
    if (user.role === "ADMIN") {
      return next(new AppError("Admin cannot purchase courses", 403));
    }
 
    const course = await Course.findById(courseId);
 
    if (!course) {
      return next(new AppError("Course not found", 404));
    }
 
    const options = {
      amount: 49900,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };
 
    const order = await razorpay.orders.create(options);
 
    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order,
      course,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    const message = error?.error?.description || error.message || "Order creation failed";
    return next(new AppError(message, 500));
  }
};
 
export const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;
 
    const { id } = req.user;
 
    const user = await User.findById(id);
 
    if (!user) {
      return next(new AppError("Please login first", 401));
    }
 
    const course = await Course.findById(courseId);
 
    if (!course) {
      return next(new AppError("Course not found", 404));
    }
 
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
 
    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("Payment verification failed", 400));
    }
 
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user: user._id,
      course: course._id,
      amount: 499,
      status: "success",
    });
 
    if (!user.enrolledCourses.includes(course._id)) {
      user.enrolledCourses.push(course._id);
      await user.save();
    }
 
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    return next(new AppError(error.message, 500));
  }
};
 
export const allPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find()
      .populate("user", "fullName email")
      .populate("course", "title category")
      .sort({ createdAt: -1 });
 
    res.status(200).json({
      success: true,
      message: "All payments fetched successfully",
      payments,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
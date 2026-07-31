import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import Payment from "../models/payment.model.js";
import AppError from "../utils/error.util.js";

const getAdminDashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalCourses = await Course.countDocuments();

    const payments = await Payment.find({ status: "captured" });

    const totalRevenue = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    res.status(200).json({
      success: true,
      totalUsers,
      totalCourses,
      totalRevenue,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export { getAdminDashboard };
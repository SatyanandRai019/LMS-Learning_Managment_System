import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import Payment from "../models/payment.model.js";
import AppError from "../utils/error.util.js";

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const getAdminDashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();

    const payments = await Payment.find({ status: "success" });
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    // Revenue trend: last 6 months
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const revenueAgg = await Payment.aggregate([
      { $match: { status: "success", createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          total: { $sum: "$amount" },
        },
      },
    ]);

    const revenueByKey = {};
    revenueAgg.forEach((entry) => {
      revenueByKey[`${entry._id.year}-${entry._id.month}`] = entry.total;
    });

    const revenueTrend = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      revenueTrend.push({ label: MONTH_LABELS[d.getMonth()], revenue: revenueByKey[key] || 0 });
    }

    // Top 5 courses by enrollment
    const topCoursesAgg = await User.aggregate([
      { $unwind: "$enrolledCourses" },
      { $group: { _id: "$enrolledCourses", enrollments: { $sum: 1 } } },
      { $sort: { enrollments: -1 } },
      { $limit: 5 },
      { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
      { $unwind: "$course" },
      { $project: { _id: 0, title: "$course.title", enrollments: 1 } },
    ]);

    res.status(200).json({
      success: true,
      totalUsers,
      totalCourses,
      totalRevenue,
      revenueTrend,
      topCourses: topCoursesAgg,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export { getAdminDashboard };
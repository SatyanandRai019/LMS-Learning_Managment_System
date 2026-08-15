import { Route, Routes, useLocation } from "react-router-dom";

import Footer from "./components/Footer";
import RequireAuth from "./components/Auth/RequireAuth";

import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Courses from "./Pages/Courses";
import CourseDescription from "./Pages/CourseDescription";
import ChangePassword from "./Pages/ChangePassword";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentFailure from "./Pages/PaymentFailure";
import Denied from "./Pages/Denied";
import NotFound from "./Pages/NotFound";

import DashboardLayout from "./Layouts/DashboardLayout";

import Dashboard from "./Pages/User/Dashboard";
import MyCourses from "./Pages/User/MyCourses";
import Profile from "./Pages/User/Profile";

import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ManageCourses from "./Pages/Admin/ManageCourses";
import AddLecture from "./Pages/Admin/AddLecture";
import CreateCourse from "./Pages/Admin/CreateCourse";

function App() {
  const location = useLocation();

  // Dashboard/Admin pages have their own fixed-sidebar layout,
  // so the public marketing footer should not render there.
  const isDashboardRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/my-courses") ||
    location.pathname.startsWith("/change-password") ||
    location.pathname.startsWith("/payments") ||
    location.pathname.startsWith("/course/create") ||
    location.pathname.includes("/add-lecture");

  return (
    <>
      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDescription />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:resetToken"
          element={<ResetPassword />}
        />

        <Route
          path="/payment/success"
          element={<PaymentSuccess />}
        />

        <Route
          path="/payment/failure"
          element={<PaymentFailure />}
        />

        <Route path="/denied" element={<Denied />} />

        {/* Protected Routes */}

        <Route
          element={
            <RequireAuth allowedRoles={["ADMIN", "USER"]} />
          }
        >
          <Route element={<DashboardLayout />}>

            {/* User */}

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/my-courses"
              element={<MyCourses />}
            />

            <Route
              path="/change-password"
              element={<ChangePassword />}
            />

            {/* Admin */}

            <Route
              element={
                <RequireAuth allowedRoles={["ADMIN"]} />
              }
            >
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />

              <Route
                path="/admin/courses"
                element={<ManageCourses />}
              />

              <Route
                path="/course/create"
                element={<CreateCourse />}
              />

              <Route
                path="/course/:id/add-lecture"
                element={<AddLecture />}
              />
            </Route>

          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>

      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default App;
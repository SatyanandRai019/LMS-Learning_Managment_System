import { Route, Routes, useLocation } from "react-router-dom";

import Footer from "./components/Footer";
import RequireAuth from "./components/Auth/RequireAuth";

import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import CourseDescription from "./pages/CourseDescription";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import Denied from "./pages/Denied";
import NotFound from "./pages/NotFound";

import DashboardLayout from "./Layouts/DashboardLayout";

import Dashboard from "./pages/User/Dashboard";
import MyCourses from "./pages/User/MyCourses";
import Profile from "./pages/User/Profile";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageCourses from "./pages/Admin/ManageCourses";
import AddLecture from "./pages/Admin/AddLecture";
import CreateCourse from "./pages/Admin/CreateCourse";

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
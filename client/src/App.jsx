import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AllCourses from "./pages/AllCourses";
import MyCourses from "./pages/MyCourses";
import CourseStore from "./pages/CourseStore";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses" element={<AllCourses />} />
                <Route path="/my-courses" element={<MyCourses />} />
                <Route path="/course-store" element={<CourseStore />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

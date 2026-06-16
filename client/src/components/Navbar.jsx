import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logoutUser } from "../services/authServices";

function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const data = await getProfile();
            setUser(data.user);
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser(null);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav>
            {/* LOGO */}
            <img
                src={
                    user?.avatar?.secure_url ||
                    "https://ui-avatars.com/api/?name=LMS&background=4f46e5&color=fff"
                }
                alt="Logo"
                width="40"
                height="40"
                style={{ borderRadius: "50%", cursor: "pointer" }}
                onClick={() => navigate("/")}
            />

            {/* COMMON LINKS — always visible */}
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/courses")}>All Courses</button>
            <button onClick={() => navigate("/my-courses")}>My Courses</button>
            <button onClick={() => navigate("/course-store")}>Course Store</button>

            {user ? (
                <>
                    <button onClick={() => navigate("/dashboard")}>Dashboard</button>
                    <button className="btn-danger" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <button className="btn-primary" onClick={() => navigate("/login")}>Login</button>
                    <button className="btn-primary" onClick={() => navigate("/register")}>Sign Up</button>
                </>
            )}
        </nav>
    );
}

export default Navbar;
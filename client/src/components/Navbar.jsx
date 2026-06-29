import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProfile, logoutUser } from "../services/authServices";

function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

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
    }, [location.pathname]);

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
        <nav className="navbar">
            {/* BRAND */}
            <div className="navbar-brand" onClick={() => navigate("/")}>
                <img
                    className="navbar-logo"
                    src={
                        user?.avatar?.secure_url ||
                        "https://ui-avatars.com/api/?name=LMS&background=1a3c5e&color=e8a020&bold=true"
                    }
                    alt="LMS Logo"
                />
                <span className="navbar-brand-name">Learn<span>Hub</span></span>
            </div>

            {/* LINKS */}
            <div className="navbar-links">
                <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
                <button className="nav-btn" onClick={() => navigate("/courses")}>All Courses</button>
                <button className="nav-btn" onClick={() => navigate("/my-courses")}>My Courses</button>
                <button className="nav-btn" onClick={() => navigate("/course-store")}>Course Store</button>

                <div className="nav-divider" />

                {user ? (
                    <>
                        <button className="nav-btn" onClick={() => navigate("/dashboard")}>
                            👤 Dashboard
                        </button>
                        <button className="nav-btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
                        <button className="nav-btn-accent" onClick={() => navigate("/register")}>
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

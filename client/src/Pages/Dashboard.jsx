import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/authServices";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const data = await getProfile();
            setUser(data.user);
        } catch (error) {
            navigate("/login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner" />
                Loading your profile...
            </div>
        );
    }

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">My Dashboard</h1>
                <p className="page-subtitle">Welcome back, {user?.fullName} 👋</p>
            </div>

            <div className="dashboard-grid">
                {/* LEFT — Profile Card */}
                <div className="profile-card">
                    <img
                        className="profile-avatar"
                        src={
                            user?.avatar?.secure_url ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "User")}&background=1a3c5e&color=e8a020&bold=true&size=200`
                        }
                        alt="Avatar"
                    />
                    <div className="profile-name">{user?.fullName}</div>
                    <div className="profile-email">{user?.email}</div>
                    <div className={`profile-badge ${user?.role === "ADMIN" ? "admin" : ""}`}>
                        {user?.role}
                    </div>

                    <div className="profile-info">
                        <div className="profile-info-row">
                            <span className="profile-info-label">Member since</span>
                            <span className="profile-info-value">
                                {new Date(user?.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                            </span>
                        </div>
                        <div className="profile-info-row">
                            <span className="profile-info-label">Account</span>
                            <span className="profile-info-value" style={{ color: "var(--success)", fontWeight: "700" }}>Active</span>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary btn-full"
                        style={{ marginTop: "20px", fontSize: "14px", padding: "10px" }}
                        onClick={() => navigate("/courses")}
                    >
                        Browse Courses
                    </button>
                </div>

                {/* RIGHT — Stats & Info */}
                <div className="dashboard-main">
                    <div className="stats-row">
                        <div className="stat-card">
                            <div className="stat-number">0</div>
                            <div className="stat-label">Courses Enrolled</div>
                        </div>
                        <div className="stat-card accent">
                            <div className="stat-number">0</div>
                            <div className="stat-label">Courses Completed</div>
                        </div>
                        <div className="stat-card success">
                            <div className="stat-number">0</div>
                            <div className="stat-label">Certificates Earned</div>
                        </div>
                    </div>

                    {/* My Courses Section */}
                    <div className="card">
                        <h2 style={{ fontSize: "17px", fontWeight: "700", color: "var(--primary)", marginBottom: "20px" }}>
                            My Courses
                        </h2>
                        <div className="empty-state">
                            <div className="empty-state-icon">📚</div>
                            <div className="empty-state-title">No courses yet</div>
                            <p className="empty-state-text">You haven't enrolled in any courses. Start learning today!</p>
                            <button
                                className="btn btn-accent"
                                style={{ marginTop: "16px" }}
                                onClick={() => navigate("/course-store")}
                            >
                                Explore Course Store
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

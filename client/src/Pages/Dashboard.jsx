import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/authServices";

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const data = await getProfile();
            setUser(data.user);
        } catch (error) {
            navigate("/login");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="page">
            <h1>Dashboard</h1>

            {user ? (
                <div className="card">
                    <img
                        className="avatar"
                        src={
                            user.avatar?.secure_url ||
                            `https://ui-avatars.com/api/?name=${user.fullName}`
                        }
                        alt="User Avatar"
                    />
                    <h2>Welcome, {user.fullName} 👋</h2>
                    <div className="dashboard-info">
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <p>Joined: {new Date(user.createdAt).toDateString()}</p>
                    </div>
                </div>
            ) : (
                <p className="loading">Loading...</p>
            )}
        </div>
    );
}

export default Dashboard;
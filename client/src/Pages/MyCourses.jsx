import { useNavigate } from "react-router-dom";

function MyCourses() {
    const navigate = useNavigate();

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">My Courses</h1>
                <p className="page-subtitle">Track your learning progress</p>
            </div>

            <div className="card">
                <div className="empty-state">
                    <div className="empty-state-icon">🎒</div>
                    <div className="empty-state-title">No enrolled courses yet</div>
                    <p className="empty-state-text">
                        You haven't enrolled in any courses yet. Browse the course store to get started.
                    </p>
                    <button
                        className="btn btn-accent"
                        style={{ marginTop: "20px" }}
                        onClick={() => navigate("/course-store")}
                    >
                        Go to Course Store
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyCourses;

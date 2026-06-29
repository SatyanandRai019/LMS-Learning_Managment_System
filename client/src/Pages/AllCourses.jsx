import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../services/courseServices";

function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchCourses = async () => {
        try {
            const data = await getCourses();
            setCourses(data.courses);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate("/login");
            } else {
                setError("Failed to load courses. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner" />
                Loading courses...
            </div>
        );
    }

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">All Courses</h1>
                <p className="page-subtitle">
                    {courses.length > 0 ? `${courses.length} courses available` : "Explore our course catalog"}
                </p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {courses.length === 0 ? (
                <div className="card">
                    <div className="empty-state">
                        <div className="empty-state-icon">📭</div>
                        <div className="empty-state-title">No courses available</div>
                        <p className="empty-state-text">Check back later — new courses are added regularly.</p>
                    </div>
                </div>
            ) : (
                <div className="courses-grid">
                    {courses.map((course) => (
                        <div className="course-card" key={course._id}>
                            {course.thumbnail?.secure_url ? (
                                <img
                                    className="course-thumbnail"
                                    src={course.thumbnail.secure_url}
                                    alt={course.title}
                                />
                            ) : (
                                <div className="course-thumbnail-placeholder">📘</div>
                            )}
                            <div className="course-body">
                                <span className="course-category">{course.category}</span>
                                <h3 className="course-title">{course.title}</h3>
                                <p className="course-description">{course.description}</p>
                                <div className="course-meta">
                                    <span className="course-meta-item">
                                        👨‍🏫 <strong>{course.createdBy}</strong>
                                    </span>
                                    <span className="course-meta-item">
                                        📖 <strong>{course.numberOfLectures}</strong> lectures
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AllCourses;

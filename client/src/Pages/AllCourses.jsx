import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../services/courseServices";

function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCourses = async () => {
        try {
            const data = await getCourses();
            setCourses(data.courses);
        } catch (error) {
            console.log(error);
            navigate("/login");  // redirect if not logged in
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="page">
            <h1>All Courses</h1>

            {loading ? (
                <p className="loading">Loading courses...</p>
            ) : courses.length === 0 ? (
                <p>No courses available.</p>
            ) : (
                <div>
                    {courses.map((course) => (
                        <div className="card" key={course._id}>
                            <img
                                src={course.thumbnail?.secure_url}
                                alt={course.title}
                                width="200"
                            />
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                            <p>Category: {course.category}</p>
                            <p>Created By: {course.createdBy}</p>
                            <p>Lectures: {course.numberOfLectures}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AllCourses;
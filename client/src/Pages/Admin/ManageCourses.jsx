import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCourses } from "../../Redux/Slices/courseSlice";

function ManageCourses() {
  const dispatch = useDispatch();

  const { courseData, loading } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>

      <div className="mb-6 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Manage Courses
        </h1>

        <Link
          to="/course/create"
          className="btn btn-primary"
        >
          Create Course
        </Link>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        {courseData?.map((course) => (

          <div
            key={course._id}
            className="card bg-base-200 shadow"
          >

            <figure>

              <img
                src={course.thumbnail?.secure_url}
                alt={course.title}
              />

            </figure>

            <div className="card-body">

              <h2 className="card-title">
                {course.title}
              </h2>

              <p>{course.category}</p>

              <Link
                to={`/course/${course._id}/add-lecture`}
                className="btn btn-secondary"
              >
                Add Lecture
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ManageCourses;
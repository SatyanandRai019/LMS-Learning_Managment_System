import { useSelector } from "react-redux";

function MyCourses() {
  const { data } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">My Courses</h1>

      {data?.enrolledCourses?.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="card bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={course.thumbnail?.secure_url}
                  alt={course.title}
                  className="h-48 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">{course.title}</h2>

                <p>{course.description}</p>

                <p className="text-sm text-gray-500">
                  Instructor: {course.createdBy}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-xl text-center">
          No enrolled courses found.
        </h2>
      )}
    </div>
  );
}

export default MyCourses;
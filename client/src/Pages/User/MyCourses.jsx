import { useSelector } from "react-redux";

function MyCourses() {
  const { data } = useSelector((state) => state.auth);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {data?.subscription?.length ? (
          data.subscription.map((course) => (
            <div key={course._id} className="card bg-base-200 shadow">
              <figure>
                <img
                  src={course.thumbnail?.secure_url}
                  alt={course.title}
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">{course.title}</h2>
                <p>{course.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No purchased courses.</p>
        )}
      </div>
    </div>
  );
}

export default MyCourses;
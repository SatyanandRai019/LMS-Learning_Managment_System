function UserDashboard() {
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        User Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-5 mt-8">

        <div className="card bg-base-200 p-6">
          <h2>Total Courses</h2>
          <p className="text-3xl font-bold">5</p>
        </div>

        <div className="card bg-base-200 p-6">
          <h2>Completed</h2>
          <p className="text-3xl font-bold">2</p>
        </div>

        <div className="card bg-base-200 p-6">
          <h2>In Progress</h2>
          <p className="text-3xl font-bold">3</p>
        </div>

      </div>

    </div>
  );
}

export default UserDashboard;
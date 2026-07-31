import { useSelector } from "react-redux";

function Profile() {
  const { data } = useSelector((state) => state.auth);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Profile</h1>

      <div className="card bg-base-200 shadow p-6">
        <p><strong>Name:</strong> {data?.fullName}</p>
        <p><strong>Email:</strong> {data?.email}</p>
        <p><strong>Role:</strong> {data?.role}</p>
      </div>
    </div>
  );
}

export default Profile;
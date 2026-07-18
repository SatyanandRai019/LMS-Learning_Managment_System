import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import HomeLayout from "../Layouts/HomeLayout";
import { changePassword } from "../Redux/Slices/AuthSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  }

  async function handleChangePassword(e) {
    e.preventDefault();

    if (!passwordData.oldPassword.trim() || !passwordData.newPassword.trim()) {
      toast.error("Please fill all the fields");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    const response = await dispatch(changePassword(passwordData));

    if (response?.payload?.success) {
      navigate("/dashboard");
    }

    setPasswordData({
      oldPassword: "",
      newPassword: "",
    });
  }

  return (
    <HomeLayout>
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">
        <form
          onSubmit={handleChangePassword}
          className="w-full max-w-md space-y-5 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0a1f44]">Change Password</h1>
            <p className="mt-1 text-sm text-slate-400">
              Keep your account secure
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="oldPassword" className="text-sm font-medium text-slate-600">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              placeholder="Enter your current password"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10"
              value={passwordData.oldPassword}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="newPassword" className="text-sm font-medium text-slate-600">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter your new password"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10"
              value={passwordData.newPassword}
              onChange={handleUserInput}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#0a1f44] py-3 font-semibold text-white transition-all duration-200 hover:bg-[#112d5c]"
          >
            Change Password
          </button>

          <p className="text-center text-sm">
            <Link to="/dashboard" className="font-semibold text-[#d4af37] hover:underline">
              Back to Dashboard
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ChangePassword;
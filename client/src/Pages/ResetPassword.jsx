import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import HomeLayout from "../Layouts/HomeLayout";
import { resetPassword } from "../Redux/Slices/AuthSlice";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const [password, setPassword] = useState("");

  async function handleResetPassword(e) {
    e.preventDefault();

    if (!password.trim()) {
      toast.error("Please enter a new password");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const response = await dispatch(resetPassword({ resetToken, password }));

    if (response?.payload?.success) {
      navigate("/login");
    }
  }

  return (
    <HomeLayout>
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">
        <form
          onSubmit={handleResetPassword}
          className="w-full max-w-md space-y-5 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0a1f44]">Reset Password</h1>
            <p className="mt-1 text-sm text-slate-400">
              Enter a new password for your account
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-slate-600">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your new password"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#0a1f44] py-3 font-semibold text-white transition-all duration-200 hover:bg-[#112d5c]"
          >
            Reset Password
          </button>

          <p className="text-center text-sm">
            <Link to="/login" className="font-semibold text-[#d4af37] hover:underline">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ResetPassword;
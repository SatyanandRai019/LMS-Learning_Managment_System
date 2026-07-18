import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import HomeLayout from "../Layouts/HomeLayout";
import { forgotPassword } from "../Redux/Slices/AuthSlice";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  async function handleForgotPassword(e) {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address");
      return;
    }

    await dispatch(forgotPassword(email));
    setEmail("");
  }

  return (
    <HomeLayout>
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">
        <form
          onSubmit={handleForgotPassword}
          className="w-full max-w-md space-y-5 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0a1f44]">Forgot Password</h1>
            <p className="mt-1 text-sm text-slate-400">
              We'll send a reset link to your email
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-slate-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your registered email"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#0a1f44] py-3 font-semibold text-white transition-all duration-200 hover:bg-[#112d5c]"
          >
            Send Reset Link
          </button>

          <p className="text-center text-sm text-slate-500">
            Remembered your password?{" "}
            <Link to="/login" className="font-semibold text-[#0a1f44] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ForgotPassword;
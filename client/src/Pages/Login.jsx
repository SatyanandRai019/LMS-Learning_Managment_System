import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import HomeLayout from "../Layouts/HomeLayout";
import { loginAccount } from "../Redux/Slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  async function loginUser(e) {
    e.preventDefault();
    if (!loginData.email.trim() || !loginData.password.trim()) {
      toast.error("Please fill all the fields");
      return;
    }

    if (!loginData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (loginData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const response = await dispatch(loginAccount(loginData));

    if (response.payload.success) {
      navigate("/");
    }
  }

  return (
    <HomeLayout>
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">
        <form
          onSubmit={loginUser}
          className="w-full max-w-md space-y-5 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0a1f44]">
              Welcome Back
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Login to continue your learning journey
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
              placeholder="you@example.com"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10"
              value={loginData.email}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-slate-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10"
              value={loginData.password}
              onChange={handleUserInput}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#0a1f44] py-3 font-semibold text-white transition-all duration-200 hover:bg-[#112d5c]"
          >
            Login
          </button>

          <div className="flex flex-col items-center gap-2 pt-2 text-sm">
            <Link to="/forgot-password" className="text-[#d4af37] hover:underline">
              Forgot Password?
            </Link>
            <p className="text-slate-500">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-[#0a1f44] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;

    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  function getImage(event) {
    event.preventDefault();

    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });

      const fileReader = new FileReader();

      fileReader.readAsDataURL(uploadedImage);

      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewAccount(e) {
    e.preventDefault();

    if (
      !signupData.fullName.trim() ||
      !signupData.email.trim() ||
      !signupData.password.trim()
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (signupData.fullName.trim().length < 5) {
      toast.error("Full name must be at least 5 characters long");
      return;
    }

    if (!signupData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (signupData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    const response = await dispatch(createAccount(formData));

    if (response.payload.success) {
      navigate("/");
    }

    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  }

  return (
    <HomeLayout>
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 py-10">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="w-full max-w-md space-y-5 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0a1f44]">
              Create Your Account
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Start learning with us today
            </p>
          </div>

          <label
            htmlFor="image_upload"
            className="mx-auto flex w-fit cursor-pointer justify-center"
          >
            {previewImage ? (
              <img
                className="h-24 w-24 rounded-full border-4 border-[#d4af37]/30 object-cover"
                src={previewImage}
                alt="Profile Preview"
              />
            ) : (
              <BsPersonCircle className="text-7xl text-slate-300" />
            )}
          </label>

          <input
            onChange={getImage}
            type="file"
            id="image_upload"
            name="image_upload"
            className="hidden"
            accept=".jpg,.jpeg,.png,.svg"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-sm font-medium text-slate-600">
              Full Name
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter your full name"
              onChange={handleUserInput}
              value={signupData.fullName}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-slate-600">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="you@example.com"
              onChange={handleUserInput}
              value={signupData.email}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-slate-600">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Create a password"
              onChange={handleUserInput}
              value={signupData.password}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#0a1f44] py-3 font-semibold text-white transition-all duration-200 hover:bg-[#112d5c]"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#0a1f44] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
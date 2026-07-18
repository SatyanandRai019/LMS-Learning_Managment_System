import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAccount } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  async function handleLogout(e) {
    e.preventDefault();

    const res = await dispatch(logoutAccount());

    if (res?.payload?.success) {
      navigate("/");
    }
  }

  return (
    <div className="drawer">
      <input id="drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content">
        <label
          htmlFor="drawer"
          className="btn btn-circle fixed top-5 left-5 z-50 border-none bg-[#0a1f44] text-white shadow-md hover:bg-[#112d5c]"
        >
          <FiMenu size={22} />
        </label>

        <main className="min-h-screen pt-20">{children}</main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-[999]">
        <label htmlFor="drawer" className="drawer-overlay"></label>

        <aside className="min-h-full w-80 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <h2 className="text-2xl font-black text-[#0a1f44]">
              LMS<span className="text-[#d4af37]">.</span>
            </h2>

            <label htmlFor="drawer" className="cursor-pointer text-slate-400">
              <AiFillCloseCircle size={26} />
            </label>
          </div>

          <ul className="menu w-full gap-1 p-5 text-base">
            <li>
              <Link to="/" className="rounded-lg text-slate-600 hover:bg-[#0a1f44]/5 hover:text-[#0a1f44]">
                🏠 Home
              </Link>
            </li>

            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/course/create" className="rounded-lg text-slate-600 hover:bg-[#0a1f44]/5 hover:text-[#0a1f44]">
                  ➕ Create Course
                </Link>
              </li>
            )}

            <li>
              <Link to="/courses" className="rounded-lg text-slate-600 hover:bg-[#0a1f44]/5 hover:text-[#0a1f44]">
                📚 All Courses
              </Link>
            </li>

            <li>
              <Link to="/about" className="rounded-lg text-slate-600 hover:bg-[#0a1f44]/5 hover:text-[#0a1f44]">
                ℹ️ About Us
              </Link>
            </li>

            <li>
              <Link to="/contactus" className="rounded-lg text-slate-600 hover:bg-[#0a1f44]/5 hover:text-[#0a1f44]">
                📞 Contact Us
              </Link>
            </li>

            <div className="divider"></div>

            {!isLoggedIn && (
              <li>
                <div className="flex w-full justify-center gap-3">
                  <Link
                    to="/login"
                    className="rounded-xl bg-[#0a1f44] px-4 py-2 text-center text-sm font-semibold text-white hover:bg-[#112d5c]"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="rounded-xl border-2 border-[#0a1f44] px-4 py-2 text-center text-sm font-semibold text-[#0a1f44] hover:bg-[#0a1f44] hover:text-white"
                  >
                    Signup
                  </Link>
                </div>
              </li>
            )}

            {isLoggedIn && (
              <li>
                <div className="flex w-full justify-center gap-3">
                  <Link
                    to="/dashboard"
                    className="rounded-xl bg-[#0a1f44] px-4 py-2 text-center text-sm font-semibold text-white hover:bg-[#112d5c]"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="rounded-xl border-2 border-red-500 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              </li>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default HomeLayout;
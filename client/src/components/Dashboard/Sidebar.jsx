import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaHome,
  FaBook,
  FaUsers,
  FaMoneyBill,
  FaPlusCircle,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import { logoutAccount } from "../../Redux/Slices/authSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { role, data } = useSelector((state) => state.auth);

  const userLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FaHome,
    },
    {
      name: "My Courses",
      path: "/my-courses",
      icon: FaBook,
    },
    {
      name: "Payments",
      path: "/payments",
      icon: FaMoneyBill,
    },
  ];

  const adminLinks = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: FaHome,
    },
    {
      name: "Manage Courses",
      path: "/admin/courses",
      icon: FaBook,
    },
    {
      name: "Manage Users",
      path: "/admin/users",
      icon: FaUsers,
    },
    {
      name: "Payments",
      path: "/admin/payments",
      icon: FaMoneyBill,
    },
    {
      name: "Create Course",
      path: "/create-course",
      icon: FaPlusCircle,
    },
  ];

  const accountLinks = [
    {
      name: "Change Password",
      path: "/change-password",
      icon: FaKey,
    },
  ];

  const links = role === "ADMIN" ? adminLinks : userLinks;

  const handleLogout = async () => {
    const result = await dispatch(logoutAccount());

    if (logoutAccount.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-900 text-white">
      {/* Logo */}
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-center">LearnSphere</h1>
      </div>

      {/* User Info */}
      <div className="border-b p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold">
          {data?.fullName?.charAt(0)?.toUpperCase()}
        </div>

        <h2 className="mt-3 text-lg font-semibold">{data?.fullName}</h2>

        <p className="text-sm text-gray-300">{data?.email}</p>

        <p className="mt-1 text-xs font-semibold text-yellow-400">{role}</p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        <p className="mb-2 text-xs uppercase tracking-wider text-gray-400">
          Main Menu
        </p>

        <div className="flex flex-col gap-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={18} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </div>

        <p className="mt-8 mb-2 text-xs uppercase tracking-wider text-gray-400">
          Account
        </p>

        <div className="flex flex-col gap-2">
          {accountLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={18} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg bg-red-600 px-4 py-3 transition hover:bg-red-700"
        >
          <FaSignOutAlt size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
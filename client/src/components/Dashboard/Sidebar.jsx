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
import { logoutAccount } from "../../Redux/Slices/AuthSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { role, data } = useSelector((state) => state.auth);

  const userLinks = [
    { name: "Dashboard", path: "/dashboard", icon: FaHome },
    { name: "My Courses", path: "/my-courses", icon: FaBook },
    { name: "Payments", path: "/payments", icon: FaMoneyBill },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: FaHome },
    { name: "Manage Courses", path: "/admin/courses", icon: FaBook },
    { name: "Manage Users", path: "/admin/users", icon: FaUsers },
    { name: "Payments", path: "/admin/payments", icon: FaMoneyBill },
    { name: "Create Course", path: "/course/create", icon: FaPlusCircle },
  ];

  const accountLinks = [
    { name: "Change Password", path: "/change-password", icon: FaKey },
  ];

  const links = role === "ADMIN" ? adminLinks : userLinks;

  const handleLogout = async () => {
    const result = await dispatch(logoutAccount());

    if (logoutAccount.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  const renderLink = (link) => {
    const Icon = link.icon;

    return (
      <NavLink
        key={link.path}
        to={link.path}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            isActive
              ? "bg-[#d4af37] text-slate-900 shadow-sm"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`
        }
      >
        <Icon size={16} />
        <span>{link.name}</span>
      </NavLink>
    );
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex h-screen w-64 flex-shrink-0 flex-col overflow-y-auto bg-[#0a1f44] text-white">
      {/* Logo */}
      <div className="border-b border-white/10 p-6">
        <h1 className="text-center text-2xl font-bold tracking-wide">
          Learn<span className="text-[#d4af37]">Sphere</span>
        </h1>
      </div>

      {/* User Info */}
      <div className="border-b border-white/10 p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37] text-xl font-bold text-slate-900">
          {data?.fullName?.charAt(0)?.toUpperCase()}
        </div>

        <h2 className="mt-3 truncate text-base font-semibold">
          {data?.fullName}
        </h2>

        <p className="truncate text-xs text-slate-400">{data?.email}</p>

        <span className="mt-2 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#d4af37]">
          {role}
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Main Menu
        </p>

        <div className="flex flex-col gap-1">{links.map(renderLink)}</div>

        <p className="mb-2 mt-8 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Account
        </p>

        <div className="flex flex-col gap-1">
          {accountLinks.map(renderLink)}
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600/90 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-red-600"
        >
          <FaSignOutAlt size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

import {
  FiHome,
  FiLock,
  FiGrid,
  FiStar,
  FiShield,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: FiHome },
    { name: "Vault", path: "/vault", icon: FiLock },
    { name: "Categories", path: "/categories", icon: FiGrid },
    { name: "Favourites", path: "/favourites", icon: FiStar },
    { name: "Security", path: "/security", icon: FiShield },
    { name: "Profile", path: "/profile", icon: FiUser },
    { name: "Settings", path: "/settings", icon: FiSettings },
  ];

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 text-white">

      <div className="border-b border-slate-800 p-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          SecureVault
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Password Manager
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-4 py-3 transition-all ${
                  isActive
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-5">

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold">
            {user?.firstName?.charAt(0) || "U"}
          </div>

          <div>
            <h4 className="font-semibold">
              {user?.firstName || "User"}
            </h4>

            <p className="text-xs text-slate-400">
              {user?.email}
            </p>
          </div>

        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold transition hover:bg-red-600"
        >
          <FiLogOut />
          Logout
        </button>

      </div>
    </aside>
  );
};
export default Sidebar;
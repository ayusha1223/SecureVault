import {
  FiHome,
  FiLock,
  FiPlusCircle,
  FiGrid,
  FiStar,
  FiShield,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FiHome />,
    },
    {
      name: "Passwords",
      path: "/vault",
      icon: <FiLock />,
    },
    {
      name: "Add Password",
      path: "/vault/new",
      icon: <FiPlusCircle />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <FiGrid />,
    },
    {
      name: "Favourites",
      path: "/favourites",
      icon: <FiStar />,
    },
    {
      name: "Security",
      path: "/security",
      icon: <FiShield />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FiSettings />,
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="p-8 border-b border-slate-800">
        <h1 className="text-3xl font-bold">SecureVault</h1>
        <p className="text-slate-400 mt-2 text-sm">
          Password Manager
        </p>
      </div>

      <nav className="flex-1 px-4 py-6">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 mb-2 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-medium hover:bg-red-600"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
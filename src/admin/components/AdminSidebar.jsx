import {
  FiHome,
  FiUsers,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const AdminSidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: FiHome,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: FiUsers,
    },
    
    {
      name: "Audit Logs",
      path: "/admin/audit-logs",
      icon: FiFileText,
    },
    {
      name: "Statistics",
      path: "/admin/statistics",
      icon: FiBarChart2,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: FiSettings,
    },
  ];

  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-950 text-white">

      <div className="border-b border-slate-800 p-8">

        <h1 className="text-3xl font-bold">
          SecureVault
        </h1>

        <p className="mt-2 text-slate-400">
          Admin Panel
        </p>

      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}

      </nav>

      <div className="border-t border-slate-800 p-5">

        <div className="mb-5">

          <h3 className="font-semibold">
            {user?.firstName} {user?.lastName}
          </h3>

          <p className="text-sm text-slate-400">
            {user?.email}
          </p>

        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full rounded-xl bg-red-600 py-3 font-semibold hover:bg-red-700"
        >
          <div className="flex items-center justify-center gap-2">
            <FiLogOut />
            Logout
          </div>
        </button>

      </div>

    </aside>
  );
};

export default AdminSidebar;
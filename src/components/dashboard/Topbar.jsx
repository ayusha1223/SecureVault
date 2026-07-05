import { FiBell, FiSearch, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

      {/* Search */}

      <div className="relative w-[420px]">

        <FiSearch className="absolute left-4 top-3.5 text-slate-400" />

        <input
          type="text"
          placeholder="Search passwords..."
          className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <button className="relative">

          <FiBell
            size={22}
            className="text-slate-600"
          />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <FiUser />
          </div>

          <div>

            <h4 className="font-semibold text-slate-800">
              {user?.firstName || "User"}
            </h4>

            <p className="text-sm text-slate-500">
              SecureVault User
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Topbar;
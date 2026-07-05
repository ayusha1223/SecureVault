import {
  FiBell,
  FiMoon,
  FiSearch,
  FiPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      <div className="relative w-[420px]">

        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search passwords..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:bg-white"
        />

      </div>

      <div className="flex items-center gap-4">

        <button
          onClick={() => navigate("/vault")}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <FiPlus />
          Add Password
        </button>

        <button className="rounded-xl bg-slate-100 p-3 hover:bg-slate-200">
          <FiMoon size={18} />
        </button>

        <button className="relative rounded-xl bg-slate-100 p-3 hover:bg-slate-200">
          <FiBell size={18} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

      </div>

    </header>
  );
};

export default Topbar;
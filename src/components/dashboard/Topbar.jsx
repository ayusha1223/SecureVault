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
      </div>

    </header>
  );
};

export default Topbar;
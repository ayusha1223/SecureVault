import {
  FiCopy,
  FiEdit2,
  FiEye,
  FiGlobe,
  FiStar,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const VaultCard = ({
  vault,
  onView,
  onEdit,
  onDelete,
  onFavourite,
}) => {
  const copyPassword = () => {
    navigator.clipboard.writeText(vault.password);
    toast.success("Password copied");
  };

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl"
    >
      <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />

      <div className="p-6">

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <FiGlobe size={24} />
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                {vault.websiteName}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {vault.category}
              </p>

            </div>

          </div>

          <button
            onClick={() => onFavourite(vault._id)}
            className={`rounded-xl p-2 transition ${
              vault.favourite
                ? "bg-yellow-100 text-yellow-500"
                : "bg-slate-100 text-slate-400 hover:bg-slate-200"
            }`}
          >
            <FiStar
              fill={
                vault.favourite
                  ? "currentColor"
                  : "none"
              }
            />
          </button>

        </div>

        <div className="mt-6 space-y-4">

          <div className="flex items-center gap-3">

            <FiUser className="text-slate-400" />

            <span className="text-slate-700">
              {vault.username || vault.email}
            </span>

          </div>

          <div className="rounded-xl bg-slate-100 px-4 py-3 font-mono tracking-widest">
            ••••••••••••••••
          </div>

        </div>

        <div className="mt-6 flex items-center justify-between">

          <button
            onClick={() => onView(vault)}
            className="rounded-xl bg-slate-100 p-3 hover:bg-slate-200"
          >
            <FiEye />
          </button>

          <button
            onClick={copyPassword}
            className="rounded-xl bg-slate-100 p-3 hover:bg-slate-200"
          >
            <FiCopy />
          </button>

          <button
            onClick={() => onEdit(vault)}
            className="rounded-xl bg-slate-100 p-3 hover:bg-slate-200"
          >
            <FiEdit2 />
          </button>

          <button
            onClick={() => onDelete(vault._id)}
            className="rounded-xl bg-red-50 p-3 text-red-600 hover:bg-red-100"
          >
            <FiTrash2 />
          </button>

        </div>

      </div>
    </motion.div>
  );
};

export default VaultCard;
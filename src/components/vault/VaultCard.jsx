import {
  FiCopy,
  FiEdit,
  FiTrash2,
  FiEye,
  FiStar,
} from "react-icons/fi";

const VaultCard = ({
  vault,
  onDelete,
  onEdit,
  onView,
  onFavourite,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            {vault.websiteName}
          </h2>

          <p className="mt-1 text-slate-500">
            {vault.username}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            {vault.email}
          </p>

        </div>

        <button
          onClick={() => onFavourite(vault._id)}
          className={`p-2 rounded-lg ${
            vault.favourite
              ? "text-yellow-500"
              : "text-slate-400"
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

      <div className="mt-5 flex items-center justify-between">

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
          {vault.category}
        </span>

        <div className="flex gap-2">

          <button
            onClick={() => onView(vault)}
            className="rounded-lg bg-slate-100 p-2 hover:bg-slate-200"
          >
            <FiEye />
          </button>

          <button
            onClick={() =>
              navigator.clipboard.writeText(vault.password)
            }
            className="rounded-lg bg-slate-100 p-2 hover:bg-slate-200"
          >
            <FiCopy />
          </button>

          <button
            onClick={() => onEdit(vault)}
            className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
          >
            <FiEdit />
          </button>

          <button
            onClick={() => onDelete(vault._id)}
            className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
          >
            <FiTrash2 />
          </button>

        </div>

      </div>

    </div>
  );
};

export default VaultCard;
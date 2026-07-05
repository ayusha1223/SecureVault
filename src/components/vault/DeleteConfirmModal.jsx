import { FiTrash2, FiX } from "react-icons/fi";

const DeleteConfirmModal = ({
  open,
  onClose,
  onDelete,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <FiTrash2
            size={36}
            className="text-red-600"
          />
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold">
          Delete Password?
        </h2>

        <p className="mt-4 text-center text-slate-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border py-3 font-semibold hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

        <button
          onClick={onClose}
          className="absolute right-5 top-5"
        >
          <FiX />
        </button>

      </div>

    </div>
  );
};

export default DeleteConfirmModal;
import { FiCopy, FiEye, FiEyeOff, FiX } from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";

const ViewPasswordModal = ({ vault, onClose }) => {
  const [show, setShow] = useState(false);

  if (!vault) return null;

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(vault.password);

      toast.success("Password copied");

      const settings = JSON.parse(
        localStorage.getItem("settings") || "{}"
      );

      // Default = 30 seconds
      const seconds =
        settings.clipboardAutoClear || 30;

      setTimeout(async () => {
        try {
          await navigator.clipboard.writeText("");

          toast.success(
            "Clipboard cleared automatically"
          );
        } catch (err) {
          console.error(err);
        }
      }, seconds * 1000);
    } catch (err) {
      toast.error("Failed to copy password");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              {vault.websiteName}
            </h2>

            <p className="text-slate-500">
              Password Details
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <FiX size={22} />
          </button>
        </div>

        <div className="space-y-5">

          <div>
            <label className="text-sm text-slate-500">
              Username
            </label>

            <input
              value={vault.username}
              readOnly
              className="mt-2 w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="text-sm text-slate-500">
              Email
            </label>

            <input
              value={vault.email}
              readOnly
              className="mt-2 w-full rounded-xl border p-3"
            />
          </div>

          <div>

            <label className="text-sm text-slate-500">
              Password
            </label>

            <div className="mt-2 flex">

              <input
                readOnly
                type={show ? "text" : "password"}
                value={vault.password}
                className="flex-1 rounded-l-xl border border-r-0 p-3"
              />

              <button
                onClick={() => setShow(!show)}
                className="border border-r-0 px-4"
              >
                {show ? <FiEyeOff /> : <FiEye />}
              </button>

              <button
                onClick={copyPassword}
                className="rounded-r-xl border px-4 hover:bg-slate-100"
              >
                <FiCopy />
              </button>

            </div>

          </div>

        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default ViewPasswordModal;
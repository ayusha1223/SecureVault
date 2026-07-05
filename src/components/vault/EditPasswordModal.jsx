import { useEffect, useState } from "react";
import { FiRefreshCw, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

import { updateVault } from "../../services/vaultService";

const EditPasswordModal = ({
  open,
  vault,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    websiteName: "",
    websiteUrl: "",
    username: "",
    email: "",
    password: "",
    category: "",
    notes: "",
    favourite: false,
    tags: "",
  });

  useEffect(() => {
    if (vault) {
      setForm({
        websiteName: vault.websiteName || "",
        websiteUrl: vault.websiteUrl || "",
        username: vault.username || "",
        email: vault.email || "",
        password: vault.password || "",
        category: vault.category || "",
        notes: vault.notes || "",
        favourite: vault.favourite || false,
        tags: (vault.tags || []).join(", "),
      });
    }
  }, [vault]);

  if (!open || !vault) return null;

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    let pass = "";

    for (let i = 0; i < 16; i++) {
      pass += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setForm({
      ...form,
      password: pass,
    });
  };

  const changeHandler = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateVault(vault._id, {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });

      toast.success("Password Updated");

      onSuccess();

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur">

      <form
        onSubmit={submitHandler}
        className="w-full max-w-3xl rounded-3xl bg-white p-8"
      >

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              Edit Password
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
          >
            <FiX size={24} />
          </button>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <input
            name="websiteName"
            value={form.websiteName}
            onChange={changeHandler}
            className="rounded-xl border p-3"
          />

          <input
            name="websiteUrl"
            value={form.websiteUrl}
            onChange={changeHandler}
            className="rounded-xl border p-3"
          />

          <input
            name="username"
            value={form.username}
            onChange={changeHandler}
            className="rounded-xl border p-3"
          />

          <input
            name="email"
            value={form.email}
            onChange={changeHandler}
            className="rounded-xl border p-3"
          />

          <div className="flex">

            <input
              name="password"
              value={form.password}
              onChange={changeHandler}
              className="flex-1 rounded-l-xl border border-r-0 p-3"
            />

            <button
              type="button"
              onClick={generatePassword}
              className="rounded-r-xl border px-5"
            >
              <FiRefreshCw />
            </button>

          </div>

          <input
            name="category"
            value={form.category}
            onChange={changeHandler}
            className="rounded-xl border p-3"
          />

        </div>

        <textarea
          name="notes"
          value={form.notes}
          onChange={changeHandler}
          className="mt-5 h-28 w-full rounded-xl border p-3"
        />

        <input
          name="tags"
          value={form.tags}
          onChange={changeHandler}
          className="mt-5 w-full rounded-xl border p-3"
        />

        <div className="mt-6 flex justify-end gap-4">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-6 py-3"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="rounded-xl bg-blue-600 px-8 py-3 text-white"
          >
            {loading ? "Updating..." : "Update"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default EditPasswordModal;
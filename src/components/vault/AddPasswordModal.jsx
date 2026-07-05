import { useState } from "react";
import { FiX, FiRefreshCw } from "react-icons/fi";
import toast from "react-hot-toast";

import { createVault } from "../../services/vaultService";

const AddPasswordModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    websiteName: "",
    websiteUrl: "",
    username: "",
    email: "",
    password: "",
    category: "Personal",
    notes: "",
    favourite: false,
    tags: "",
  });

  if (!open) return null;

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

      await createVault({
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });

      toast.success("Password Added");

      onSuccess();

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed"
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
              Add Password
            </h2>

            <p className="text-slate-500">
              Save new credentials
            </p>
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
            placeholder="Website"
            onChange={changeHandler}
            className="rounded-xl border p-3"
            required
          />

          <input
            name="websiteUrl"
            placeholder="Website URL"
            onChange={changeHandler}
            className="rounded-xl border p-3"
          />

          <input
            name="username"
            placeholder="Username"
            onChange={changeHandler}
            className="rounded-xl border p-3"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={changeHandler}
            className="rounded-xl border p-3"
          />

          <div className="flex">

            <input
              name="password"
              placeholder="Password"
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
            placeholder="Category"
            onChange={changeHandler}
            className="rounded-xl border p-3"
          />

        </div>

        <textarea
          name="notes"
          placeholder="Notes"
          onChange={changeHandler}
          className="mt-5 h-28 w-full rounded-xl border p-3"
        />

        <input
          name="tags"
          placeholder="tag1, tag2"
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
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default AddPasswordModal;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { createVault } from "../../services/vaultService";

const AddPassword = () => {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createVault({
        ...form,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      toast.success("Password saved successfully");

      navigate("/vault");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to save password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold">
          Add Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="websiteName"
            placeholder="Website Name"
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            name="websiteUrl"
            placeholder="Website URL"
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            name="category"
            placeholder="Category"
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <input
            name="tags"
            placeholder="tag1, tag2, tag3"
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="favourite"
              onChange={handleChange}
            />
            Favourite
          </label>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Password"}
          </button>

        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddPassword;
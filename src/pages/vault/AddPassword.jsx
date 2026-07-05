import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import { createVault } from "../../services/vaultService";
import { checkPasswordStrength } from "../../utils/passwordStrength";

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

  const strength = useMemo(
    () => checkPasswordStrength(form.password),
    [form.password]
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (strength.label === "Weak") {
    toast.error(
      "Password is too weak. Use at least 12 characters with uppercase, lowercase, numbers and symbols."
    );
    return;
  }

  try {
    setLoading(true);

    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 90);

    await createVault({
      ...form,
      passwordExpiry: expiry,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });

    toast.success("Password saved successfully");

    navigate("/vault");
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Failed to save password"
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

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="websiteName"
            placeholder="Website Name"
            value={form.websiteName}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            name="websiteUrl"
            placeholder="Website URL"
            value={form.websiteUrl}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <div>

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">

              <div
                className={`${strength.color} h-full transition-all`}
                style={{
                  width: `${(strength.score / 6) * 100}%`,
                }}
              />

            </div>

            <p
              className={`mt-2 text-sm font-semibold ${
                strength.label === "Weak"
                  ? "text-red-600"
                  : strength.label === "Medium"
                  ? "text-yellow-600"
                  : strength.label === "Strong"
                  ? "text-blue-600"
                  : "text-green-600"
              }`}
            >
              {strength.label}
            </p>

          </div>

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <input
            name="tags"
            placeholder="tag1, tag2, tag3"
            value={form.tags}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="favourite"
              checked={form.favourite}
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
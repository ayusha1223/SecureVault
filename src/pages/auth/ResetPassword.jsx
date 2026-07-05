import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import toast from "react-hot-toast";

import api from "../../api/axios";
import AuthLayout from "../../components/layout/AuthLayout";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      toast.success(data.message);

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Choose a new secure password."
    >
      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >
        <div className="relative">
          <FiLock className="absolute left-4 top-4 text-slate-400" />

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
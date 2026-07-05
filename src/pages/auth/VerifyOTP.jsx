import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShield } from "react-icons/fi";
import toast from "react-hot-toast";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layout/AuthLayout";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const email =
    sessionStorage.getItem("mfaEmail");

  const userId =
    sessionStorage.getItem("mfaUserId");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post(
        "/auth/mfa/verify",
        {
          userId,
          otp,
        }
      );

      login(data.user, data.accessToken);

      sessionStorage.removeItem("mfaUserId");
      sessionStorage.removeItem("mfaEmail");

      toast.success("Login successful");

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Two-Factor Authentication"
      subtitle={`Enter the verification code sent to ${email}`}
    >
      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >
        <div className="relative">
          <FiShield className="absolute left-4 top-4 text-slate-400" />

          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            placeholder="Enter 6-digit OTP"
            className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none tracking-[8px] text-center text-xl"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          {loading
            ? "Verifying..."
            : "Verify OTP"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default VerifyOTP;
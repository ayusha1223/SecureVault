import { useState, useEffect } from "react";
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
  const [timeLeft, setTimeLeft] = useState(300);

  const email = sessionStorage.getItem("mfaEmail");

  // Server-issued MFA session token (replaces client-supplied userId)
  const [mfaToken, setMfaToken] = useState(
    sessionStorage.getItem("mfaToken")
  );

  // Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/mfa/verify", {
        mfaToken,
        otp,
      });

      login(data.user);

      sessionStorage.removeItem("mfaToken");
      sessionStorage.removeItem("mfaEmail");

      toast.success("Login successful");

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      const { data } = await api.post("/auth/mfa/resend", {
        mfaToken,
      });

      // The server rotates the MFA session token on every resend
      setMfaToken(data.mfaToken);
      sessionStorage.setItem("mfaToken", data.mfaToken);

      setOtp("");
      setTimeLeft(30);

      toast.success("A new OTP has been sent.");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to resend OTP"
      );
    }
  };

  return (
    <AuthLayout
      title="Two-Factor Authentication"
      subtitle={`Enter the verification code sent to ${email}`}
    >
      <form onSubmit={submitHandler} className="space-y-5">
        <div className="relative">
          <FiShield className="absolute left-4 top-4 text-slate-400" />

          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none tracking-[8px] text-center text-xl"
            required
          />
        </div>

        <p className="text-center text-sm text-gray-500">
          {timeLeft > 0 ? (
            <>
              OTP expires in{" "}
              <span className="font-semibold text-red-500">
                {timeLeft}s
              </span>
            </>
          ) : (
            <span className="font-semibold text-red-600">
              OTP has expired
            </span>
          )}
        </p>

        <button
          type="submit"
          disabled={loading || timeLeft === 0}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading
            ? "Verifying..."
            : timeLeft === 0
            ? "OTP Expired"
            : "Verify OTP"}
        </button>

        {timeLeft === 0 && (
          <button
            type="button"
            onClick={resendOTP}
            className="w-full rounded-xl border border-blue-600 py-3 font-semibold text-blue-600 hover:bg-blue-50"
          >
            Resend OTP
          </button>
        )}
      </form>
    </AuthLayout>
  );
};

export default VerifyOTP;
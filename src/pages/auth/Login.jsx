import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layout/AuthLayout";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [captchaToken, setCaptchaToken] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    try {
      setLoading(true);
      console.log("Captcha Token:", captchaToken);
      const { data } = await api.post("/auth/login", {
        ...form,
        captchaToken,
      });

      // MFA Required
      if (data.requiresMFA) {
        sessionStorage.setItem(
          "mfaUserId",
          data.userId
        );

        sessionStorage.setItem(
          "mfaEmail",
          data.email
        );

        toast.success(data.message);

        navigate("/verify-otp");

        return;
      }

      // Normal Login
      login(data.user, data.accessToken);

      toast.success("Welcome back!");

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };
console.log("Site Key:", import.meta.env.VITE_RECAPTCHA_SITE_KEY);
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to your SecureVault account."
    >
      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >
        <div className="relative">
          <FiMail className="absolute left-4 top-4 text-slate-400" />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <FiLock className="absolute left-4 top-4 text-slate-400" />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={(token) =>
              setCaptchaToken(token)
            }
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>

        <div className="flex justify-between pt-2 text-sm">
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Create account
          </Link>

          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
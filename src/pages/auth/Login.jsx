import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", form);

      login(data.accessToken, data.refreshToken);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 400,
          background: "#fff",
          padding: 30,
          borderRadius: 10,
          boxShadow: "0 0 20px rgba(0,0,0,.1)",
        }}
      >
        <h1>SecureVault</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: 12,
            marginTop: 20,
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: 12,
            marginTop: 15,
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            marginTop: 20,
            padding: 12,
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to="/register">
            Register
          </Link>

          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
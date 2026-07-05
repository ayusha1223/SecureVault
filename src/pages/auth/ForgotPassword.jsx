import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post(
        "/auth/forgot-password",
        {
          email,
        }
      );

      toast.success(data.message);

      setEmail("");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to send reset email"
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
        onSubmit={submitHandler}
        style={{
          width: 420,
          background: "#fff",
          padding: 30,
          borderRadius: 10,
          boxShadow: "0 0 20px rgba(0,0,0,.1)",
        }}
      >
        <h1>Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: 12,
            marginTop: 20,
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
          {loading
            ? "Sending..."
            : "Send Reset Email"}
        </button>

        <div
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          <Link to="/login">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../api/axios";

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
        <h1>Reset Password</h1>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
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
            ? "Updating..."
            : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
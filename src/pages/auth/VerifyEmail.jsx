import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../api/axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await api.get(
          `/auth/verify-email/${token}`
        );

        toast.success(data.message);

        navigate("/login");
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "Verification failed"
        );
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Verifying your email...</h2>
    </div>
  );
};

export default VerifyEmail;
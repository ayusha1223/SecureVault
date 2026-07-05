import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Vault from "./pages/vault/Vault";

import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Routes>
      {/* Public */}

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

      <Route
        path="/verify-email/:token"
        element={<VerifyEmail />}
      />
      <Route
  path="/vault"
  element={
    <ProtectedRoute>
      <Vault />
    </ProtectedRoute>
  }
/>

      {/* Protected */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 */}

      <Route
        path="*"
        element={<Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
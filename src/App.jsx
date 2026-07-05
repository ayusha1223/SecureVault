import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Vault from "./pages/vault/Vault";
import AddPassword from "./pages/vault/AddPassword";
import PasswordGenerator from "./pages/vault/PasswordGenerator";
import Categories from "./pages/category/Categories";
import CategoryVaults from "./pages/category/CategoryVaults";
import Favourites from "./pages/favourite/Favourites";
import Security from "./pages/security/Security";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import Dashboard from "./pages/dashboard/Dashboard";
import Audit from "./pages/audit/Audit";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminUsers from "./admin/pages/Users";
import AdminAuditLogs from "./admin/pages/AuditLogs";
import Statistics from "./admin/pages/Statistics";
import AdminSettings from "./admin/pages/Settings";
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
  path="/vault/new"
  element={
    <ProtectedRoute>
      <AddPassword />
    </ProtectedRoute>
  }
  
/>
<Route
  path="/admin/statistics"
  element={
    <ProtectedRoute>
      <Statistics />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/settings"
  element={
    <ProtectedRoute>
      <AdminSettings />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/audit-logs"
  element={
    <ProtectedRoute>
      <AdminAuditLogs />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/users"
  element={
    <ProtectedRoute>
      <AdminUsers />
    </ProtectedRoute>
  }
/>
<Route
  path="/audit"
  element={
    <ProtectedRoute>
      <Audit />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/generator"
  element={
    <ProtectedRoute>
      <PasswordGenerator />
    </ProtectedRoute>
  }
/>
<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
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
<Route
  path="/categories"
  element={
    <ProtectedRoute>
      <Categories />
    </ProtectedRoute>
  }
/>
<Route
  path="/categories/:category"
  element={
    <ProtectedRoute>
      <CategoryVaults />
    </ProtectedRoute>
  }
/>
<Route
  path="/favourites"
  element={
    <ProtectedRoute>
      <Favourites />
    </ProtectedRoute>
  }
/>
<Route
  path="/security"
  element={
    <ProtectedRoute>
      <Security />
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
// import { Routes, Route, Navigate } from "react-router-dom";

// import ProtectedRoute from "./routes/ProtectedRoute";

// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import ResetPassword from "./pages/auth/ResetPassword";
// import VerifyEmail from "./pages/auth/VerifyEmail";

// import Dashboard from "./pages/dashboard/Dashboard";

// function App() {
//   return (
//     <Routes>
//       {/* Public */}

//       <Route path="/" element={<Navigate to="/login" />} />

//       <Route path="/login" element={<Login />} />

//       <Route path="/register" element={<Register />} />

//       <Route
//         path="/forgot-password"
//         element={<ForgotPassword />}
//       />

//       <Route
//         path="/reset-password/:token"
//         element={<ResetPassword />}
//       />

//       <Route
//         path="/verify-email/:token"
//         element={<VerifyEmail />}
//       />

//       {/* Protected */}

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* 404 */}

//       <Route
//         path="*"
//         element={<Navigate to="/login" />}
//       />
//     </Routes>
//   );
// }

// export default App;
function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <h1 className="text-5xl font-bold text-cyan-400">
        Tailwind Working 🚀
      </h1>
    </div>
  );
}

export default App;
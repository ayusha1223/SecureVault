import { useEffect, useState } from "react";
import {
  FiUsers,
  FiDatabase,
  FiFileText,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";
import { getAdminDashboard } from "../../services/adminService";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getAdminDashboard();
      setDashboard(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!dashboard) {
    return (
      <AdminLayout>
        <div className="py-20 text-center text-xl">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  const { stats, recentUsers, recentLogs } = dashboard;

  const cards = [
    {
      title: "Users",
      value: stats.totalUsers,
      color: "bg-blue-600",
      icon: FiUsers,
    },
    {
      title: "Passwords",
      value: stats.totalVaults,
      color: "bg-green-600",
      icon: FiDatabase,
    },
    {
      title: "Audit Logs",
      value: stats.totalAuditLogs,
      color: "bg-purple-600",
      icon: FiFileText,
    },
    {
      title: "Admins",
      value: stats.adminUsers,
      color: "bg-orange-600",
      icon: FiShield,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome to SecureVault Administration.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className={`${card.color} rounded-3xl p-8 text-white shadow-lg`}
              >
                <Icon size={34} />

                <h2 className="mt-5 text-4xl font-bold">
                  {card.value}
                </h2>

                <p className="mt-2 text-lg">
                  {card.title}
                </p>
              </div>
            );
          })}

        </div>

        {/* Recent Users + Logs */}

        <div className="grid gap-8 xl:grid-cols-2">

          <div className="rounded-3xl bg-white p-8 shadow">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                Recent Users
              </h2>

              <Link
                to="/admin/users"
                className="flex items-center gap-2 text-blue-600"
              >
                View All
                <FiArrowRight />
              </Link>

            </div>

            <div className="space-y-4">

              {recentUsers.map((user) => (

                <div
                  key={user._id}
                  className="flex items-center justify-between rounded-xl border p-4"
                >

                  <div>

                    <h3 className="font-semibold">
                      {user.firstName} {user.lastName}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {user.email}
                    </p>

                  </div>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {user.role}
                  </span>

                </div>

              ))}

            </div>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                Recent Audit Logs
              </h2>

              <Link
                to="/admin/audit"
                className="flex items-center gap-2 text-blue-600"
              >
                View All
                <FiArrowRight />
              </Link>

            </div>

            <div className="space-y-4">

              {recentLogs.map((log) => (

                <div
                  key={log._id}
                  className="rounded-xl border p-4"
                >

                  <h3 className="font-semibold">
                    {log.action}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {log.user
                      ? `${log.user.firstName} ${log.user.lastName}`
                      : "Unknown User"}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Quick Actions
          </h2>

          <div className="grid gap-4 md:grid-cols-4">

            <Link
              to="/admin/users"
              className="rounded-xl bg-blue-600 p-5 text-center font-semibold text-white hover:bg-blue-700"
            >
              Manage Users
            </Link>

            <Link
              to="/admin/audit"
              className="rounded-xl bg-purple-600 p-5 text-center font-semibold text-white hover:bg-purple-700"
            >
              Audit Logs
            </Link>

            <Link
              to="/admin/statistics"
              className="rounded-xl bg-green-600 p-5 text-center font-semibold text-white hover:bg-green-700"
            >
              Statistics
            </Link>

            <Link
              to="/dashboard"
              className="rounded-xl bg-slate-700 p-5 text-center font-semibold text-white hover:bg-slate-800"
            >
              User Dashboard
            </Link>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
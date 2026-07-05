import { useEffect, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatsCards from "../../components/dashboard/StatsCards";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentPasswords from "../../components/dashboard/RecentPasswords";

import { getDashboardStats } from "../../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    favourites: 0,
    weakPasswords: 0,
    securityScore: 100,
    recent: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="py-32 text-center text-xl">
          Loading Dashboard...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              Welcome back 👋
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your passwords securely.
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white shadow-lg">
            <p className="text-sm opacity-90">
              Security Score
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {stats.securityScore}%
            </h2>
          </div>

        </div>

        <StatsCards stats={stats} />

        <QuickActions />

        <RecentPasswords passwords={stats.recent} />

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
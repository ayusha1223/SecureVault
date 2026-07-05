import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatsCards from "../../components/dashboard/StatsCards";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentPasswords from "../../components/dashboard/RecentPasswords";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Welcome back 👋
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your passwords securely with SecureVault.
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white shadow-lg">

            <p className="text-sm opacity-90">
              Security Score
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              92%
            </h2>

          </div>

        </div>

        <StatsCards />

        <QuickActions />

        <RecentPasswords />

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
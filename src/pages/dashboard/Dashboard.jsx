import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatsCards from "../../components/dashboard/StatsCards";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentPasswords from "../../components/dashboard/RecentPasswords";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back! Here's an overview of your SecureVault.
          </p>
        </div>

        <StatsCards />

        <QuickActions />

        <RecentPasswords />

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
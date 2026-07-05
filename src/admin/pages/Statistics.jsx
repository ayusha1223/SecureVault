import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import AdminLayout from "../components/AdminLayout";
import { getStatistics } from "../../services/adminService";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#f59e0b",
  "#9333ea",
];

const Statistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const response = await getStatistics();
      setStats(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!stats) {
    return (
      <AdminLayout>
        <div className="py-20 text-center">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  const roleData = [
    {
      name: "Users",
      value: stats.normalUsers,
    },
    {
      name: "Admins",
      value: stats.admins,
    },
  ];

  const verifyData = [
    {
      name: "Verified",
      value: stats.verifiedUsers,
    },
    {
      name: "Unverified",
      value: stats.unverifiedUsers,
    },
  ];

  return (
    <AdminLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Statistics
          </h1>

          <p className="mt-2 text-slate-500">
            System analytics overview.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl bg-blue-600 p-8 text-white">
            <h2 className="text-4xl font-bold">
              {stats.totalUsers}
            </h2>

            <p>Total Users</p>
          </div>

          <div className="rounded-3xl bg-green-600 p-8 text-white">
            <h2 className="text-4xl font-bold">
              {stats.totalVaults}
            </h2>

            <p>Passwords</p>
          </div>

          <div className="rounded-3xl bg-purple-600 p-8 text-white">
            <h2 className="text-4xl font-bold">
              {stats.totalLogs}
            </h2>

            <p>Audit Logs</p>
          </div>

        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="mb-6 text-xl font-bold">
              User Roles
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>

                <Pie
                  data={roleData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {roleData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="mb-6 text-xl font-bold">
              Verified Accounts
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart data={verifyData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-xl font-bold">
            Password Categories
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart data={stats.categories}>

              <XAxis dataKey="_id" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#16a34a"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </AdminLayout>
  );
};

export default Statistics;
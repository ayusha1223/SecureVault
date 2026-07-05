import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#6366f1",
];

const SecurityCharts = ({ stats, passwords }) => {
  const securityData = [
    {
      name: "Strong",
      value: stats.strongPasswords,
    },
    {
      name: "Weak",
      value: stats.weakPasswords,
    },
    {
      name: "Reused",
      value: stats.reusedPasswords,
    },
    {
      name: "Expired",
      value: stats.expiredPasswords,
    },
  ];

  const categoryMap = {};

  passwords.forEach((item) => {
    const category =
      item.category || "General";

    categoryMap[category] =
      (categoryMap[category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryMap).map(
    (key) => ({
      category: key,
      total: categoryMap[key],
    })
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">

      <div className="rounded-3xl bg-white p-6 shadow">

        <h2 className="mb-5 text-2xl font-bold">
          Password Health
        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <PieChart>

            <Pie
              data={securityData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {securityData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

      <div className="rounded-3xl bg-white p-6 shadow">

        <h2 className="mb-5 text-2xl font-bold">
          Password Categories
        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={categoryData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="total"
              fill="#2563eb"
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default SecurityCharts;
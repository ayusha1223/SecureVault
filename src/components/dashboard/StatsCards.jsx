import {
  FiAlertTriangle,
  FiLock,
  FiShield,
  FiRefreshCw,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

import StatCard from "./StatCard";

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Passwords",
      value: stats.total,
      subtitle: "Stored securely",
      icon: FiLock,
      gradient: "from-blue-500 to-blue-700",
    },

    {
      title: "Strong Passwords",
      value: stats.strongPasswords,
      subtitle: "Highly secure",
      icon: FiCheckCircle,
      gradient: "from-green-500 to-emerald-600",
    },

    {
      title: "Weak Passwords",
      value: stats.weakPasswords,
      subtitle:
        stats.weakPasswords === 0
          ? "Excellent"
          : "Needs attention",
      icon: FiAlertTriangle,
      gradient: "from-red-500 to-pink-600",
    },

    {
      title: "Reused Passwords",
      value: stats.reusedPasswords,
      subtitle:
        stats.reusedPasswords === 0
          ? "No duplicates"
          : "Change immediately",
      icon: FiRefreshCw,
      gradient: "from-orange-500 to-yellow-500",
    },

    {
      title: "Expired Passwords",
      value: stats.expiredPasswords,
      subtitle:
        stats.expiredPasswords === 0
          ? "Up to date"
          : "Update now",
      icon: FiClock,
      gradient: "from-rose-500 to-red-600",
    },

    {
      title: "Security Score",
      value: `${stats.securityScore}%`,
      subtitle:
        stats.securityScore >= 90
          ? "Excellent"
          : stats.securityScore >= 70
          ? "Good"
          : "Needs Improvement",
      icon: FiShield,
      gradient: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          subtitle={card.subtitle}
          icon={card.icon}
          gradient={card.gradient}
        />
      ))}
    </div>
  );
};

export default StatsCards;
import {
  FiAlertTriangle,
  FiLock,
  FiShield,
  FiStar,
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
      title: "Favourites",
      value: stats.favourites,
      subtitle: "Quick access",
      icon: FiStar,
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      title: "Security Score",
      value: `${stats.securityScore}%`,
      subtitle:
        stats.securityScore >= 90
          ? "Excellent"
          : stats.securityScore >= 70
          ? "Good"
          : "Needs improvement",
      icon: FiShield,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Weak Passwords",
      value: stats.weakPasswords,
      subtitle:
        stats.weakPasswords === 0
          ? "No weak passwords"
          : "Needs attention",
      icon: FiAlertTriangle,
      gradient: "from-red-500 to-pink-600",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
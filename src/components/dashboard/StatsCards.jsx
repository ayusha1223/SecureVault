import {
  FiLock,
  FiStar,
  FiShield,
  FiAlertTriangle,
} from "react-icons/fi";

const cards = [
  {
    title: "Stored Passwords",
    value: "0",
    icon: <FiLock size={26} />,
    color: "bg-blue-600",
  },
  {
    title: "Favourites",
    value: "0",
    icon: <FiStar size={26} />,
    color: "bg-yellow-500",
  },
  {
    title: "Security Score",
    value: "100%",
    icon: <FiShield size={26} />,
    color: "bg-green-600",
  },
  {
    title: "Weak Passwords",
    value: "0",
    icon: <FiAlertTriangle size={26} />,
    color: "bg-red-500",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {card.title}
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                {card.value}
              </h2>
            </div>

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-xl text-white ${card.color}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
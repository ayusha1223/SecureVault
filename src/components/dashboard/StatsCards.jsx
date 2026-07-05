import {
  FiLock,
  FiStar,
  FiShield,
  FiAlertTriangle,
} from "react-icons/fi";

const cards = [
  {
    title: "Passwords",
    value: 126,
    change: "+12%",
    color: "from-blue-500 to-blue-700",
    icon: FiLock,
  },
  {
    title: "Favourites",
    value: 18,
    change: "+3",
    color: "from-yellow-400 to-orange-500",
    icon: FiStar,
  },
  {
    title: "Security Score",
    value: "92%",
    change: "Excellent",
    color: "from-green-500 to-emerald-600",
    icon: FiShield,
  },
  {
    title: "Weak Passwords",
    value: 4,
    change: "-2",
    color: "from-red-500 to-pink-600",
    icon: FiAlertTriangle,
  },
];

const StatsCards = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              className={`h-2 bg-gradient-to-r ${card.color}`}
            />

            <div className="flex items-center justify-between p-6">

              <div>

                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-900">
                  {card.value}
                </h2>

                <p className="mt-3 text-sm font-medium text-green-600">
                  {card.change}
                </p>

              </div>

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white`}
              >
                <Icon size={28} />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
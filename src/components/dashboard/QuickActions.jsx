import { Link } from "react-router-dom";
import {
  FiPlusCircle,
  FiKey,
  FiDownload,
  FiShield,
} from "react-icons/fi";

const actions = [
  {
    title: "Add Password",
    icon: <FiPlusCircle size={24} />,
    color: "bg-blue-600",
    path: "/vault/new",
  },
  {
    title: "Generate Password",
    icon: <FiKey size={24} />,
    color: "bg-green-600",
    path: "/generator",
  },
  {
    title: "Export Vault",
    icon: <FiDownload size={24} />,
    color: "bg-purple-600",
    path: "/export",
  },
  {
    title: "Security Center",
    icon: <FiShield size={24} />,
    color: "bg-red-600",
    path: "/security",
  },
];

const QuickActions = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.path}
            className={`${action.color} flex flex-col items-center justify-center rounded-2xl p-6 text-white transition hover:scale-105`}
          >
            {action.icon}

            <span className="mt-3 text-center font-semibold">
              {action.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
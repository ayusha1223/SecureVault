import {
  FiPlus,
  FiKey,
  FiDownload,
  FiUpload,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Password",
      subtitle: "Save credentials",
      icon: FiPlus,
      color: "bg-blue-600",
      action: () => navigate("/vault/new"),
    },
    {
      title: "Generator",
      subtitle: "Strong password",
      icon: FiKey,
      color: "bg-green-600",
      action: () => navigate("/generator"),
    },
    {
      title: "Import",
      subtitle: "CSV / JSON",
      icon: FiUpload,
      color: "bg-orange-500",
      action: () => {},
    },
    {
      title: "Export",
      subtitle: "Backup vault",
      icon: FiDownload,
      color: "bg-purple-600",
      action: () => {},
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Quick Actions
        </h2>

        <p className="text-slate-500">
          Frequently used actions
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={item.action}
              className="group rounded-2xl border border-slate-200 p-6 text-left transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
            >
              <div
                className={`${item.color} mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-white`}
              >
                <Icon size={24} />
              </div>

              <h3 className="text-lg font-bold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {item.subtitle}
              </p>
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default QuickActions;
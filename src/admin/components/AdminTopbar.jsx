import { FiShield } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const AdminTopbar = () => {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-5 shadow-sm">

      <div>
        <h1 className="text-2xl font-bold">
          SecureVault Admin
        </h1>

        <p className="text-sm text-slate-500">
          {today}
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="rounded-full bg-blue-100 p-3 text-blue-600">
          <FiShield size={22} />
        </div>

        <div className="text-right">
          <h3 className="font-semibold">
            {user?.firstName} {user?.lastName}
          </h3>

          <p className="text-sm text-slate-500">
            Administrator
          </p>
        </div>

      </div>

    </header>
  );
};

export default AdminTopbar;
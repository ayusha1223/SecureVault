import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
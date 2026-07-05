import { useEffect, useMemo, useState } from "react";
import {
  FiActivity,
  FiSearch,
} from "react-icons/fi";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getMyLogs } from "../../services/auditService";

const Audit = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const data = await getMyLogs();
      setLogs(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const q = search.toLowerCase();

      const matchesSearch =
        log.action.toLowerCase().includes(q) ||
        log.resource.toLowerCase().includes(q);

      const matchesFilter =
        filter === "ALL" || log.action === filter;

      return matchesSearch && matchesFilter;
    });
  }, [logs, search, filter]);

  const actions = [
    "ALL",
    ...new Set(logs.map((l) => l.action)),
  ];

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Audit Logs
          </h1>

          <p className="mt-2 text-slate-500">
            Track all account activity.
          </p>

        </div>

        <div className="flex flex-col gap-4 md:flex-row">

          <div className="relative flex-1">

            <FiSearch className="absolute left-4 top-4 text-slate-400" />

            <input
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border py-3 pl-12 pr-4"
            />

          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="rounded-xl border px-4"
          >
            {actions.map((action) => (
              <option
                key={action}
                value={action}
              >
                {action}
              </option>
            ))}
          </select>

        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">
                  Action
                </th>

                <th className="p-4 text-left">
                  Resource
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  IP Address
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredLogs.map((log) => (

                <tr
                  key={log._id}
                  className="border-t"
                >

                  <td className="p-4">

                    <div className="flex items-center gap-2">

                      <FiActivity />

                      {log.action}

                    </div>

                  </td>

                  <td className="p-4">
                    {log.resource}
                  </td>

                  <td className="p-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        log.status === "SUCCESS"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {log.status}
                    </span>

                  </td>

                  <td className="p-4">
                    {log.ipAddress || "-"}
                  </td>

                  <td className="p-4">
                    {new Date(
                      log.createdAt
                    ).toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Audit;
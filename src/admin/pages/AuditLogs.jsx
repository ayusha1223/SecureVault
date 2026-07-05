import { useEffect, useMemo, useState } from "react";
import {
  FiSearch,
  FiCheckCircle,
  FiXCircle,
  FiFileText,
} from "react-icons/fi";
import toast from "react-hot-toast";

import AdminLayout from "../components/AdminLayout";
import { getAuditLogs } from "../../services/adminService";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const logsPerPage = 8;

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status]);

  const loadLogs = async () => {
    try {
      const response = await getAuditLogs();
      setLogs(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const text =
        `${log.action}
         ${log.resource}
         ${log.user?.firstName ?? ""}
         ${log.user?.lastName ?? ""}
         ${log.details ?? ""}`
          .toLowerCase();

      const matchesSearch = text.includes(
        search.toLowerCase()
      );

      const matchesStatus =
        status === "ALL" ||
        log.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [logs, search, status]);

  const totalPages = Math.ceil(
    filteredLogs.length / logsPerPage
  );

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  return (
    <AdminLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Audit Logs
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor all system activities.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">

          <div className="relative flex-1">

            <FiSearch
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search audit logs..."
              className="w-full rounded-xl border py-3 pl-12 pr-4"
            />

          </div>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="rounded-xl border px-5"
          >
            <option value="ALL">
              All Logs
            </option>

            <option value="SUCCESS">
              Success
            </option>

            <option value="FAILED">
              Failed
            </option>

          </select>

        </div>

        {loading ? (
          <div className="py-20 text-center">
            Loading...
          </div>
        ) : paginatedLogs.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            No audit logs found.
          </div>
        ) : (
          <div className="space-y-4">

            {paginatedLogs.map((log) => (

              <div
                key={log._id}
                className="rounded-2xl bg-white p-6 shadow"
              >

                <div className="flex items-start justify-between">

                  <div className="flex gap-5">

                    <div className="rounded-full bg-blue-100 p-4">

                      <FiFileText
                        size={24}
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <h2 className="text-lg font-bold">
                        {log.action}
                      </h2>

                      <p className="text-slate-500">
                        {log.resource || "System"}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        <strong>User:</strong>{" "}
                        {log.user
                          ? `${log.user.firstName} ${log.user.lastName}`
                          : "Unknown"}
                      </p>

                      <p className="text-sm text-slate-500">
                        <strong>Details:</strong>{" "}
                        {log.details || "-"}
                      </p>

                      <p className="mt-2 text-sm text-slate-400">
                        {new Date(
                          log.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>

                  {log.status === "SUCCESS" ? (
                    <span className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">
                      <FiCheckCircle />
                      SUCCESS
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-red-700">
                      <FiXCircle />
                      FAILED
                    </span>
                  )}

                </div>

              </div>

            ))}

          </div>
        )}

        {!loading && totalPages > 1 && (

          <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">

            <p className="text-sm text-slate-500">
              Showing{" "}
              {(currentPage - 1) * logsPerPage + 1}
              {" - "}
              {Math.min(
                currentPage * logsPerPage,
                filteredLogs.length
              )}
              {" "}of{" "}
              {filteredLogs.length} logs
            </p>

            <div className="flex flex-wrap gap-2">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((p) => p - 1)
                }
                className="rounded-lg border px-4 py-2 disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setCurrentPage(i + 1)
                    }
                    className={`rounded-lg px-4 py-2 ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "border hover:bg-slate-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage((p) => p + 1)
                }
                className="rounded-lg border px-4 py-2 disabled:opacity-40"
              >
                Next
              </button>

            </div>

          </div>

        )}

      </div>
    </AdminLayout>
  );
};

export default AuditLogs;
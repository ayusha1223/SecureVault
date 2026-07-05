import { useEffect, useMemo, useState } from "react";
import {
  FiSearch,
  FiLock,
  FiUnlock,
  FiTrash2,
} from "react-icons/fi";
import toast from "react-hot-toast";

import AdminLayout from "../components/AdminLayout";

import {
  getUsers,
  lockUser,
  unlockUser,
  deleteUser,
} from "../../services/adminService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.firstName} ${user.lastName} ${user.email} ${user.role}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleLock = async (id) => {
    try {
      await lockUser(id);
      toast.success("User locked");
      loadUsers();
    } catch {
      toast.error("Unable to lock user");
    }
  };

  const handleUnlock = async (id) => {
    try {
      await unlockUser(id);
      toast.success("User unlocked");
      loadUsers();
    } catch {
      toast.error("Unable to unlock user");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      toast.success("User deleted");
      loadUsers();
    } catch {
      toast.error("Unable to delete user");
    }
  };

  return (
    <AdminLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            User Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all SecureVault users.
          </p>

        </div>

        <div className="relative">

          <FiSearch
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-2xl border py-3 pl-12 pr-4"
          />

        </div>

        {loading ? (
          <div className="py-20 text-center">
            Loading...
          </div>
        ) : paginatedUsers.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            No users found.
          </div>
        ) : (
          <div className="space-y-5">

            {paginatedUsers.map((user) => (

              <div
                key={user._id}
                className="rounded-2xl bg-white p-6 shadow"
              >

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex items-center gap-5">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </div>

                    <div>

                      <h2 className="text-xl font-bold">
                        {user.firstName} {user.lastName}
                      </h2>

                      <p className="text-slate-500">
                        {user.email}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                          {user.role}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-sm ${
                            user.isVerified
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.isVerified
                            ? "Verified"
                            : "Unverified"}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-sm ${
                            user.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {user.isActive
                            ? "Active"
                            : "Locked"}
                        </span>

                      </div>

                      <p className="mt-3 text-sm text-slate-500">
                        Last Login:{" "}
                        {user.lastLogin
                          ? new Date(
                              user.lastLogin
                            ).toLocaleString()
                          : "Never"}
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-3">

                    {user.isActive ? (
                      <button
                        onClick={() =>
                          handleLock(user._id)
                        }
                        className="rounded-xl bg-yellow-500 p-3 text-white hover:bg-yellow-600"
                      >
                        <FiLock />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleUnlock(user._id)
                        }
                        className="rounded-xl bg-green-600 p-3 text-white hover:bg-green-700"
                      >
                        <FiUnlock />
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleDelete(user._id)
                      }
                      className="rounded-xl bg-red-600 p-3 text-white hover:bg-red-700"
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

        {!loading && totalPages > 1 && (

          <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">

            <p className="text-sm text-slate-500">
              Showing{" "}
              {(currentPage - 1) * usersPerPage + 1}
              {" - "}
              {Math.min(
                currentPage * usersPerPage,
                filteredUsers.length
              )}{" "}
              of {filteredUsers.length} users
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
                (_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                    className={`rounded-lg px-4 py-2 ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "border hover:bg-slate-100"
                    }`}
                  >
                    {index + 1}
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

export default Users;
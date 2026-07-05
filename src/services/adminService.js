import api from "../api/axios";

export const getDashboardStats = async () => {
  const { data } = await api.get("/admin/dashboard");
  return data;
};

export const getUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data;
};

export const lockUser = async (id) => {
  const { data } = await api.put(`/admin/users/${id}/lock`);
  return data;
};

export const unlockUser = async (id) => {
  const { data } = await api.put(`/admin/users/${id}/unlock`);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/admin/users/${id}`);
  return data;
};

export const getAuditLogs = async () => {
  const { data } = await api.get("/admin/audit-logs");
  return data;
};
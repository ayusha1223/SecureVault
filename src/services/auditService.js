import api from "../api/axios";

export const getMyLogs = async () => {
  const { data } = await api.get("/audit/me");
  return data;
};

export const getAllLogs = async () => {
  const { data } = await api.get("/audit/all");
  return data;
};
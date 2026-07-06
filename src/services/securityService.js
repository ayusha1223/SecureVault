import api from "../api/axios";

export const getSecurityData = async () => {
  const { data } = await api.get("/vault/health");

  return data.data;
};
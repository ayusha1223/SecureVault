import api from "../api/axios";

export const getVaults = async () => {
  const { data } = await api.get("/vault");
  return data;
};

export const getVault = async (id) => {
  const { data } = await api.get(`/vault/${id}`);
  return data;
};

export const createVault = async (vault) => {
  const { data } = await api.post("/vault", vault);
  return data;
};

export const updateVault = async (id, vault) => {
  const { data } = await api.put(`/vault/${id}`, vault);
  return data;
};

export const deleteVault = async (id) => {
  const { data } = await api.delete(`/vault/${id}`);
  return data;
};

export const searchVault = async (query) => {
  const { data } = await api.get(`/vault/search?q=${query}`);
  return data;
};

export const favourites = async () => {
  const { data } = await api.get("/vault/favourites");
  return data;
};

export const toggleFavourite = async (id) => {
  const { data } = await api.patch(`/vault/favourite/${id}`);
  return data;
};
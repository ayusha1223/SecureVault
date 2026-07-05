import api from "../api/axios";

/* ===========================
   Profile
=========================== */

export const getProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

export const updateProfile = async (profile) => {
  const { data } = await api.put(
    "/users/profile",
    profile
  );

  return data;
};

export const changePassword = async (passwords) => {
  const { data } = await api.put(
    "/users/change-password",
    passwords
  );

  return data;
};
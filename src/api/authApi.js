import axiosClient from "./axiosClient";

export const authApi = {
  register: (data) => axiosClient.post("/auth/register", data),
  login: (data) => axiosClient.post("/auth/login", data),
  logout: () => axiosClient.post("/auth/logout"),
  getProfile: () => axiosClient.get("/auth/profile"),
  updateProfile: (data) => axiosClient.put("/auth/profile", data),
  changePassword: (data) => axiosClient.put("/auth/change-password", data),
};

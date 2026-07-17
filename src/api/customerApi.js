import axiosClient from "./axiosClient";

export const customerApi = {
  getDashboard: () => axiosClient.get("/user/dashboard"),
  getCategories: () => axiosClient.get("/user/categories"),
  getServices: (params) => axiosClient.get("/user/services", { params }),
  getServiceById: (id) => axiosClient.get(`/user/services/${id}`),
  getProviders: (params) => axiosClient.get("/user/providers", { params }),
  getProviderById: (id) => axiosClient.get(`/user/providers/${id}`),
  createBooking: (data) => axiosClient.post("/user/bookings", data),
  getBookings: () => axiosClient.get("/user/bookings"),
  getBookingById: (id) => axiosClient.get(`/user/bookings/${id}`),
  cancelBooking: (id) => axiosClient.put(`/user/bookings/${id}/cancel`),
  getReviews: () => axiosClient.get("/user/reviews"),
  createReview: (data) => axiosClient.post("/user/reviews", data),
  getNotifications: () => axiosClient.get("/user/notifications"),
  getFavorites: () => axiosClient.get("/user/favorites"),
  toggleFavorite: (id) => axiosClient.post(`/user/favorites/${id}/toggle`),
};

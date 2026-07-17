import axiosClient from "./axiosClient";

export const providerApi = {
  getDashboard: () => axiosClient.get("/provider/dashboard"),
  getProfile: () => axiosClient.get("/provider/profile"),
  updateProfile: (data) => axiosClient.put("/provider/profile", data),
  getServices: () => axiosClient.get("/provider/services"),
  createService: (data) => axiosClient.post("/provider/services", data),
  updateService: (id, data) => axiosClient.put(`/provider/services/${id}`, data),
  deleteService: (id) => axiosClient.delete(`/provider/services/${id}`),
  getBookings: () => axiosClient.get("/provider/bookings"),
  getBookingById: (id) => axiosClient.get(`/provider/bookings/${id}`),
  confirmBooking: (id) => axiosClient.put(`/provider/bookings/${id}/confirm`),
  completeBooking: (id) => axiosClient.put(`/provider/bookings/${id}/complete`),
  cancelBooking: (id) => axiosClient.put(`/provider/bookings/${id}/cancel`),
  getAvailability: () => axiosClient.get("/provider/availability"),
  updateAvailability: (data) => axiosClient.put("/provider/availability", data),
  getEarnings: () => axiosClient.get("/provider/earnings"),
  getReviews: () => axiosClient.get("/provider/reviews"),
  getNotifications: () => axiosClient.get("/provider/notifications"),
};

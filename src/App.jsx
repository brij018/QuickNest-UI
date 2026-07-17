import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppShell from "./components/layout/AppShell";

// Public
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const Home = lazy(() => import("./pages/public/Home"));
const NotFound = lazy(() => import("./pages/public/NotFound"));

// Customer
const CustomerDashboard = lazy(() => import("./pages/customer/Dashboard"));
const Browse = lazy(() => import("./pages/customer/Browse"));
const Bookings = lazy(() => import("./pages/customer/Bookings"));
const BookingDetail = lazy(() => import("./pages/customer/BookingDetail"));
const Favorites = lazy(() => import("./pages/customer/Favorites"));
const Notifications = lazy(() => import("./pages/customer/Notifications"));

// Provider
const ProviderDashboard = lazy(() => import("./pages/provider/Dashboard"));
const ProviderServices = lazy(() => import("./pages/provider/Services"));
const ProviderBookings = lazy(() => import("./pages/provider/Bookings"));
const Availability = lazy(() => import("./pages/provider/Availability"));
const Earnings = lazy(() => import("./pages/provider/Earnings"));
const ProviderReviews = lazy(() => import("./pages/provider/Reviews"));

// Admin
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const Users = lazy(() => import("./pages/admin/Users"));
const Providers = lazy(() => import("./pages/admin/Providers"));
const Categories = lazy(() => import("./pages/admin/Categories"));
const Services = lazy(() => import("./pages/admin/Services"));
const AdminBookings = lazy(() => import("./pages/admin/Bookings"));
const AdminReviews = lazy(() => import("./pages/admin/Reviews"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));

// Shared
const Profile = lazy(() => import("./pages/shared/Profile"));

function PageLoader() {
  return (
    <div className="flex h-full items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="h-8 w-8 rounded-full border-2 border-brand-500 border-t-transparent"
      />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected App Shell */}
        <Route element={<AppShell />}>
          {/* Customer */}
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["user"]}><CustomerDashboard /></ProtectedRoute>} />
          <Route path="/browse" element={<ProtectedRoute allowedRoles={["user"]}><Browse /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute allowedRoles={["user"]}><Bookings /></ProtectedRoute>} />
          <Route path="/bookings/:id" element={<ProtectedRoute allowedRoles={["user"]}><BookingDetail /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute allowedRoles={["user"]}><Favorites /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute allowedRoles={["user"]}><Notifications /></ProtectedRoute>} />

          {/* Provider */}
          <Route path="/provider/dashboard" element={<ProtectedRoute allowedRoles={["provider"]}><ProviderDashboard /></ProtectedRoute>} />
          <Route path="/provider/services" element={<ProtectedRoute allowedRoles={["provider"]}><ProviderServices /></ProtectedRoute>} />
          <Route path="/provider/bookings" element={<ProtectedRoute allowedRoles={["provider"]}><ProviderBookings /></ProtectedRoute>} />
          <Route path="/provider/availability" element={<ProtectedRoute allowedRoles={["provider"]}><Availability /></ProtectedRoute>} />
          <Route path="/provider/earnings" element={<ProtectedRoute allowedRoles={["provider"]}><Earnings /></ProtectedRoute>} />
          <Route path="/provider/reviews" element={<ProtectedRoute allowedRoles={["provider"]}><ProviderReviews /></ProtectedRoute>} />

          {/* Admin/Super Admin */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin", "super_admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["admin", "super_admin"]}><Users /></ProtectedRoute>} />
          <Route path="/admin/providers" element={<ProtectedRoute allowedRoles={["admin", "super_admin"]}><Providers /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute allowedRoles={["admin", "super_admin"]}><Categories /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute allowedRoles={["admin", "super_admin"]}><Services /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute allowedRoles={["admin", "super_admin"]}><AdminBookings /></ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute allowedRoles={["admin", "super_admin"]}><AdminReviews /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={["admin", "super_admin"]}><AdminSettings /></ProtectedRoute>} />

          {/* Shared */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

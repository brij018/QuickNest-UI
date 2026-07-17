import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-surface-50 dark:bg-surface-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-8 w-8 rounded-full border-2 border-brand-500 border-t-transparent"
        />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    const fallback = user?.role === "super_admin" || user?.role === "admin" ? "/admin/dashboard"
      : user?.role === "provider" ? "/provider/dashboard"
      : "/dashboard";
    return <Navigate to={fallback} replace />;
  }

  return children;
}

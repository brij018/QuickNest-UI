import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUsers, FiBriefcase, FiCalendar, FiDollarSign, FiLayers, FiStar, FiArrowRight } from "react-icons/fi";
import { adminApi } from "../../api/adminApi";
import { useToast } from "../../hooks/useToast";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import { formatDate, formatCurrency, getStatusColor } from "../../lib/utils";

export default function AdminDashboard() {
  const { addToast } = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await adminApi.getDashboard();
        setData(res.data?.data || res.data || {});
      } catch (err) {
        addToast("Failed to load dashboard", "error");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [addToast]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-28" count={4} />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const stats = [
    { title: "Total Users", value: data?.totalUsers || 0, icon: FiUsers, color: "brand" },
    { title: "Providers", value: data?.totalProviders || 0, icon: FiBriefcase, color: "violet" },
    { title: "Bookings", value: data?.totalBookings || 0, icon: FiCalendar, color: "emerald" },
    { title: "Revenue", value: formatCurrency(data?.totalRevenue || 0), icon: FiDollarSign, color: "amber" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Admin Dashboard</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Overview of platform activity</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Recent Bookings</h3>
            <Link to="/admin/bookings" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
              View all <FiArrowRight size={14} />
            </Link>
          </div>
          {data?.recentBookings?.length ? (
            <div className="space-y-3">
              {data.recentBookings.map((b) => (
                <div key={b._id} className="flex items-center justify-between rounded-xl border border-surface-100 dark:border-surface-800 p-3">
                  <div>
                    <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{b.customer?.name || "Customer"}</p>
                    <p className="text-xs text-surface-500">{b.service?.name || "Service"} · {formatDate(b.date)}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(b.status)}`}>{b.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={FiCalendar} title="No recent bookings" />
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Quick Actions</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link to="/admin/users">
              <div className="rounded-xl border border-surface-200 dark:border-surface-700 p-4 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                <FiUsers className="text-brand-500 mb-2" size={20} />
                <p className="text-sm font-medium text-surface-900 dark:text-surface-100">Manage Users</p>
                <p className="text-xs text-surface-500 mt-0.5">View and edit users</p>
              </div>
            </Link>
            <Link to="/admin/providers">
              <div className="rounded-xl border border-surface-200 dark:border-surface-700 p-4 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                <FiBriefcase className="text-violet-500 mb-2" size={20} />
                <p className="text-sm font-medium text-surface-900 dark:text-surface-100">Verify Providers</p>
                <p className="text-xs text-surface-500 mt-0.5">Approve new providers</p>
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

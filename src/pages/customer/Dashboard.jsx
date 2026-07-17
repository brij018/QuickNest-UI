import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCalendar, FiHeart, FiStar, FiClock, FiArrowRight } from "react-icons/fi";
import { customerApi } from "../../api/customerApi";
import { useToast } from "../../hooks/useToast";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import { formatDate, getStatusColor } from "../../lib/utils";

export default function CustomerDashboard() {
  const { addToast } = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await customerApi.getDashboard();
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
    { title: "Total Bookings", value: data?.totalBookings || 0, icon: FiCalendar, color: "brand" },
    { title: "Completed", value: data?.completedBookings || 0, icon: FiStar, color: "emerald" },
    { title: "Pending", value: data?.pendingBookings || 0, icon: FiClock, color: "amber" },
    { title: "Favorites", value: data?.totalFavorites || 0, icon: FiHeart, color: "rose" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Dashboard</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Welcome back! Here's what's happening.</p>
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
            <Link to="/bookings" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
              View all <FiArrowRight size={14} />
            </Link>
          </div>
          {data?.recentBookings?.length ? (
            <div className="space-y-3">
              {data.recentBookings.map((b) => (
                <div key={b._id} className="flex items-center justify-between rounded-xl border border-surface-100 dark:border-surface-800 p-3">
                  <div>
                    <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{b.service?.name || "Service"}</p>
                    <p className="text-xs text-surface-500">{formatDate(b.date)}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(b.status)}`}>{b.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={FiCalendar} title="No bookings yet" description="Book your first service to see it here." />
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Quick Actions</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link to="/browse">
              <div className="rounded-xl border border-surface-200 dark:border-surface-700 p-4 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                <FiStar className="text-brand-500 mb-2" size={20} />
                <p className="text-sm font-medium text-surface-900 dark:text-surface-100">Browse Services</p>
                <p className="text-xs text-surface-500 mt-0.5">Find what you need</p>
              </div>
            </Link>
            <Link to="/bookings">
              <div className="rounded-xl border border-surface-200 dark:border-surface-700 p-4 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                <FiCalendar className="text-emerald-500 mb-2" size={20} />
                <p className="text-sm font-medium text-surface-900 dark:text-surface-100">My Bookings</p>
                <p className="text-xs text-surface-500 mt-0.5">Track your appointments</p>
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

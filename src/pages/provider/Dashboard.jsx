import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCalendar, FiDollarSign, FiStar, FiLayers, FiArrowRight } from "react-icons/fi";
import { providerApi } from "../../api/providerApi";
import { useToast } from "../../hooks/useToast";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import { formatDate, formatCurrency, getStatusColor } from "../../lib/utils";

export default function ProviderDashboard() {
  const { addToast } = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await providerApi.getDashboard();
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
    { title: "Revenue", value: formatCurrency(data?.totalEarnings || 0), icon: FiDollarSign, color: "emerald" },
    { title: "Rating", value: data?.averageRating?.toFixed(1) || "0.0", icon: FiStar, color: "amber" },
    { title: "Services", value: data?.totalServices || 0, icon: FiLayers, color: "violet" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Provider Dashboard</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Manage your services and bookings</p>
        </div>
        <Link to="/provider/services">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors">
            Manage Services
          </motion.button>
        </Link>
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
            <Link to="/provider/bookings" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
              View all <FiArrowRight size={14} />
            </Link>
          </div>
          {data?.recentBookings?.length ? (
            <div className="space-y-3">
              {data.recentBookings.map((b) => (
                <div key={b._id} className="flex items-center justify-between rounded-xl border border-surface-100 dark:border-surface-800 p-3">
                  <div>
                    <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{b.customer?.name || "Customer"}</p>
                    <p className="text-xs text-surface-500">{formatDate(b.date)}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(b.status)}`}>{b.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={FiCalendar} title="No bookings yet" description="Bookings will appear here when customers book your services." />
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Quick Actions</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link to="/provider/services">
              <div className="rounded-xl border border-surface-200 dark:border-surface-700 p-4 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                <FiLayers className="text-brand-500 mb-2" size={20} />
                <p className="text-sm font-medium text-surface-900 dark:text-surface-100">My Services</p>
                <p className="text-xs text-surface-500 mt-0.5">Add or edit services</p>
              </div>
            </Link>
            <Link to="/provider/availability">
              <div className="rounded-xl border border-surface-200 dark:border-surface-700 p-4 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                <FiCalendar className="text-emerald-500 mb-2" size={20} />
                <p className="text-sm font-medium text-surface-900 dark:text-surface-100">Availability</p>
                <p className="text-xs text-surface-500 mt-0.5">Set your schedule</p>
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

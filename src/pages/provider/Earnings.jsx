import { useEffect, useState } from "react";
import { FiDollarSign, FiTrendingUp, FiCalendar } from "react-icons/fi";
import { providerApi } from "../../api/providerApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import { formatCurrency, formatDate } from "../../lib/utils";

export default function Earnings() {
  const { addToast } = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await providerApi.getEarnings();
        setData(res.data?.data || res.data || {});
      } catch {
        addToast("Failed to load earnings", "error");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [addToast]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Skeleton className="h-28" count={3} />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const stats = [
    { title: "Total Earnings", value: formatCurrency(data?.total || 0), icon: FiDollarSign, color: "emerald" },
    { title: "This Month", value: formatCurrency(data?.thisMonth || 0), icon: FiTrendingUp, color: "brand" },
    { title: "Completed Jobs", value: data?.completedJobs || 0, icon: FiCalendar, color: "violet" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Earnings</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Track your revenue and payouts</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      <Card>
        <h3 className="section-title mb-4">Recent Transactions</h3>
        {data?.transactions?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 dark:border-surface-700 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Booking</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {data.transactions.map((t) => (
                  <tr key={t._id}>
                    <td className="py-3 pr-4 font-medium text-surface-900 dark:text-surface-100">{t.booking?.service?.name || "—"}</td>
                    <td className="py-3 pr-4 text-surface-500">{formatDate(t.date)}</td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Paid</span>
                    </td>
                    <td className="py-3 text-right font-semibold text-emerald-600">{formatCurrency(t.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon={FiDollarSign} title="No transactions yet" description="Earnings will appear here after completed bookings." />
        )}
      </Card>
    </div>
  );
}

import { useEffect, useState } from "react";
import { FiCalendar, FiSearch } from "react-icons/fi";
import { adminApi } from "../../api/adminApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";
import { formatDate, formatCurrency, getStatusColor } from "../../lib/utils";

export default function AdminBookings() {
  const { addToast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await adminApi.getAllBookings();
        setBookings(res.data?.data || res.data || []);
      } catch {
        addToast("Failed to load bookings", "error");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [addToast]);

  const filtered = bookings.filter((b) => !search || b.customer?.name?.toLowerCase().includes(search.toLowerCase()) || b.service?.name?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Bookings</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">All platform bookings</p>
        </div>
        <div className="w-full sm:w-64">
          <Input placeholder="Search bookings..." icon={FiSearch} value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <Card>
        {filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 dark:border-surface-700 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Service</th>
                  <th className="pb-3 pr-4">Provider</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Price</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {filtered.map((b) => (
                  <tr key={b._id}>
                    <td className="py-3 pr-4 font-medium text-surface-900 dark:text-surface-100">{b.customer?.name || "—"}</td>
                    <td className="py-3 pr-4 text-surface-500">{b.service?.name || "—"}</td>
                    <td className="py-3 pr-4 text-surface-500">{b.provider?.name || b.provider?.businessName || "—"}</td>
                    <td className="py-3 pr-4 text-surface-500">{formatDate(b.date)}</td>
                    <td className="py-3 pr-4 text-surface-500">{formatCurrency(b.price)}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(b.status)}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon={FiCalendar} title="No bookings found" description="No bookings match your search." />
        )}
      </Card>
    </div>
  );
}

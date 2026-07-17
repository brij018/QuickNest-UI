import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiEye } from "react-icons/fi";
import { customerApi } from "../../api/customerApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import { formatDate, getStatusColor } from "../../lib/utils";

export default function Bookings() {
  const { addToast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await customerApi.getBookings();
        setBookings(res.data?.data || res.data || []);
      } catch (err) {
        addToast("Failed to load bookings", "error");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [addToast]);

  if (loading) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">My Bookings</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Track and manage your appointments</p>
      </div>

      <Card>
        {bookings.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 dark:border-surface-700 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Service</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {bookings.map((b) => (
                  <tr key={b._id} className="group">
                    <td className="py-3 pr-4 font-medium text-surface-900 dark:text-surface-100">{b.service?.name || "Service"}</td>
                    <td className="py-3 pr-4 text-surface-500">{formatDate(b.date)}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link to={`/bookings/${b._id}`} className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
                        <FiEye size={14} /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon={FiCalendar} title="No bookings yet" description="Browse services and make your first booking." actionLabel="Browse Services" onAction={() => window.location.href = "/browse"} />
        )}
      </Card>
    </div>
  );
}

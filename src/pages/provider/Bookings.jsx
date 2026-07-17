import { useEffect, useState } from "react";
import { FiCalendar, FiCheck, FiX, FiCheckCircle } from "react-icons/fi";
import { providerApi } from "../../api/providerApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import { formatDate, getStatusColor } from "../../lib/utils";

export default function ProviderBookings() {
  const { addToast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await providerApi.getBookings();
      setBookings(res.data?.data || res.data || []);
    } catch {
      addToast("Failed to load bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, action) => {
    try {
      if (action === "confirm") await providerApi.confirmBooking(id);
      else if (action === "complete") await providerApi.completeBooking(id);
      else if (action === "cancel") await providerApi.cancelBooking(id);
      addToast(`Booking ${action}ed`, "success");
      fetchBookings();
    } catch {
      addToast("Action failed", "error");
    }
  };

  if (loading) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Bookings</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Manage incoming and past bookings</p>
      </div>

      <Card>
        {bookings.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 dark:border-surface-700 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Service</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td className="py-3 pr-4 font-medium text-surface-900 dark:text-surface-100">{b.customer?.name || "—"}</td>
                    <td className="py-3 pr-4 text-surface-500">{b.service?.name || "—"}</td>
                    <td className="py-3 pr-4 text-surface-500">{formatDate(b.date)}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(b.status)}`}>{b.status}</span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {b.status === "pending" && (
                          <>
                            <Button variant="success" size="sm" onClick={() => updateStatus(b._id, "confirm")}><FiCheck size={14} /></Button>
                            <Button variant="danger" size="sm" onClick={() => updateStatus(b._id, "cancel")}><FiX size={14} /></Button>
                          </>
                        )}
                        {b.status === "confirmed" && (
                          <Button variant="primary" size="sm" onClick={() => updateStatus(b._id, "complete")}><FiCheckCircle size={14} /> Complete</Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon={FiCalendar} title="No bookings yet" description="Customer bookings will appear here." />
        )}
      </Card>
    </div>
  );
}

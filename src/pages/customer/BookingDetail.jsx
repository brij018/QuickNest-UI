import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiCalendar, FiMapPin, FiUser, FiDollarSign, FiArrowLeft, FiXCircle } from "react-icons/fi";
import { customerApi } from "../../api/customerApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import Skeleton from "../../components/ui/Skeleton";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { ConfirmDialog } from "../../components/ui/Dialog";
import { formatDate, formatCurrency, getStatusColor } from "../../lib/utils";

export default function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await customerApi.getBookingById(id);
        setBooking(res.data?.data || res.data);
      } catch {
        addToast("Failed to load booking", "error");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, addToast]);

  const handleCancel = async () => {
    setCancelling(true);
    try {
      await customerApi.cancelBooking(id);
      addToast("Booking cancelled", "success");
      setBooking((prev) => ({ ...prev, status: "cancelled" }));
      setCancelOpen(false);
    } catch {
      addToast("Failed to cancel booking", "error");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <Skeleton className="h-96" />;
  if (!booking) return <div className="text-center py-20 text-surface-500">Booking not found</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm text-surface-500 hover:text-surface-900 dark:hover:text-surface-100">
        <FiArrowLeft size={16} /> Back
      </button>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Booking Details</h1>
        <Badge variant={booking.status === "completed" ? "success" : booking.status === "cancelled" ? "danger" : booking.status === "confirmed" ? "primary" : "warning"}>
          {booking.status}
        </Badge>
      </div>

      <Card className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-brand-50 dark:bg-brand-900/20 p-2 text-brand-600 dark:text-brand-400">
              <FiCalendar size={18} />
            </div>
            <div>
              <p className="text-xs text-surface-500">Date & Time</p>
              <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{formatDate(booking.date)} {booking.time && `at ${booking.time}`}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-2 text-emerald-600 dark:text-emerald-400">
              <FiDollarSign size={18} />
            </div>
            <div>
              <p className="text-xs text-surface-500">Price</p>
              <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{formatCurrency(booking.price || booking.service?.price)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-violet-50 dark:bg-violet-900/20 p-2 text-violet-600 dark:text-violet-400">
              <FiUser size={18} />
            </div>
            <div>
              <p className="text-xs text-surface-500">Provider</p>
              <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{booking.provider?.name || booking.provider?.businessName || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-2 text-amber-600 dark:text-amber-400">
              <FiMapPin size={18} />
            </div>
            <div>
              <p className="text-xs text-surface-500">Location</p>
              <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{booking.address || booking.service?.location || "—"}</p>
            </div>
          </div>
        </div>

        {booking.notes && (
          <div className="rounded-xl bg-surface-50 dark:bg-surface-800 p-4">
            <p className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-1">Notes</p>
            <p className="text-sm text-surface-700 dark:text-surface-300">{booking.notes}</p>
          </div>
        )}

        {["pending", "confirmed"].includes(booking.status?.toLowerCase()) && (
          <Button variant="danger" className="w-full" onClick={() => setCancelOpen(true)}>
            <FiXCircle size={16} /> Cancel Booking
          </Button>
        )}
      </Card>

      <ConfirmDialog
        isOpen={cancelOpen}
        onClose={() => setCancelOpen(false)}
        onConfirm={handleCancel}
        title="Cancel Booking"
        description="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmText="Cancel Booking"
        confirmVariant="danger"
        isLoading={cancelling}
      />
    </div>
  );
}

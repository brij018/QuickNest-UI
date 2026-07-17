import { useEffect, useState } from "react";
import { FiBell, FiCheck } from "react-icons/fi";
import { customerApi } from "../../api/customerApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import { formatDate } from "../../lib/utils";

export default function Notifications() {
  const { addToast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await customerApi.getNotifications();
        setNotifications(res.data?.data || res.data || []);
      } catch {
        setNotifications([]);
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
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Notifications</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Stay updated on your bookings and account</p>
      </div>

      <Card>
        {notifications.length ? (
          <div className="divide-y divide-surface-100 dark:divide-surface-800">
            {notifications.map((n) => (
              <div key={n._id} className={`flex items-start gap-3 py-4 ${n.read ? "opacity-60" : ""}`}>
                <div className={`mt-0.5 rounded-full p-1.5 ${n.read ? "bg-surface-100 dark:bg-surface-800" : "bg-brand-50 dark:bg-brand-900/20"}`}>
                  <FiBell size={14} className={n.read ? "text-surface-400" : "text-brand-600 dark:text-brand-400"} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{n.title}</p>
                  <p className="text-xs text-surface-500 mt-0.5">{n.message}</p>
                  <p className="text-xs text-surface-400 mt-1">{formatDate(n.createdAt)}</p>
                </div>
                {!n.read && <FiCheck size={16} className="text-emerald-500 mt-1" />}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={FiBell} title="No notifications" description="You're all caught up! Check back later for updates." />
        )}
      </Card>
    </div>
  );
}

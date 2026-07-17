import { useEffect, useState } from "react";
import { FiStar } from "react-icons/fi";
import { providerApi } from "../../api/providerApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import { formatDate } from "../../lib/utils";

export default function ProviderReviews() {
  const { addToast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await providerApi.getReviews();
        setReviews(res.data?.data || res.data || []);
      } catch {
        addToast("Failed to load reviews", "error");
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
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Reviews</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">What customers are saying about you</p>
      </div>

      {reviews.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((r) => (
            <Card key={r._id}>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} size={14} className={i < (r.rating || 0) ? "text-amber-400 fill-amber-400" : "text-surface-300"} />
                ))}
                <span className="ml-1 text-xs font-medium text-surface-500">{r.rating}/5</span>
              </div>
              <p className="text-sm text-surface-700 dark:text-surface-300">{r.comment}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-medium text-surface-500">{r.customer?.name || "Customer"}</span>
                <span className="text-xs text-surface-400">{formatDate(r.createdAt)}</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon={FiStar} title="No reviews yet" description="Reviews will appear here after customers leave feedback." />
      )}
    </div>
  );
}

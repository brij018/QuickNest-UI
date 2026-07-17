import { useEffect, useState } from "react";
import { FiStar, FiSearch } from "react-icons/fi";
import { adminApi } from "../../api/adminApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import { formatDate } from "../../lib/utils";

export default function AdminReviews() {
  const { addToast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await adminApi.getAllReviews();
        setReviews(res.data?.data || res.data || []);
      } catch {
        addToast("Failed to load reviews", "error");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [addToast]);

  const filtered = reviews.filter((r) => !search || r.customer?.name?.toLowerCase().includes(search.toLowerCase()) || r.comment?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Reviews</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">All customer reviews</p>
        </div>
        <div className="w-full sm:w-64">
          <Input placeholder="Search reviews..." icon={FiSearch} value={search} onChange={(e) => setSearch(e.target.value)} />
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
                  <th className="pb-3 pr-4">Rating</th>
                  <th className="pb-3 pr-4">Comment</th>
                  <th className="pb-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {filtered.map((r) => (
                  <tr key={r._id}>
                    <td className="py-3 pr-4 font-medium text-surface-900 dark:text-surface-100">{r.customer?.name || "—"}</td>
                    <td className="py-3 pr-4 text-surface-500">{r.service?.name || "—"}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FiStar key={i} size={12} className={i < (r.rating || 0) ? "text-amber-400 fill-amber-400" : "text-surface-300"} />
                        ))}
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-surface-500 max-w-xs truncate">{r.comment}</td>
                    <td className="py-3 text-right text-surface-500">{formatDate(r.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon={FiStar} title="No reviews found" description="No reviews match your search." />
        )}
      </Card>
    </div>
  );
}

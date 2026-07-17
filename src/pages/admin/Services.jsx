import { useEffect, useState } from "react";
import { FiLayers, FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { adminApi } from "../../api/adminApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";
import { formatCurrency } from "../../lib/utils";

export default function Services() {
  const { addToast } = useToast();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await adminApi.getAllServices();
        setServices(res.data?.data || res.data || []);
      } catch {
        addToast("Failed to load services", "error");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [addToast]);

  const filtered = services.filter((s) => !search || s.name?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Services</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">All services on the platform</p>
        </div>
        <div className="w-full sm:w-64">
          <Input placeholder="Search services..." icon={FiSearch} value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <Card>
        {filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 dark:border-surface-700 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Provider</th>
                  <th className="pb-3 pr-4">Category</th>
                  <th className="pb-3 pr-4">Price</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {filtered.map((s) => (
                  <tr key={s._id}>
                    <td className="py-3 pr-4 font-medium text-surface-900 dark:text-surface-100">{s.name}</td>
                    <td className="py-3 pr-4 text-surface-500">{s.provider?.name || s.provider?.businessName || "—"}</td>
                    <td className="py-3 pr-4 text-surface-500">{s.category?.name || "—"}</td>
                    <td className="py-3 pr-4 text-surface-500">{formatCurrency(s.price)}</td>
                    <td className="py-3 text-right">
                      <Badge variant={s.isActive !== false ? "success" : "default"}>{s.isActive !== false ? "Active" : "Inactive"}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon={FiLayers} title="No services found" description="No services match your search." />
        )}
      </Card>
    </div>
  );
}

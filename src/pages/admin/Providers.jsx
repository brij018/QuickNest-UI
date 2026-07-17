import { useEffect, useState } from "react";
import { FiBriefcase, FiCheck, FiX, FiSearch } from "react-icons/fi";
import { adminApi } from "../../api/adminApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";
import { formatDate, getStatusColor } from "../../lib/utils";

export default function Providers() {
  const { addToast } = useToast();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const res = await adminApi.getAllProviders();
      setProviders(res.data?.data || res.data || []);
    } catch {
      addToast("Failed to load providers", "error");
    } finally {
      setLoading(false);
    }
  };

  const verify = async (id) => {
    try {
      await adminApi.verifyProvider(id);
      addToast("Provider verified", "success");
      fetchProviders();
    } catch {
      addToast("Verification failed", "error");
    }
  };

  const reject = async (id) => {
    try {
      await adminApi.rejectProvider(id);
      addToast("Provider rejected", "success");
      fetchProviders();
    } catch {
      addToast("Rejection failed", "error");
    }
  };

  const filtered = providers.filter((p) => !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.businessName?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Providers</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Manage and verify service providers</p>
        </div>
        <div className="w-full sm:w-64">
          <Input placeholder="Search providers..." icon={FiSearch} value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <Card>
        {filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 dark:border-surface-700 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Business</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Joined</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {filtered.map((p) => (
                  <tr key={p._id}>
                    <td className="py-3 pr-4 font-medium text-surface-900 dark:text-surface-100">{p.name}</td>
                    <td className="py-3 pr-4 text-surface-500">{p.businessName || "—"}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(p.verificationStatus || p.status)}`}>
                        {p.verificationStatus || p.status || "unverified"}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-surface-500">{formatDate(p.createdAt)}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {(p.verificationStatus === "pending" || p.status === "pending" || (!p.verificationStatus && !p.status)) && (
                          <>
                            <Button variant="success" size="sm" onClick={() => verify(p._id)}><FiCheck size={14} /></Button>
                            <Button variant="danger" size="sm" onClick={() => reject(p._id)}><FiX size={14} /></Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon={FiBriefcase} title="No providers found" description="No providers match your search." />
        )}
      </Card>
    </div>
  );
}

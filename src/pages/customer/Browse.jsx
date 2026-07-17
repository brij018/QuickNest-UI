import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiMapPin, FiStar, FiHeart } from "react-icons/fi";
import { customerApi } from "../../api/customerApi";
import { useToast } from "../../hooks/useToast";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";

export default function Browse() {
  const { addToast } = useToast();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await customerApi.getServices({ search });
        setServices(res.data?.data || res.data || []);
      } catch (err) {
        addToast("Failed to load services", "error");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [search, addToast]);

  const filtered = services.filter((s) => !search || s.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Browse Services</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Discover services from verified providers</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search services..."
            icon={FiSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-48" count={6} />
        </div>
      ) : filtered.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <Card key={service._id} hover className="h-full">
              <div className="flex items-start justify-between mb-3">
                <div className="rounded-lg bg-brand-50 dark:bg-brand-900/20 p-2">
                  <FiStar className="text-brand-600 dark:text-brand-400" size={18} />
                </div>
                <Badge variant="primary">${service.price}</Badge>
              </div>
              <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100">{service.name}</h3>
              <p className="mt-1 text-sm text-surface-500 line-clamp-2">{service.description}</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-surface-400">
                <FiMapPin size={12} />
                {service.provider?.businessName || service.provider?.name || "Provider"}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon={FiSearch} title="No services found" description="Try adjusting your search terms." />
      )}
    </div>
  );
}

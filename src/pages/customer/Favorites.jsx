import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { customerApi } from "../../api/customerApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";

export default function Favorites() {
  const { addToast } = useToast();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await customerApi.getFavorites();
        setFavorites(res.data?.data || res.data || []);
      } catch {
        addToast("Failed to load favorites", "error");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [addToast]);

  const toggle = async (id) => {
    try {
      await customerApi.toggleFavorite(id);
      setFavorites((prev) => prev.filter((f) => f._id !== id));
      addToast("Removed from favorites", "info");
    } catch {
      addToast("Failed to update favorite", "error");
    }
  };

  if (loading) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Favorites</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Services and providers you saved</p>
      </div>

      {favorites.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((f) => (
            <Card key={f._id}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100">{f.name}</h3>
                  <p className="text-xs text-surface-500 mt-0.5">{f.provider?.name || f.category?.name}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => toggle(f._id)}>
                  <FiHeart className="text-rose-500 fill-rose-500" size={18} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon={FiHeart} title="No favorites yet" description="Save services you like to find them quickly later." />
      )}
    </div>
  );
}

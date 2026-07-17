import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiLayers } from "react-icons/fi";
import { providerApi } from "../../api/providerApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import Dialog, { ConfirmDialog } from "../../components/ui/Dialog";
import Input from "../../components/ui/Input";
import { formatCurrency } from "../../lib/utils";

export default function ProviderServices() {
  const { addToast } = useToast();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", duration: "" });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await providerApi.getServices();
      setServices(res.data?.data || res.data || []);
    } catch {
      addToast("Failed to load services", "error");
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", description: "", price: "", duration: "" });
    setDialogOpen(true);
  };

  const openEdit = (service) => {
    setEditing(service);
    setForm({ name: service.name, description: service.description || "", price: service.price, duration: service.duration || "" });
    setDialogOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      if (editing) {
        await providerApi.updateService(editing._id, form);
        addToast("Service updated", "success");
      } else {
        await providerApi.createService(form);
        addToast("Service created", "success");
      }
      setDialogOpen(false);
      fetchServices();
    } catch (err) {
      addToast(err.response?.data?.message || "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    setDeleting(true);
    try {
      await providerApi.deleteService(deleteId);
      addToast("Service deleted", "success");
      setDeleteId(null);
      fetchServices();
    } catch {
      addToast("Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">My Services</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Manage the services you offer</p>
        </div>
        <Button onClick={openNew}><FiPlus size={16} /> Add Service</Button>
      </div>

      {services.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s._id}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100">{s.name}</h3>
                <span className="text-sm font-bold text-brand-600">{formatCurrency(s.price)}</span>
              </div>
              <p className="text-sm text-surface-500 line-clamp-2 mb-3">{s.description}</p>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => openEdit(s)}><FiEdit2 size={14} /></Button>
                <Button variant="danger" size="sm" onClick={() => setDeleteId(s._id)}><FiTrash2 size={14} /></Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon={FiLayers} title="No services yet" description="Add your first service to start receiving bookings." actionLabel="Add Service" onAction={openNew} />
      )}

      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} title={editing ? "Edit Service" : "New Service"} size="md">
        <div className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Service name" />
          <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Price ($)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
            <Input label="Duration (min)" type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="60" />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={save} isLoading={saving}>{editing ? "Update" : "Create"}</Button>
        </div>
      </Dialog>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={remove}
        title="Delete Service"
        description="This will permanently remove the service. Are you sure?"
        isLoading={deleting}
      />
    </div>
  );
}

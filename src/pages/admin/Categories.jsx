import { useEffect, useState } from "react";
import { FiGrid, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { adminApi } from "../../api/adminApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import Dialog, { ConfirmDialog } from "../../components/ui/Dialog";

export default function Categories() {
  const { addToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await adminApi.getAllCategories();
      setCategories(res.data?.data || res.data || []);
    } catch {
      addToast("Failed to load categories", "error");
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", description: "" });
    setDialogOpen(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setForm({ name: cat.name, description: cat.description || "" });
    setDialogOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      if (editing) {
        await adminApi.updateCategory(editing._id, form);
        addToast("Category updated", "success");
      } else {
        await adminApi.createCategory(form);
        addToast("Category created", "success");
      }
      setDialogOpen(false);
      fetchCategories();
    } catch (err) {
      addToast(err.response?.data?.message || "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    setDeleting(true);
    try {
      await adminApi.deleteCategory(deleteId);
      addToast("Category deleted", "success");
      setDeleteId(null);
      fetchCategories();
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
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Categories</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Manage service categories</p>
        </div>
        <Button onClick={openNew}><FiPlus size={16} /> Add Category</Button>
      </div>

      <Card>
        {categories.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 dark:border-surface-700 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Description</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {categories.map((c) => (
                  <tr key={c._id}>
                    <td className="py-3 pr-4 font-medium text-surface-900 dark:text-surface-100">{c.name}</td>
                    <td className="py-3 pr-4 text-surface-500">{c.description || "—"}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="secondary" size="sm" onClick={() => openEdit(c)}><FiEdit2 size={14} /></Button>
                        <Button variant="danger" size="sm" onClick={() => setDeleteId(c._id)}><FiTrash2 size={14} /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon={FiGrid} title="No categories" description="Add your first category to organize services." actionLabel="Add Category" onAction={openNew} />
        )}
      </Card>

      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} title={editing ? "Edit Category" : "New Category"} size="md">
        <div className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Category name" />
          <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional description" />
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
        title="Delete Category"
        description="This will permanently delete the category. Are you sure?"
        isLoading={deleting}
      />
    </div>
  );
}

import { useEffect, useState } from "react";
import { FiUsers, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { adminApi } from "../../api/adminApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import Dialog, { ConfirmDialog } from "../../components/ui/Dialog";
import Badge from "../../components/ui/Badge";
import { formatDate } from "../../lib/utils";

export default function Users() {
  const { addToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "user" });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await adminApi.getAllUsers();
      setUsers(res.data?.data || res.data || []);
    } catch {
      addToast("Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (user) => {
    setEditing(user);
    setForm({ name: user.name, email: user.email, role: user.role });
    setDialogOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      await adminApi.updateUser(editing._id, form);
      addToast("User updated", "success");
      setDialogOpen(false);
      fetchUsers();
    } catch (err) {
      addToast(err.response?.data?.message || "Update failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    setDeleting(true);
    try {
      await adminApi.deleteUser(deleteId);
      addToast("User deleted", "success");
      setDeleteId(null);
      fetchUsers();
    } catch {
      addToast("Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  };

  const filtered = users.filter((u) => !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Users</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Manage platform users</p>
        </div>
        <div className="w-full sm:w-64">
          <Input placeholder="Search users..." icon={FiSearch} value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <Card>
        {filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 dark:border-surface-700 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Email</th>
                  <th className="pb-3 pr-4">Role</th>
                  <th className="pb-3 pr-4">Joined</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {filtered.map((u) => (
                  <tr key={u._id}>
                    <td className="py-3 pr-4 font-medium text-surface-900 dark:text-surface-100">{u.name}</td>
                    <td className="py-3 pr-4 text-surface-500">{u.email}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={u.role === "super_admin" ? "danger" : u.role === "admin" ? "primary" : u.role === "provider" ? "warning" : "default"}>
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-surface-500">{formatDate(u.createdAt)}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="secondary" size="sm" onClick={() => openEdit(u)}><FiEdit2 size={14} /></Button>
                        <Button variant="danger" size="sm" onClick={() => setDeleteId(u._id)}><FiTrash2 size={14} /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon={FiUsers} title="No users found" description="No users match your search." />
        )}
      </Card>

      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} title="Edit User" size="md">
        <div className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full rounded-xl border border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-900 px-4 py-3 text-sm"
          >
            <option value="user">User</option>
            <option value="provider">Provider</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={save} isLoading={saving}>Save</Button>
        </div>
      </Dialog>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={remove}
        title="Delete User"
        description="This will permanently delete the user. Are you sure?"
        isLoading={deleting}
      />
    </div>
  );
}

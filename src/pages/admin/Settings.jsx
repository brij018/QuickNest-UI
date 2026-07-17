import { useEffect, useState } from "react";
import { FiSettings, FiSave } from "react-icons/fi";
import { adminApi } from "../../api/adminApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Skeleton from "../../components/ui/Skeleton";
import Switch from "../../components/ui/Switch";

export default function AdminSettings() {
  const { addToast } = useToast();
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await adminApi.getSettings();
        setSettings(res.data?.data || res.data || {});
      } catch {
        setSettings({
          platformName: "QuickNest",
          contactEmail: "support@quicknest.com",
          enableRegistration: true,
          enableProviderRegistration: true,
          commissionRate: 10,
        });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await adminApi.updateSettings(settings);
      addToast("Settings saved", "success");
    } catch {
      addToast("Failed to save settings", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Settings</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Configure platform settings</p>
      </div>

      <Card className="space-y-5">
        <Input
          label="Platform Name"
          value={settings.platformName || ""}
          onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
        />
        <Input
          label="Contact Email"
          type="email"
          value={settings.contactEmail || ""}
          onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
        />
        <Input
          label="Commission Rate (%)"
          type="number"
          value={settings.commissionRate || ""}
          onChange={(e) => setSettings({ ...settings, commissionRate: e.target.value })}
        />
        <div className="space-y-3 pt-2">
          <Switch
            checked={settings.enableRegistration !== false}
            onChange={(v) => setSettings({ ...settings, enableRegistration: v })}
            label="Enable customer registration"
          />
          <Switch
            checked={settings.enableProviderRegistration !== false}
            onChange={(v) => setSettings({ ...settings, enableProviderRegistration: v })}
            label="Enable provider registration"
          />
        </div>
        <div className="pt-2">
          <Button onClick={save} isLoading={saving}><FiSave size={16} /> Save Settings</Button>
        </div>
      </Card>
    </div>
  );
}

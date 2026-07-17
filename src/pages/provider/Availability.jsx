import { useEffect, useState } from "react";
import { FiClock, FiCheck } from "react-icons/fi";
import { providerApi } from "../../api/providerApi";
import { useToast } from "../../hooks/useToast";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";
import Switch from "../../components/ui/Switch";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Availability() {
  const { addToast } = useToast();
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await providerApi.getAvailability();
        const data = res.data?.data || res.data || {};
        const mapped = {};
        DAYS.forEach((day) => {
          mapped[day] = data[day?.toLowerCase()] || { enabled: false, start: "09:00", end: "17:00" };
        });
        setSchedule(mapped);
      } catch {
        const defaultSchedule = {};
        DAYS.forEach((day) => { defaultSchedule[day] = { enabled: true, start: "09:00", end: "17:00" }; });
        setSchedule(defaultSchedule);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const payload = {};
      Object.entries(schedule).forEach(([day, val]) => { payload[day.toLowerCase()] = val; });
      await providerApi.updateAvailability(payload);
      addToast("Availability saved", "success");
    } catch {
      addToast("Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Availability</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Set when you're available for bookings</p>
      </div>

      <Card>
        <div className="space-y-4">
          {DAYS.map((day) => (
            <div key={day} className="flex items-center gap-4 py-3 border-b border-surface-100 dark:border-surface-800 last:border-0">
              <Switch
                checked={schedule[day]?.enabled}
                onChange={(v) => setSchedule({ ...schedule, [day]: { ...schedule[day], enabled: v } })}
                label={day}
              />
              {schedule[day]?.enabled && (
                <div className="flex items-center gap-2 ml-auto">
                  <input
                    type="time"
                    value={schedule[day]?.start || "09:00"}
                    onChange={(e) => setSchedule({ ...schedule, [day]: { ...schedule[day], start: e.target.value } })}
                    className="rounded-lg border border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-900 px-2 py-1 text-sm"
                  />
                  <span className="text-surface-400">to</span>
                  <input
                    type="time"
                    value={schedule[day]?.end || "17:00"}
                    onChange={(e) => setSchedule({ ...schedule, [day]: { ...schedule[day], end: e.target.value } })}
                    className="rounded-lg border border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-900 px-2 py-1 text-sm"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={save} isLoading={saving}><FiCheck size={16} /> Save Schedule</Button>
        </div>
      </Card>
    </div>
  );
}

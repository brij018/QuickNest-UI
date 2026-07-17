import { cn } from "../../lib/utils";

export default function StatCard({ title, value, change, icon: Icon, color = "brand" }) {
  const colors = {
    brand: "bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
    violet: "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
  };

  return (
    <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 sm:p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-surface-500 dark:text-surface-400">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100">{value}</p>
          {change != null && (
            <p className={cn("text-xs font-medium", change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400")}>
              {change >= 0 ? "+" : ""}{change}% from last month
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn("rounded-xl p-2.5", colors[color])}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

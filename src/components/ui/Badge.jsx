import { cn } from "../../lib/utils";

export default function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-300",
    primary: "bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400",
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    danger: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    outline: "border border-surface-300 dark:border-surface-600 bg-transparent text-surface-600 dark:text-surface-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

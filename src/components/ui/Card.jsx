import { cn } from "../../lib/utils";

export default function Card({ children, className, padding = "normal", hover = false }) {
  const pads = { none: "", normal: "p-5 sm:p-6", large: "p-6 sm:p-8" };
  return (
    <div
      className={cn(
        "rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-card transition-all",
        pads[padding],
        hover && "hover:shadow-elevated hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  );
}

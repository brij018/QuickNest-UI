import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Input = forwardRef(function Input({ label, error, icon: Icon, className, ...props }, ref) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-xl border bg-white dark:bg-surface-900 px-4 py-3 text-sm outline-none transition-all placeholder:text-surface-400 focus:ring-2 focus:ring-brand-500/20",
            Icon && "pl-11",
            error
              ? "border-rose-300 focus:border-rose-500 dark:border-rose-800"
              : "border-surface-300 focus:border-brand-500 dark:border-surface-700"
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
});

export default Input;

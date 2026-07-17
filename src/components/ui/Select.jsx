import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Select = forwardRef(function Select({ label, error, options = [], className, placeholder, ...props }, ref) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          "w-full rounded-xl border bg-white dark:bg-surface-900 px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-brand-500/20 appearance-none",
          error
            ? "border-rose-300 focus:border-rose-500 dark:border-rose-800"
            : "border-surface-300 focus:border-brand-500 dark:border-surface-700"
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
});

export default Select;

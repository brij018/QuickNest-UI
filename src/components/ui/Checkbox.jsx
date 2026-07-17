import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Checkbox = forwardRef(function Checkbox({ label, error, className, ...props }, ref) {
  return (
    <label className={cn("flex items-center gap-2.5 cursor-pointer", className)}>
      <input
        ref={ref}
        type="checkbox"
        className="h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500/20 dark:border-surface-600 dark:bg-surface-800"
        {...props}
      />
      {label && <span className="text-sm text-surface-700 dark:text-surface-300">{label}</span>}
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </label>
  );
});

export default Checkbox;

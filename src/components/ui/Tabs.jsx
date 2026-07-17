import { useState } from "react";
import { cn } from "../../lib/utils";

export default function Tabs({ tabs = [], defaultTab, onChange, className }) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.value);

  const handle = (val) => {
    setActive(val);
    onChange?.(val);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex gap-1 rounded-xl bg-surface-100 dark:bg-surface-800 p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => handle(t.value)}
            className={cn(
              "relative rounded-lg px-4 py-2 text-sm font-medium transition-all",
              active === t.value
                ? "bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 shadow-soft"
                : "text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-300"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find((t) => t.value === active)?.content}
      </div>
    </div>
  );
}

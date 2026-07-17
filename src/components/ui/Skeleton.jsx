import { cn } from "../../lib/utils";

export default function Skeleton({ className, count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "animate-pulse rounded-xl bg-surface-200 dark:bg-surface-800",
            className
          )}
        />
      ))}
    </>
  );
}

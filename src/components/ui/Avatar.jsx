import { cn, getInitials } from "../../lib/utils";

export default function Avatar({ src, name, size = "md", className }) {
  const sizes = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 font-semibold overflow-hidden",
        sizes[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={name || ""} className="h-full w-full object-cover" />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}

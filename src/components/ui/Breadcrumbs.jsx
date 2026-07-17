import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { cn } from "../../lib/utils";

export default function Breadcrumbs({ items = [], className }) {
  if (!items.length) return null;
  return (
    <nav className={cn("flex items-center gap-1 text-sm", className)}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <FiChevronRight size={14} className="text-surface-400" />}
          {item.to ? (
            <Link to={item.to} className="text-surface-500 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-surface-900 dark:text-surface-100">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

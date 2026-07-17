import { cn } from "../../lib/utils";
import Button from "./Button";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const add = (p) => pages.push(p);
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  if (start > 1) { add(1); if (start > 2) add("..."); }
  for (let i = start; i <= end; i++) add(i);
  if (end < totalPages) { if (end < totalPages - 1) add("..."); add(totalPages); }

  return (
    <div className="flex items-center justify-center gap-1.5">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </Button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="px-2 text-sm text-surface-400">...</span>
        ) : (
          <Button
            key={i}
            variant={p === currentPage ? "primary" : "secondary"}
            size="sm"
            className="min-w-[36px]"
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        )
      )}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}

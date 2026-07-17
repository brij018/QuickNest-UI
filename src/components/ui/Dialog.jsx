import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { cn } from "../../lib/utils";
import Button from "./Button";

export default function Dialog({ isOpen, onClose, title, description, children, footer, size = "md" }) {
  const ref = useRef();

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose?.(); };
    if (isOpen) { document.addEventListener("keydown", handleKey); document.body.style.overflow = "hidden"; }
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [isOpen, onClose]);

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full mx-4",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "relative w-full rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 shadow-elevated",
              sizes[size]
            )}
          >
            <div className="flex items-center justify-between border-b border-surface-100 dark:border-surface-800 px-6 py-4">
              <div>
                {title && <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100">{title}</h3>}
                {description && <p className="mt-0.5 text-sm text-surface-500 dark:text-surface-400">{description}</p>}
              </div>
              <button onClick={onClose} className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                <FiX size={18} />
              </button>
            </div>
            <div className="px-6 py-5">{children}</div>
            {footer && <div className="border-t border-surface-100 dark:border-surface-800 px-6 py-4 flex justify-end gap-2">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, description, confirmText = "Confirm", confirmVariant = "danger", isLoading }) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant={confirmVariant} size="sm" isLoading={isLoading} onClick={onConfirm}>{confirmText}</Button>
        </>
      }
    />
  );
}

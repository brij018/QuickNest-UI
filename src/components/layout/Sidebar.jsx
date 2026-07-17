import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiX } from "react-icons/fi";
import { cn } from "../../lib/utils";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";
import Avatar from "../ui/Avatar";

const navConfig = {
  super_admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: "FiHome" },
    { label: "Users", path: "/admin/users", icon: "FiUsers" },
    { label: "Providers", path: "/admin/providers", icon: "FiBriefcase" },
    { label: "Categories", path: "/admin/categories", icon: "FiGrid" },
    { label: "Services", path: "/admin/services", icon: "FiLayers" },
    { label: "Bookings", path: "/admin/bookings", icon: "FiCalendar" },
    { label: "Reviews", path: "/admin/reviews", icon: "FiStar" },
    { label: "Settings", path: "/admin/settings", icon: "FiSettings" },
  ],
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: "FiHome" },
    { label: "Users", path: "/admin/users", icon: "FiUsers" },
    { label: "Providers", path: "/admin/providers", icon: "FiBriefcase" },
    { label: "Categories", path: "/admin/categories", icon: "FiGrid" },
    { label: "Services", path: "/admin/services", icon: "FiLayers" },
    { label: "Bookings", path: "/admin/bookings", icon: "FiCalendar" },
    { label: "Reviews", path: "/admin/reviews", icon: "FiStar" },
    { label: "Settings", path: "/admin/settings", icon: "FiSettings" },
  ],
  provider: [
    { label: "Dashboard", path: "/provider/dashboard", icon: "FiHome" },
    { label: "My Services", path: "/provider/services", icon: "FiLayers" },
    { label: "Bookings", path: "/provider/bookings", icon: "FiCalendar" },
    { label: "Availability", path: "/provider/availability", icon: "FiClock" },
    { label: "Earnings", path: "/provider/earnings", icon: "FiDollarSign" },
    { label: "Reviews", path: "/provider/reviews", icon: "FiStar" },
    { label: "Profile", path: "/profile", icon: "FiUser" },
  ],
  user: [
    { label: "Dashboard", path: "/dashboard", icon: "FiHome" },
    { label: "Browse", path: "/browse", icon: "FiSearch" },
    { label: "My Bookings", path: "/bookings", icon: "FiCalendar" },
    { label: "Favorites", path: "/favorites", icon: "FiHeart" },
    { label: "Notifications", path: "/notifications", icon: "FiBell" },
    { label: "Profile", path: "/profile", icon: "FiUser" },
  ],
};

// Dynamic icon import helper
function DynamicIcon({ name, size = 18 }) {
  const icons = require("react-icons/fi");
  const Icon = icons[name];
  return Icon ? <Icon size={size} /> : null;
}

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth();
  const role = user?.role || "user";
  const items = navConfig[role] || navConfig.user;
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-950 lg:static lg:z-auto",
          !isOpen && "-translate-x-full lg:translate-x-0 transition-transform"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-surface-100 dark:border-surface-800">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-sm">Q</div>
            <span className="text-lg font-bold tracking-tight text-surface-900 dark:text-surface-100">QuickNest</span>
          </NavLink>
          <button onClick={onClose} className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 lg:hidden">
            <FiX size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {items.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose?.()}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400"
                    : "text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800"
                )}
              >
                <DynamicIcon name={item.icon} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-surface-100 dark:border-surface-800 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-surface-500 dark:text-surface-400">Theme</span>
            <ThemeToggle className="rounded-lg p-1.5 text-surface-500 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800" />
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900 p-3">
            <Avatar src={user?.avatar} name={user?.name} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-surface-900 dark:text-surface-100">{user?.name || "User"}</p>
              <p className="truncate text-xs text-surface-500 dark:text-surface-400 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiBell, FiSearch, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import Dropdown from "../ui/Dropdown";
import Avatar from "../ui/Avatar";
import ThemeToggle from "./ThemeToggle";

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-surface-200 dark:border-surface-800 bg-white/80 dark:bg-surface-950/80 backdrop-blur-xl px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800 lg:hidden"
        >
          <FiMenu size={20} />
        </button>
        <div className="hidden sm:flex items-center gap-2 text-surface-400">
          <FiSearch size={16} />
          <span className="text-sm">Quick search...</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle className="rounded-xl p-2 text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800 hidden sm:flex" />

        <button className="relative rounded-xl p-2 text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800">
          <FiBell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-surface-950" />
        </button>

        <Dropdown
          align="right"
          trigger={
            <button className="flex items-center gap-2.5 rounded-xl p-1.5 pr-3 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
              <Avatar src={user?.avatar} name={user?.name} size="sm" />
              <span className="hidden md:block text-sm font-medium text-surface-900 dark:text-surface-100">
                {user?.name || "User"}
              </span>
            </button>
          }
          items={[
            { label: "Profile", icon: FiUser, onClick: () => navigate("/profile") },
            { label: "Settings", icon: FiSettings, onClick: () => navigate("/settings") },
            { label: "Logout", icon: FiLogOut, danger: true, onClick: logout },
          ]}
        />
      </div>
    </header>
  );
}

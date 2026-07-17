import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import Button from "../../components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-surface-50 dark:bg-surface-950 px-4 text-center">
      <h1 className="text-7xl font-bold text-surface-200 dark:text-surface-800">404</h1>
      <h2 className="mt-2 text-xl font-semibold text-surface-900 dark:text-surface-100">Page not found</h2>
      <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6">
        <Button><FiHome size={16} /> Go home</Button>
      </Link>
    </div>
  );
}

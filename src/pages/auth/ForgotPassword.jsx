import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-950 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white text-xl font-bold">Q</div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Reset password</h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">Contact your administrator to reset your password</p>
        </div>

        <Card padding="large" className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-amber-50 dark:bg-amber-900/20 p-3">
              <FiMail className="text-amber-600 dark:text-amber-400" size={24} />
            </div>
          </div>
          <p className="text-sm text-surface-600 dark:text-surface-400">
            Password reset is not available via the API. Please contact support or your system administrator.
          </p>
          <Link to="/login">
            <Button variant="secondary" className="w-full mt-2">
              <FiArrowLeft size={16} /> Back to login
            </Button>
          </Link>
        </Card>
      </motion.div>
    </div>
  );
}

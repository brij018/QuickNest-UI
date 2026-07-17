import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function Login() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await login(data);
      addToast("Welcome back!", "success");
      const role = res.user?.role;
      navigate(role === "admin" || role === "super_admin" ? "/admin/dashboard" : role === "provider" ? "/provider/dashboard" : "/dashboard");
    } catch (err) {
      addToast(err.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-950 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white text-xl font-bold">Q</div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Welcome back</h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">Sign in to your QuickNest account</p>
        </div>

        <Card padding="large">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              icon={FiMail}
              error={errors.email?.message}
              {...register("email", { required: "Email is required" })}
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                icon={FiLock}
                error={errors.password?.message}
                {...register("password", { required: "Password is required" })}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-[34px] text-surface-400">
                {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-surface-300 text-brand-600" />
                <span className="text-surface-600 dark:text-surface-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="font-medium text-brand-600 hover:text-brand-700">Forgot?</Link>
            </div>
            <Button type="submit" className="w-full" isLoading={loading}>Sign In</Button>
          </form>
        </Card>

        <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}

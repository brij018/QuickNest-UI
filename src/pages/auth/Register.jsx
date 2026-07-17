import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function Register() {
  const { register: registerUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const role = watch("role", "user");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser(data);
      addToast("Account created! Please sign in.", "success");
      navigate("/login");
    } catch (err) {
      addToast(err.response?.data?.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-950 px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white text-xl font-bold">Q</div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Create account</h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">Join QuickNest today</p>
        </div>

        <Card padding="large">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Full Name" placeholder="John Doe" icon={FiUser} error={errors.name?.message} {...register("name", { required: "Name is required" })} />
            <Input label="Email" type="email" placeholder="you@example.com" icon={FiMail} error={errors.email?.message} {...register("email", { required: "Email is required" })} />
            <Input label="Phone" placeholder="+1 234 567 890" icon={FiPhone} error={errors.phone?.message} {...register("phone")} />
            <Select label="Account Type" options={[{ value: "user", label: "Customer" }, { value: "provider", label: "Service Provider" }]} error={errors.role?.message} {...register("role", { required: "Role is required" })} />
            {role === "provider" && (
              <Input label="Business Name" placeholder="Your business" {...register("businessName", { required: role === "provider" ? "Business name is required" : false })} />
            )}
            <div className="relative">
              <Input label="Password" type={showPass ? "text" : "password"} placeholder="••••••••" icon={FiLock} error={errors.password?.message} {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })} />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-[34px] text-surface-400">
                {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            <Button type="submit" className="w-full" isLoading={loading}>Create Account</Button>
          </form>
        </Card>

        <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}

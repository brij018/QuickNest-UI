import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiPhone, FiLock, FiSave, FiCamera } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { authApi } from "../../api/authApi";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Avatar from "../../components/ui/Avatar";
import Tabs from "../../components/ui/Tabs";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const [saving, setSaving] = useState(false);
  const [changingPass, setChangingPass] = useState(false);

  const { register: regProfile, handleSubmit: handleProfile, formState: { errors: profileErrors } } = useForm({
    defaultValues: { name: user?.name || "", email: user?.email || "", phone: user?.phone || "" }
  });

  const { register: regPass, handleSubmit: handlePass, reset: resetPass, formState: { errors: passErrors } } = useForm();

  const onProfile = async (data) => {
    setSaving(true);
    try {
      const res = await authApi.updateProfile(data);
      updateUser(res.data?.data || res.data);
      addToast("Profile updated", "success");
    } catch (err) {
      addToast(err.response?.data?.message || "Update failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const onPassword = async (data) => {
    setChangingPass(true);
    try {
      await authApi.changePassword(data);
      addToast("Password changed", "success");
      resetPass();
    } catch (err) {
      addToast(err.response?.data?.message || "Change failed", "error");
    } finally {
      setChangingPass(false);
    }
  };

  const profileTab = (
    <form onSubmit={handleProfile(onProfile)} className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <Avatar src={user?.avatar} name={user?.name} size="xl" />
          <button type="button" className="absolute bottom-0 right-0 rounded-full bg-brand-600 p-1.5 text-white hover:bg-brand-700">
            <FiCamera size={14} />
          </button>
        </div>
        <div>
          <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100">{user?.name || "User"}</h3>
          <p className="text-sm text-surface-500 capitalize">{user?.role}</p>
        </div>
      </div>
      <Input label="Full Name" icon={FiUser} error={profileErrors.name?.message} {...regProfile("name", { required: "Name is required" })} />
      <Input label="Email" type="email" icon={FiMail} error={profileErrors.email?.message} {...regProfile("email", { required: "Email is required" })} />
      <Input label="Phone" icon={FiPhone} {...regProfile("phone")} />
      <Button type="submit" isLoading={saving}><FiSave size={16} /> Save Changes</Button>
    </form>
  );

  const securityTab = (
    <form onSubmit={handlePass(onPassword)} className="space-y-4">
      <Input label="Current Password" type="password" icon={FiLock} error={passErrors.currentPassword?.message} {...regPass("currentPassword", { required: "Required" })} />
      <Input label="New Password" type="password" icon={FiLock} error={passErrors.newPassword?.message} {...regPass("newPassword", { required: "Required", minLength: { value: 6, message: "Min 6 chars" } })} />
      <Input label="Confirm New Password" type="password" icon={FiLock} error={passErrors.confirmPassword?.message} {...regPass("confirmPassword", { required: "Required" })} />
      <Button type="submit" isLoading={changingPass}><FiLock size={16} /> Change Password</Button>
    </form>
  );

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Profile</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Manage your account and security</p>
      </div>

      <Card>
        <Tabs
          tabs={[
            { label: "Profile", value: "profile", content: profileTab },
            { label: "Security", value: "security", content: securityTab },
          ]}
          defaultTab="profile"
        />
      </Card>
    </div>
  );
}

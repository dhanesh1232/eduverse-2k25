"use client";

import { Logo } from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiHandle } from "@/hooks/useApiHandle";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";

type AdminForm = {
  collegeName: string;
  adminEmail: string;
  adminPassword: string;
  adminPhone: string;
  adminName: string;
};

type Errors = Partial<Record<keyof AdminForm, string>>;

const defaultForm = {
  collegeName: "",
  adminEmail: "",
  adminPassword: "",
  adminName: "",
  adminPhone: "",
};

export default function CollegeAdminRegister() {
  const router = useRouter();
  const [form, setForm] = useState<AdminForm>(defaultForm);
  const [showPassword, setShowPassword] = useState(false);

  const registerApi = useApiHandle<{
    success: boolean;
    message: string;
  }>({
    url: "/api/auth/register",
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
  });

  const errors: Errors = useMemo(() => {
    const e: Errors = {};

    if (form.collegeName.trim().length < 5) {
      e.collegeName = "College name must be at least 5 characters";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.adminEmail)) {
      e.adminEmail = "Enter a valid email address";
    }

    if (form.adminPassword.length < 8) {
      e.adminPassword = "Password must be at least 8 characters";
    }

    if (!/^[6-9]\d{9}$/.test(form.adminPhone)) {
      e.adminPhone = "Enter a valid 10-digit Indian mobile number";
    }

    return e;
  }, [form]);

  const isFormValid = Object.keys(errors).length === 0;

  const handleChange = (key: keyof AdminForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const res = await registerApi.run({
        options: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      });

      // success → redirect / dashboard
      setForm(defaultForm);
      toast.success(res?.message || "Registration successful");
      router.push("/auth/login");
    } catch {
      // error already handled in hook
      toast.error(registerApi.error || "Something went wrong");
      console.log(registerApi.error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-sky-50">
      {/* LEFT */}
      <div className="hidden md:flex flex-col justify-between bg-linear-to-br from-indigo-700 to-indigo-900 p-12 text-white">
        <div>
          <h1 className="text-3xl font-bold">College Management System</h1>
          <p className="text-indigo-200 max-w-md">
            Securely onboard institutions and manage academic operations from a
            single control panel.
          </p>
        </div>
        <p className="text-sm text-indigo-300">
          © {new Date().getFullYear()} EduVerse
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center px-6 py-6">
        <div className="w-full max-w-md bg-white/80 rounded-xl shadow-md p-8">
          <Logo />

          <h2 className="text-2xl mt-4 font-semibold">
            Register College Admin
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Primary administrator setup
          </p>

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* College */}
            <Field
              label="College Name"
              value={form.collegeName}
              onChange={(v) => handleChange("collegeName", v)}
              placeholder="ABC Engineering College"
            />
            {/* Name */}
            <Field
              label="Admin Name"
              value={form.adminName}
              onChange={(v) => handleChange("adminName", v)}
              placeholder="John Doe"
            />

            {/* Email */}
            <Field
              label="Admin Email"
              type="email"
              value={form.adminEmail}
              onChange={(v) => handleChange("adminEmail", v)}
              placeholder="admin@college.com"
            />

            {/* Password */}
            <PasswordField
              value={form.adminPassword}
              show={showPassword}
              setShow={setShowPassword}
              handleChange={(e) => handleChange("adminPassword", e)}
            />

            {/* Phone */}
            <Field
              label="Phone Number"
              value={form.adminPhone}
              onChange={(v) => handleChange("adminPhone", v)}
              placeholder="9XXXXXXXXX"
            />

            <button
              type="submit"
              disabled={!isFormValid || registerApi.loading}
              className="w-full m-0 flex items-center justify-center rounded-md cursor-pointer bg-indigo-600 py-2.5 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition"
            >
              {registerApi.loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Admin Account"
              )}
            </button>
          </form>

          <p className="mt-2 text-sm text-center text-gray-600">
            Already registered?{" "}
            <Link
              href="/auth/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>

          <p className="mt-2 text-xs text-center text-gray-500">
            Only authorized institutions should register.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Field ---------- */

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <Label className="text-sm font-medium">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-indigo-600"
      />
    </div>
  );
}

export function PasswordField({
  show,
  setShow,
  value,
  handleChange,
}: {
  show: boolean;
  setShow: (v: boolean) => void;
  value: string;
  handleChange: (v: string) => void;
}) {
  return (
    <div>
      <Label className="text-sm font-medium">Password</Label>
      <div className="relative mt-1">
        <Input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full rounded-md border px-3 py-2 pr-10 focus:ring-indigo-600"
          placeholder="Minimum 8 characters"
        />
        {value.length > 0 && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShow(!show)}
            className="absolute right-3 top-2.5 text-gray-500"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

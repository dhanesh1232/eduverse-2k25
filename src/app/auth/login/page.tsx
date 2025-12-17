"use client";

import { Logo } from "@/components/layout/header";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { Field } from "../register/page";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

type Errors = Partial<Record<keyof LoginForm, string>>;

const defaultForm: LoginForm = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>(defaultForm);
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  const errors: Errors = useMemo(() => {
    const e: Errors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address";
    }

    if (form.password.length < 8) {
      e.password = "Password must be at least 8 characters";
    }

    return e;
  }, [form]);

  const isFormValid = Object.keys(errors).length === 0;

  const handleChange = (key: keyof LoginForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSigningIn(true);
    try {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error);
      }
      const session = await getSession();
      if (session?.user?.id) {
        toast.success("Logged in successfully");
        router.push(`/${session?.user?.id}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-sky-50">
      {/* LEFT */}
      <div className="hidden md:flex flex-col justify-between bg-linear-to-br from-indigo-700 to-indigo-900 p-12 text-white">
        <div>
          <h1 className="text-3xl font-bold">College Management System</h1>
          <p className="mt-4 text-indigo-200 max-w-md">
            Secure access for institutional administrators.
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

          <h2 className="text-2xl mt-4 font-semibold">Login</h2>
          <p className="text-sm text-gray-500 mb-6">
            Sign in to manage your institution
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email */}
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
              placeholder="admin@college.com"
            />

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="w-full rounded-md border px-3 py-2 pr-10 focus:ring-indigo-600"
                  placeholder="Your password"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 cursor-pointer top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSigningIn}
              className="w-full flex items-center justify-center cursor-pointer rounded-md bg-indigo-600 py-2.5 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition"
            >
              {isSigningIn ? <Loader2 className="animate-spin" /> : "Login"}
            </button>
          </form>

          <p className="mt-3 text-sm text-center text-gray-600">
            New institution?{" "}
            <Link
              href="/auth/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "./header";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Top */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between"
        >
          {/* Brand */}
          <div className="max-w-sm space-y-2">
            <Logo className="text-white" color="white" />
            <p className="text-xs text-slate-400">
              A unified learning platform for admins, teachers, students, and
              parents to manage classes, performance, and fees in real time.
            </p>
            <p className="text-[11px] text-slate-500">
              Built for schools, colleges, and coaching institutes that care
              about clarity, speed, and data privacy.
            </p>
          </div>

          {/* Links */}
          <div className="grid gap-6 text-xs text-slate-400 sm:grid-cols-3 md:gap-10">
            <div className="space-y-2">
              <h4 className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                Product
              </h4>
              <div className="flex flex-col gap-1">
                <Link href="#features" className="hover:text-slate-100">
                  Features
                </Link>
                <Link href="#roles" className="hover:text-slate-100">
                  Access
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                Company
              </h4>
              <div className="flex flex-col gap-1">
                <Link href="#" className="hover:text-slate-100">
                  About
                </Link>
                <Link href="#" className="hover:text-slate-100">
                  Customers
                </Link>
                <Link href="#" className="hover:text-slate-100">
                  Support
                </Link>
                <Link href="#" className="hover:text-slate-100">
                  Contact
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                Legal & compliance
              </h4>
              <div className="flex flex-col gap-1">
                <Link href="#" className="hover:text-slate-100">
                  Privacy policy
                </Link>
                <Link href="#" className="hover:text-slate-100">
                  Terms of use
                </Link>
                <Link href="#" className="hover:text-slate-100">
                  Cookie policy
                </Link>
                <Link href="#" className="hover:text-slate-100">
                  Data protection
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/5 pt-4 text-[11px] text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {year} EDUVERSE. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-500">
              Made for institutes that demand clarity and control.
            </span>
            <Link
              href="#"
              className="inline-flex items-center gap-1 rounded-full border border-sky-500/40 bg-sky-500/5 px-3 py-1 text-[11px] font-medium text-sky-300 hover:bg-sky-500/10 hover:text-sky-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

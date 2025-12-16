// components/layout/Header.tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
  const { data: session } = useSession();
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-30 border-b border-black/10 bg-white backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center  gap-1.5 md:gap-3 text-sm">
          {session?.user ? (
            <>
              <Button
                variant="destructive"
                size="sm"
                className="cursor-pointer"
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                Logout
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={`/${session.user.id}`}>Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-full px-4 py-1.5 text-slate-950 hover:text-slate-700 ease-in-out duration-200 hover:bg-white/5 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="rounded-full bg-sky-500 px-4 py-1.5 font-medium text-white shadow-lg shadow-sky-500/30 hover:bg-sky-400 transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}

export function Logo({
  color = "black",
  className,
  showText = true,
}: {
  className?: string;
  color?: "black" | "white";
  showText?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-tr from-sky-500 to-violet-500 text-xs font-semibold text-white">
        EV
      </div>
      {showText && (
        <span className="text-sm font-semibold tracking-tight text-slate-950">
          <span className="bg-linear-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
            EDU
          </span>
          <span className={cn(`text-${color}`, className)}>VERSE</span>
        </span>
      )}
    </div>
  );
}

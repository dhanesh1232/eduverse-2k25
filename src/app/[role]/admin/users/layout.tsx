"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { UsersProvider } from "@/context/userProvider";
import { UserFormModal } from "@/components/pages/dash/admin/UserFormModal";

const tabs = [
  { label: "Teachers", href: "teachers" },
  { label: "Students", href: "students" },
  { label: "Parents", href: "parents" },
];

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <UsersProvider>
      <section className="space-y-0">
        {/* Header */}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage students, teachers, and parents
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => {
            const active = pathname.endsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition",
                  active
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Content */}
        <div>{children}</div>
        <UserFormModal />
      </section>
    </UsersProvider>
  );
}

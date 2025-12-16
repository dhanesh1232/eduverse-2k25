// components/home/Roles.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { LayoutDashboard, GraduationCap, User, Users } from "lucide-react";
import Link from "next/link";

const roles = [
  {
    key: "admin",
    icon: LayoutDashboard,
    label: "Admin",
    badge: "Management",
    desc: "Configure batches, fees, and permissions while tracking institute-wide health in one control room.",
    chips: ["Config center", "Fees & invoices", "Reports"],
    href: "/login/admin",
    highlight: "See everything at a glance.",
  },
  {
    key: "teacher",
    icon: GraduationCap,
    label: "Teacher",
    badge: "Teaching",
    desc: "Run classes, attendance, and assessments without bouncing between apps.",
    chips: ["Lesson planner", "Attendance", "Grades"],
    href: "/login/teacher",
    highlight: "Teach, track, and support faster.",
  },
  {
    key: "student",
    icon: User,
    label: "Student",
    badge: "Learning",
    desc: "Know what’s next, what’s due, and how you’re performing in one place.",
    chips: ["Timetable", "Assignments", "Scores"],
    href: "/login/student",
    highlight: "Stay on top of every deadline.",
  },
  {
    key: "parent",
    icon: Users,
    label: "Parent",
    badge: "Oversight",
    desc: "Get a clean view of attendance, fees, and performance for each child.",
    chips: ["Attendance", "Fees", "Alerts"],
    href: "/login/parent",
    highlight: "Peace of mind, without nagging.",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Roles() {
  return (
    <section
      id="roles"
      className="relative border-b border-gray-100 bg-linear-to-b from-white via-slate-50/60 to-white py-18"
    >
      {/* soft background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),_transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 lg:px-6">
        {/* header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-slate-50 px-3 py-1 text-[11px] font-medium tracking-wide">
            Role-aware dashboards
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
            Dashboards that match how each role works
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-gray-600">
            EDUVERSE adapts the same data into focused, clutter-free views for
            admins, teachers, students, and parents.
          </p>
        </div>

        {/* grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants as unknown as Variants}
          className="grid gap-4 md:grid-cols-4"
        >
          {roles.map((role) => (
            <motion.article
              key={role.key}
              variants={cardVariants as unknown as Variants}
              className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm shadow-gray-100/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/70 hover:shadow-md hover:shadow-sky-100/80"
            >
              {/* glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-sky-50 via-transparent to-indigo-50" />

              <div className="relative flex flex-1 flex-col">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100 group-hover:bg-sky-100 group-hover:text-sky-700 transition-colors">
                    <role.icon className="h-4 w-4" />
                  </div>
                  <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-500 ring-1 ring-slate-100">
                    {role.badge}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-gray-900">
                  {role.label} dashboard
                </h3>
                <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                  {role.desc}
                </p>

                <p className="mt-2 text-[11px] font-medium text-sky-700">
                  {role.highlight}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {role.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] text-slate-700 ring-1 ring-slate-100 group-hover:bg-sky-50 group-hover:text-sky-700 group-hover:ring-sky-100 transition-colors"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <Link
                  href={role.href}
                  className="mt-4 inline-flex items-center text-[11px] font-semibold text-sky-600 hover:text-sky-700"
                >
                  Open {role.label} view
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* helper text */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-[11px] text-gray-500">
          <span>Same backend, different dashboards tuned to each persona.</span>
          <span className="hidden sm:inline">•</span>
          <span>
            Keeps data consistent while avoiding information overload.
          </span>
        </div>
      </div>
    </section>
  );
}

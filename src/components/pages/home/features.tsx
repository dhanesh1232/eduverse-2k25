// components/home/Features.tsx
"use client";

import { motion, Variants } from "framer-motion";
import {
  Users2,
  Bell,
  BookOpen,
  FileText,
  TrendingUp,
  UserPlus,
  Library,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Users2,
    title: "Role-based access",
    desc: "Dedicated views for admins, teachers, students and parents so everyone sees only what matters to them.",
    tag: "Control",
  },
  {
    icon: Bell,
    title: "Smart notifications",
    desc: "Send the right alerts for homework, exams, fees and events across web, app and WhatsApp.",
    tag: "Engagement",
  },
  {
    icon: BookOpen,
    title: "Course management",
    desc: "Map syllabi, timetables and assessments into structured, reusable course templates.",
    tag: "Academics",
  },
  {
    icon: FileText,
    title: "Assignment workflows",
    desc: "Create, distribute, collect and grade assignments with automatic reminders.",
    tag: "Automation",
  },
  {
    icon: TrendingUp,
    title: "Performance analytics",
    desc: "Spot toppers, lagging students and risky batches with role-based dashboards.",
    tag: "Insights",
  },
  {
    icon: UserPlus,
    title: "Digital enrollment",
    desc: "Capture applications, documents and approvals without endless paperwork.",
    tag: "Admissions",
  },
  {
    icon: Library,
    title: "Central library",
    desc: "Organize notes, videos and reference material in one searchable space.",
    tag: "Resources",
  },
  {
    icon: MessageSquare,
    title: "Discussion spaces",
    desc: "Keep class Q&A, doubts and clarifications in structured, searchable threads.",
    tag: "Collaboration",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Features() {
  return (
    <section
      id="features"
      className="relative w-full border-b border-gray-100 bg-linear-to-b from-white via-sky-50/40 to-white py-20"
    >
      {/* subtle top gradient + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-gray-100/[0.35] bg-size-[80px_80px] mix-blend-soft-light" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        {/* header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-100">
            Platform overview
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
            Everything your campus runs on, in one OS
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-gray-600">
            Replace 5+ disconnected tools with a single, role-aware LMS that
            works for every stakeholder on campus.
          </p>
        </div>

        {/* feature grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants as unknown as Variants}
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.article
              key={f.title}
              variants={cardVariants as unknown as Variants}
              className="group relative h-full rounded-2xl border border-gray-100 bg-white/70 p-4 shadow-sm shadow-gray-100/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/60 hover:shadow-md hover:shadow-sky-100/80"
            >
              {/* hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-sky-50 via-transparent to-violet-50" />

              <div className="relative flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100 group-hover:bg-sky-100 group-hover:text-sky-700 transition-colors">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <span className="rounded-full bg-gray-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-500 group-hover:bg-sky-50 group-hover:text-sky-700">
                    {f.tag}
                  </span>
                </div>

                <h3 className="mt-1 text-sm font-semibold text-gray-900">
                  {f.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {f.desc}
                </p>

                {/* tiny affordance */}
                <span className="mt-1 inline-flex items-center text-[11px] font-medium text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  See how it works
                  <svg
                    className="ml-1 h-3 w-3"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 11L11 5M7 5H11V9"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* bottom helper line */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
          <span>Designed for K‑12, colleges and coaching institutes.</span>
          <span className="hidden sm:inline">•</span>
          <span>Turn on only the modules you need today, add more later.</span>
        </div>
      </div>
    </section>
  );
}

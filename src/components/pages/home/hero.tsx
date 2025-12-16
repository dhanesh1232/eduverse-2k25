// components/home/Hero.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxIntensity = Math.min(scrollY * 0.3, 60);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full mx-auto items-center border-b border-gray-50/50 bg-linear-to-br from-transparent via-sky-50/50 to-transparent overflow-hidden"
    >
      {/* Enhanced 3D background with particles */}
      <div className="absolute inset-0">
        {/* Animated gradient orb */}
        <div
          className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-r from-sky-400/20 via-indigo-400/20 to-violet-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translateY(${parallaxIntensity}px)`,
            filter: `hue-rotate(${scrollY * 0.1}deg)`,
          }}
        />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-size-[80px_80px]" />
        {/* Floating connection lines */}
        <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] border border-sky-200/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-spin-slow" />
      </div>

      <div className="relative z-10 flex w-full max-w-7xl mx-auto flex-col items-center gap-16 px-6 pt-28 pb-20 lg:flex-row lg:items-start lg:justify-between lg:gap-24 lg:px-8">
        {/* Enhanced Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 max-w-2xl space-y-8 text-center lg:text-left lg:max-w-lg"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-3 rounded-2xl border-2 border-gradient-to-r from-sky-500/20 to-emerald-500/20 bg-linear-to-r via-emerald-500/5 px-4 py-2 backdrop-blur-sm shadow-lg">
              <div className="w-2 h-2 bg-linear-to-r from-emerald-400 to-sky-400 rounded-full animate-ping" />
              <span className="text-sm font-semibold bg-linear-to-r from-sky-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                🚀 Live across 500+ institutes
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-balance leading-tight"
          >
            <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-[-0.05em]">
              <EduverseTitle />
            </div>
            <div className="mt-4 text-xl md:text-2xl lg:text-3xl font-medium text-gray-600 max-w-md mx-auto lg:mx-0">
              brings{" "}
              <span className="bg-linear-to-r from-sky-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent font-semibold">
                every classroom role
              </span>{" "}
              into one live dashboard.
            </div>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0"
          >
            Unified LMS for{" "}
            <span className="font-semibold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text">
              Admin · Teacher · Student · Parent
            </span>{" "}
            to track learning, attendance, fees, and performance in real time.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
          >
            <Link
              href="/auth/register"
              className="group relative inline-flex items-center gap-3 rounded-full bg-linear-to-r from-sky-500 to-emerald-500 px-6 py-2 text-lg font-semibold text-white shadow-2xl shadow-sky-500/25 hover:shadow-sky-500/40 transform transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <span>Explore Now</span>
              <ChevronRight className="group-hover:translate-x-2 text-white animate-pulse transform transition-transform duration-300" />
            </Link>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start"
          >
            <span>⚡ No credit card required</span>
            <span>•</span>
            <span>🏗️ Set up in 24 hours</span>
            <span>•</span>
            <span>🎓 500+ institutes trust us</span>
          </motion.p>
        </motion.div>

        {/* Enhanced Interactive Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative w-full max-w-2xl lg:w-auto lg:shrink-0"
        >
          <div className="relative">
            {/* Interactive device frame */}
            <div className="relative p-6 rounded-3xl bg-linear-to-br from-white/80 to-gray-50/80 backdrop-blur-xl border border-white/40 shadow-2xl shadow-gray-200/50 hover:shadow-gray-300/60 transition-all duration-500">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-white/60 px-3 py-1.5 rounded-xl backdrop-blur">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Institute Overview
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-100/80 px-2 py-1 rounded-lg">
                  Live
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                </div>
              </div>

              {/* Main dashboard preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="group relative rounded-2xl bg-linear-to-br from-sky-50 to-indigo-50 p-6 border border-sky-100/50 hover:border-sky-200/80 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-sky-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      📊 Today&apos;s Attendance
                    </p>
                    <div className="text-3xl lg:text-4xl font-black bg-linear-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                      96.4%
                    </div>
                    <p className="text-sm text-emerald-600 mt-1">
                      +2.3% from yesterday
                    </p>
                  </div>
                </div>

                <div className="group relative rounded-2xl bg-linear-to-br from-indigo-50 to-violet-50 p-6 border border-indigo-100/50 hover:border-indigo-200/80 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      👥 Active Users
                    </p>
                    <div className="text-3xl lg:text-4xl font-black bg-linear-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
                      1,247
                    </div>
                    <p className="text-sm text-sky-600 mt-1">
                      342 parents online
                    </p>
                  </div>
                </div>
              </div>

              {/* Live metrics grid */}
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  {
                    label: "Active Classes",
                    value: "47",
                    color: "text-sky-600",
                  },
                  {
                    label: "Homework Due",
                    value: "23",
                    color: "text-orange-600",
                  },
                  {
                    label: "Fee Pending",
                    value: "₹4.2k",
                    color: "text-purple-600",
                  },
                ].map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className={`group relative rounded-xl p-4 bg-white/70 backdrop-blur border border-gray-100/50 hover:shadow-md hover:scale-[1.02] transition-all duration-300 overflow-hidden hover:border-${metric.color}-200`}
                  >
                    <p className={`text-xs font-medium text-gray-600 mb-1`}>
                      {metric.label}
                    </p>
                    <p className={`text-2xl font-black ${metric.color}`}>
                      {metric.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interactive shine effect */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-white/0 via-white/40 to-white/0 rounded-3xl opacity-0"
              animate={{
                x: ["-100%", "100%", "-100%"],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const EduverseTitle = () => {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10 text-5xl md:text-7xl font-black bg-linear-to-r from-cyan-400 via-purple-500 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl">
        EDUVERSE
      </span>

      {/* Enhanced animated SVG underline */}
      <motion.svg
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 md:w-3/5 h-12 pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500"
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileHover={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { type: "spring", stiffness: 300, damping: 20 },
          duration: 0.8,
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="enhancedGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0ea5e9">
              <animate
                attributeName="stop-color"
                values="#0ea5e9; #3b82f6; #0ea5e9"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#6366f1">
              <animate
                attributeName="stop-color"
                values="#6366f1; #8b5cf6; #6366f1"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#8b5cf6">
              <animate
                attributeName="stop-color"
                values="#8b5cf6; #ec4899; #8b5cf6"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#6366f6" />
          </filter>
        </defs>

        {/* Smoother, more dynamic curve */}
        <motion.path
          d="M20,30 Q80,10 160,35 Q240,5 320,30 Q360,20 380,30 L380,40 L20,40 Z"
          stroke="url(#enhancedGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0 10"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          whileHover={{ pathLength: 1 }}
        />

        {/* Subtle wave particles */}
        <circle
          cx="100"
          cy="25"
          r="3"
          fill="url(#enhancedGradient)"
          opacity="0.6"
        >
          <animateMotion dur="4s" repeatCount="indefinite">
            <mpath href="#enhancedGradient" />
          </animateMotion>
        </circle>
      </motion.svg>

      {/* Floating particles for extra polish */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-40"
          animate={{
            x: [0, 100, 200],
            y: [-20, 10, -20],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "20%", left: "10%" }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full opacity-30"
          animate={{
            x: [-50, 150, 0],
            y: [30, -10, 30],
            scale: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{ top: "60%", right: "15%" }}
        />
      </div>
    </div>
  );
};

"use client";

import {
  Users,
  GraduationCap,
  BookOpen,
  Bell,
  TrendingUp,
  Calendar,
  AlertCircle,
  Download,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const stats = {
  students: 1248,
  teachers: 86,
  classes: 42,
  notices: 5,
  attendanceRate: 94,
  previousWeekChange: 2.3,
};

const attendanceData = [
  { day: "Mon", present: 1120, total: 1248, rate: 89.7 },
  { day: "Tue", present: 1184, total: 1248, rate: 94.9 },
  { day: "Wed", present: 1090, total: 1248, rate: 87.3 },
  { day: "Thu", present: 1144, total: 1248, rate: 91.7 },
  { day: "Fri", present: 1209, total: 1248, rate: 96.9 },
  { day: "Sat", present: 1061, total: 1248, rate: 85 },
];

const weeklyTrendData = [
  { week: "W1", present: 550 },
  { week: "W2", present: 1180 },
  { week: "W3", present: 965 },
  { week: "W4", present: 1690 },
  { week: "W5", present: 885 },
  { week: "W6", present: 1710 },
];

const notices = [
  {
    title: "Mid-semester exams begin from Monday",
    date: "Dec 18, 2025",
    priority: "high",
    category: "Academic",
  },
  {
    title: "Internal audit scheduled this Friday",
    date: "Dec 15, 2025",
    priority: "medium",
    category: "Administrative",
  },
  {
    title: "Holiday declared due to local elections",
    date: "Dec 14, 2025",
    priority: "low",
    category: "Holiday",
  },
];

const attendanceConfig: ChartConfig = {
  present: {
    label: "Present",
    color: "hsl(var(--primary))",
  },
};

export function DashboardOverviewAdmin() {
  return (
    <TooltipProvider>
      <section className="space-y-4">
        {/* HEADER - Improved spacing and responsive layout */}
        <div className="flex flex-col gap-2">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-sm text-muted-foreground">
              {`Welcome back! Here's what's happening with your institution today.`}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Today:</span> Dec 14, 2025
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Refresh data</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* METRICS - Improved grid and animations */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Students"
            value={stats.students}
            helper="Enrolled across all classes"
            icon={Users}
            trend={{ value: 12.5, positive: true }}
            delay={0}
          />
          <StatCard
            title="Total Teachers"
            value={stats.teachers}
            helper="Active teaching staff"
            icon={GraduationCap}
            trend={{ value: 3.2, positive: true }}
            delay={0.1}
          />
          <StatCard
            title="Total Classes"
            value={stats.classes}
            helper="Running this term"
            icon={BookOpen}
            trend={{ value: 2.1, positive: true }}
            delay={0.2}
          />
          <StatCard
            title="Active Notices"
            value={stats.notices}
            helper="Pending announcements"
            icon={Bell}
            trend={{ value: 8.7, positive: false }}
            badge="+3"
            delay={0.3}
          />
        </div>

        {/* INSIGHTS - Better grid and card organization */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Attendance Chart - Enhanced with better controls */}
          <Card className="lg:col-span-2 overflow-hidden px-2 p-3">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 px-2">
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold flex items-center gap-2 flex-wrap">
                  Weekly Attendance
                  <Badge variant="secondary" className="font-normal">
                    {stats.attendanceRate}% Avg
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Student presence trend for the current week
                </CardDescription>
              </div>
              <div className="flex gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Filter data</TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 px-2">
              <Tabs defaultValue="daily" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                </TabsList>

                <TabsContent value="daily" className="space-y-4 w-full">
                  <div className="h-64 w-full">
                    <ChartContainer
                      config={attendanceConfig}
                      className="h-full w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={attendanceData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#E5E7EB"
                            vertical={true}
                          />
                          <defs>
                            <linearGradient
                              id="colorPresent"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="var(--color-present)"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="var(--color-present)"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            className="text-xs"
                          />
                          <YAxis
                            tickLine={false}
                            axisLine={false}
                            width={40}
                            className="text-xs"
                          />
                          <ChartTooltip
                            content={
                              <ChartTooltipContent
                                formatter={(value) => [
                                  `${value} students`,
                                  "Present",
                                ]}
                              />
                            }
                          />
                          <Area
                            type="monotone"
                            dataKey="present"
                            stroke="blue"
                            fill="url(#colorPresent)"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "blue" }}
                            activeDot={{ r: 6 }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {attendanceData.map((day, index) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="text-xs font-medium text-center text-muted-foreground">
                          {day.day}
                        </div>
                        <div className="text-xl font-bold text-center">
                          {day.present}
                        </div>
                        <div className="space-y-1.5">
                          <Progress
                            value={day.rate}
                            className="h-1.5"
                            fill="blueviolet"
                          />
                          <div className="text-[10px] text-center text-muted-foreground">
                            {day.rate}%
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="weekly" className="w-full">
                  <div className="h-64 w-full">
                    <ChartContainer
                      config={attendanceConfig}
                      className="h-full w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weeklyTrendData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#E5E7EB"
                            vertical={true}
                          />
                          <XAxis
                            dataKey="week"
                            tickLine={false}
                            axisLine={false}
                            className="text-xs"
                          />
                          <YAxis
                            tickLine={false}
                            axisLine={false}
                            width={40}
                            className="text-xs"
                          />
                          <ChartTooltip
                            content={
                              <ChartTooltipContent
                                formatter={(value) => [
                                  `${value} students`,
                                  "Present",
                                ]}
                              />
                            }
                          />
                          <Line
                            type="monotone"
                            dataKey="present"
                            stroke="blue"
                            strokeWidth={2}
                            dot={{
                              r: 4,
                              fill: "var(oklch(62.3% 0.214 259.815))",
                            }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter className="flex-col items-start gap-2 border-t pt-4 text-xs">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Attendance typically peaks on Fridays
                </div>
                <Badge variant="outline" className="gap-1 text-xs">
                  <TrendingUp className="h-3 w-3" />+{stats.previousWeekChange}%
                  vs last week
                </Badge>
              </div>
            </CardFooter>
          </Card>

          {/* Notices & Updates - Improved layout */}
          <Card className="flex flex-col p-3">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 px-2">
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold flex items-center gap-2 flex-wrap">
                  Recent Notices
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    {stats.notices}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Latest updates from administration
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">View All</span>
              </Button>
            </CardHeader>

            <CardContent className="flex-1 px-2">
              <ul className="space-y-3">
                {notices.map((n, i) => (
                  <NoticeItem
                    key={i}
                    title={n.title}
                    date={n.date}
                    priority={n.priority as "high" | "medium" | "low"}
                    category={n.category}
                    delay={i * 0.1}
                  />
                ))}
              </ul>
            </CardContent>

            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full gap-2 text-sm">
                <Bell className="h-4 w-4" />
                Create New Notice
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* QUICK STATS - Simplified and cleaner */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
          <QuickStatCard
            label="Avg. Attendance"
            value={`${stats.attendanceRate}%`}
            change="+2.3% from last week"
            icon={TrendingUp}
            variant="blue"
            positive
          />
          <QuickStatCard
            label="Active Classes"
            value="42"
            change="8 more than last term"
            icon={BookOpen}
            variant="green"
            positive
          />
          <QuickStatCard
            label="Upcoming Events"
            value="7"
            change="Next: Mid-semester exams"
            icon={Calendar}
            variant="purple"
          />
        </div>
      </section>
    </TooltipProvider>
  );
}

/* ───────────────────────────
   ENHANCED STAT CARD
─────────────────────────── */

function StatCard({
  title,
  value,
  helper,
  icon: Icon,
  trend,
  badge,
  delay = 0,
}: {
  title: string;
  value: number;
  helper?: string;
  icon: React.ComponentType<any>;
  trend?: { value: number; positive: boolean };
  badge?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="relative gap-2 p-3 px-2 overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-2">
          <div className="flex-1">
            <CardTitle className="text-xs truncate font-medium uppercase tracking-wide text-muted-foreground">
              {title}
            </CardTitle>
            {helper && (
              <CardDescription className="text-xs line-clamp-2">
                {helper}
              </CardDescription>
            )}
          </div>

          <div className="relative">
            <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
              <Icon className="h-3.5 md:h-5 w-3.5 md:w-5" />
            </div>
            {badge && (
              <Badge className="absolute -top-1 -right-1 px-1.5 py-0 text-[10px] h-4">
                {badge}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="px-2">
          <div className="flex items-end justify-between">
            <div className="text-2xl font-bold tabular-nums">
              {value.toLocaleString()}
            </div>
            {trend && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${
                      trend.positive
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {trend.positive ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    )}
                    <span>{Math.abs(trend.value)}%</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {trend.positive ? "Increase" : "Decrease"} from last period
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ───────────────────────────
   ENHANCED NOTICE ITEM
─────────────────────────── */

function NoticeItem({
  title,
  date,
  priority,
  category,
  delay = 0,
}: {
  title: string;
  date: string;
  priority: "high" | "medium" | "low";
  category: string;
  delay?: number;
}) {
  const priorityConfig = {
    high: {
      color:
        "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
      iconColor: "text-red-600 dark:text-red-400",
      dot: "bg-red-500",
    },
    medium: {
      color:
        "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      dot: "bg-yellow-500",
    },
    low: {
      color:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      iconColor: "text-blue-600 dark:text-blue-400",
      dot: "bg-blue-500",
    },
  };

  const config = priorityConfig[priority];

  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className="group relative rounded-lg border bg-card p-3 transition-all hover:shadow-sm cursor-pointer"
    >
      <div
        className={`absolute left-0 top-0 h-full w-1 rounded-l-lg ${config.dot} transition-all group-hover:w-1.5`}
      />

      <div className="flex gap-3 pl-2">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.color}`}
        >
          <Bell className={`h-3.5 w-3.5 ${config.iconColor}`} />
        </div>

        <div className="flex-1 space-y-2 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h4>
            <Badge variant="outline" className="text-[10px] shrink-0 h-5">
              {category}
            </Badge>
          </div>

          <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {date}
            </span>
            <Badge
              className={`text-[10px] capitalize h-5 ${config.color}`}
              variant="outline"
            >
              {priority}
            </Badge>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

/* ───────────────────────────
   QUICK STAT CARD
─────────────────────────── */

function QuickStatCard({
  label,
  value,
  change,
  icon: Icon,
  variant,
  positive,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  variant: "blue" | "green" | "purple";
  positive?: boolean;
}) {
  const variantConfig = {
    blue: "from-blue-500/10 to-blue-600/5 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
    green:
      "from-green-500/10 to-green-600/5 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300",
    purple:
      "from-purple-500/10 to-purple-600/5 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300",
  };

  return (
    <Card className={`bg-linear-to-br p-3 ${variantConfig[variant]} border`}>
      <CardContent className="px-2">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className={`text-sm font-medium ${variantConfig[variant]}`}>
              {label}
            </p>
            <h3 className="text-3xl font-bold tabular-nums">{value}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {positive !== undefined &&
                (positive ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600" />
                ))}
              {change}
            </p>
          </div>
          <Icon className={`h-8 w-8 opacity-80 ${variantConfig[variant]}`} />
        </div>
      </CardContent>
    </Card>
  );
}

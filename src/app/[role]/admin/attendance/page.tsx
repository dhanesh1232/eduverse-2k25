"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  UserCheck,
  UserX,
  Clock,
  TrendingUp,
  Calendar,
  Download,
  Users,
  ChevronRight,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

/* ───────────────────────────
   DUMMY DATA
─────────────────────────── */

const classes = [
  { id: "10-A", total: 44, teacher: "Mr. Johnson" },
  { id: "10-B", total: 42, teacher: "Ms. Williams" },
  { id: "9-A", total: 45, teacher: "Mrs. Davis" },
];

const dailyData = [
  { name: "Present", value: 38, color: "#10b981" },
  { name: "Absent", value: 4, color: "#ef4444" },
  { name: "Late", value: 2, color: "#f59e0b" },
];

const monthlyData = [
  { day: "Week 1", rate: 92, present: 40, absent: 3, late: 1 },
  { day: "Week 2", rate: 95, present: 42, absent: 1, late: 1 },
  { day: "Week 3", rate: 90, present: 39, absent: 4, late: 1 },
  { day: "Week 4", rate: 96, present: 43, absent: 1, late: 1 },
];

const classAttendance = [
  { class: "10-A", present: 38, absent: 4, late: 2, percentage: 86.4 },
  { class: "10-B", present: 36, absent: 5, late: 1, percentage: 85.7 },
  { class: "9-A", present: 40, absent: 3, late: 2, percentage: 88.9 },
];

/* ───────────────────────────
   PAGE
─────────────────────────── */

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = React.useState("10-A");
  const [view, setView] = React.useState<"daily" | "monthly">("daily");
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const selectedClassData = classes.find((cls) => cls.id === selectedClass);
  const totalStudents = selectedClassData?.total || 0;

  return (
    <section className="space-y-4 max-w-full">
      {/* HEADER */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Users className="h-4 w-4" />
            <span className="text-sm">Attendance Management</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-sm font-medium text-foreground">
              Class {selectedClass}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Attendance Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time monitoring and analytics for class attendance
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <SelectValue placeholder="Select Class" />
                </div>
              </SelectTrigger>
              <SelectContent side="bottom" position="popper">
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>Class {cls.id}</span>
                      <Badge variant="outline" className="ml-2">
                        {cls.total} students
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <Calendar className="h-4 w-4" />
          </Button>

          <Button className="bg-primary hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* CLASS INFO BANNER */}
      {selectedClassData && (
        <Card className="bg-linear-to-r from-primary/5 py-0 gap-2 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="font-semibold">
                    Class {selectedClassData.id}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    • Class Teacher: {selectedClassData.teacher}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">
                  Total Students: {selectedClassData.total}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">86.4%</div>
                  <div className="text-xs text-muted-foreground">
                    Today's Attendance
                  </div>
                </div>
                <Progress value={86.4} className="w-24 h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Present Students"
          value="38"
          description={`of ${totalStudents} total`}
          icon={<UserCheck className="h-5 w-5" />}
          color="emerald"
          trend={{ value: "+2.5%", direction: "up" }}
        />
        <KpiCard
          title="Absent Students"
          value="4"
          description="Requires attention"
          icon={<UserX className="h-5 w-5" />}
          color="rose"
          trend={{ value: "-1.2%", direction: "down" }}
        />
        <KpiCard
          title="Late Arrivals"
          value="2"
          description="Within tolerance"
          icon={<Clock className="h-5 w-5" />}
          color="amber"
          trend={{ value: "+0.5%", direction: "up" }}
        />
        <KpiCard
          title="Attendance Rate"
          value="86.4%"
          description="Above school average"
          icon={<TrendingUp className="h-5 w-5" />}
          color="primary"
          trend={{ value: "+3.1%", direction: "up" }}
        />
      </div>

      {/* CHART SECTION */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 py-0 pt-4 gap-2">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4">
            <div>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>
                {view === "daily"
                  ? "Today's attendance distribution"
                  : "Monthly attendance trends"}
              </CardDescription>
            </div>

            <div className="flex items-center gap-3">
              <Tabs value={view} onValueChange={(v) => setView(v as any)}>
                <TabsList>
                  <TabsTrigger value="daily" className="px-4">
                    Daily
                  </TabsTrigger>
                  <TabsTrigger value="monthly" className="px-4">
                    Monthly
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="ghost" size="sm" className="h-9">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {view === "daily" ? (
                <BarChart
                  data={dailyData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280" }}
                  />
                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                    {dailyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <LineChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280" }}
                  />
                  <YAxis
                    domain={[85, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280" }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Attendance Rate"]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ r: 6, fill: "#6366f1", strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* QUICK STATS */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Class performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Best Attendance</span>
                <span className="font-semibold">Class 9-A (88.9%)</span>
              </div>
              <Progress value={88.9} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly Average</span>
                <span className="font-semibold">93.2%</span>
              </div>
              <Progress value={93.2} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">On-time Rate</span>
                <span className="font-semibold">95.5%</span>
              </div>
              <Progress value={95.5} className="h-2" />
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Overall Ranking
                </span>
                <Badge variant="secondary">2nd of 12</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CLASS-WISE ATTENDANCE */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Class-wise Attendance</CardTitle>
              <CardDescription>Detailed breakdown by class</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
              View All Classes
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {classAttendance.map((cls) => (
              <div
                key={cls.class}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="mb-3 sm:mb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="font-semibold text-lg">
                      Class {cls.class}
                    </div>
                    <Badge
                      variant={cls.percentage > 85 ? "default" : "secondary"}
                    >
                      {cls.percentage}%
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Total: {cls.present + cls.absent + cls.late}</span>
                    <span>
                      • Teacher:{" "}
                      {classes.find((c) => c.id === cls.class)?.teacher}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2">
                  <div className="flex gap-3">
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700 border-emerald-200"
                    >
                      <UserCheck className="mr-1 h-3 w-3" />
                      {cls.present}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-rose-50 text-rose-700 border-rose-200"
                    >
                      <UserX className="mr-1 h-3 w-3" />
                      {cls.absent}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200"
                    >
                      <Clock className="mr-1 h-3 w-3" />
                      {cls.late}
                    </Badge>
                  </div>
                  <Progress
                    value={cls.percentage}
                    className="w-full sm:w-48 h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/* ───────────────────────────
   IMPROVED KPI CARD COMPONENT
─────────────────────────── */

function KpiCard({
  title,
  value,
  description,
  icon,
  color = "primary",
  trend,
}: {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  color: "emerald" | "rose" | "amber" | "primary" | "blue" | "purple";
  trend?: { value: string; direction: "up" | "down" };
}) {
  const colorClasses = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    primary: "bg-primary/10 text-primary border-primary/20",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
  };

  return (
    <Card className="overflow-hidden border transition-all hover:shadow-md py-0 gap-2">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 text-xs">
                <span
                  className={
                    trend.direction === "up"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }
                >
                  {trend.direction === "up" ? "↗" : "↘"} {trend.value}
                </span>
                <span className="text-muted-foreground">from last week</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

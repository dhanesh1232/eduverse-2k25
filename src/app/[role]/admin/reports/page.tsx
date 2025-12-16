"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { Download, TrendingUp, TrendingDown, Filter } from "lucide-react";

/* ───────────────────────────
   DUMMY DATA
─────────────────────────── */

const performanceData = [
  { class: "10-A", avg: 78 },
  { class: "10-B", avg: 74 },
  { class: "9-A", avg: 81 },
  { class: "9-B", avg: 69 },
  { class: "8-A", avg: 85 },
];

const attendanceTrend = [
  { month: "Aug", attendance: 92 },
  { month: "Sep", attendance: 90 },
  { month: "Oct", attendance: 94 },
  { month: "Nov", attendance: 91 },
  { month: "Dec", attendance: 93 },
];

const studentReport = [
  { name: "Rahul Sharma", class: "10-A", avg: 82, attendance: 94 },
  { name: "Ananya Patel", class: "10-B", avg: 76, attendance: 88 },
  { name: "Aarav Joshi", class: "9-A", avg: 85, attendance: 96 },
  { name: "Sneha Iyer", class: "9-B", avg: 68, attendance: 83 },
  { name: "Kabir Desai", class: "8-A", avg: 90, attendance: 97 },
];

const chartConfig: ChartConfig = {
  avg: {
    label: "Average Score",
    color: "hsl(var(--chart-1))",
  },
  attendance: {
    label: "Attendance",
    color: "hsl(var(--chart-2))",
  },
};

/* ───────────────────────────
   PAGE
─────────────────────────── */

export default function ReportsPage() {
  const [term, setTerm] = React.useState("midterm");
  const [tab, setTab] = React.useState<
    "overview" | "performance" | "attendance"
  >("overview");

  const overallAvg =
    performanceData.reduce((sum, c) => sum + c.avg, 0) / performanceData.length;
  const overallAttendance =
    attendanceTrend.reduce((sum, m) => sum + m.attendance, 0) /
    attendanceTrend.length;

  const highPerformers = studentReport.filter((s) => s.avg >= 80).length;
  const lowPerformers = studentReport.filter((s) => s.avg < 70).length;

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground">
            Academic performance and attendance insights.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={term} onValueChange={setTerm}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent side="bottom" position="popper">
              <SelectItem value="midterm">Mid-term</SelectItem>
              <SelectItem value="final">Final</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>

          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* KPI ROW */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="py-2 rounded-md">
          <CardContent>
            <p className="text-xs text-muted-foreground">Overall average</p>
            <p className="text-xl font-semibold">{overallAvg.toFixed(1)}%</p>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              +2.4% vs last term
            </p>
          </CardContent>
        </Card>

        <Card className="py-2 rounded-md">
          <CardContent>
            <p className="text-xs text-muted-foreground">Avg attendance</p>
            <p className="text-xl font-semibold">
              {overallAttendance.toFixed(1)}%
            </p>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-amber-500" />
              -1.1% vs last term
            </p>
          </CardContent>
        </Card>

        <Card className="py-2 rounded-md">
          <CardContent>
            <p className="text-xs text-muted-foreground">High performers</p>
            <p className="text-xl font-semibold">{highPerformers}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Students scoring 80%+
            </p>
          </CardContent>
        </Card>

        <Card className="hidden md:block py-2 rounded-md">
          <CardContent>
            <p className="text-xs text-muted-foreground">At‑risk students</p>
            <p className="text-xl font-semibold">{lowPerformers}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Avg below 70%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* TABS */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        {/* OVERVIEW: both charts */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PerformanceChart />
            <AttendanceChart />
          </div>
        </TabsContent>

        {/* PERFORMANCE TAB */}
        <TabsContent value="performance" className="space-y-6">
          <PerformanceChart />
        </TabsContent>

        {/* ATTENDANCE TAB */}
        <TabsContent value="attendance" className="space-y-6">
          <AttendanceChart />
        </TabsContent>
      </Tabs>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">
            Student summary
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Combined academic and attendance performance.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Full table on md+, compact list on mobile */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Avg score</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {studentReport.map((s, i) => (
                  <TableRow key={i}>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.class}</TableCell>
                    <TableCell>{s.avg}%</TableCell>
                    <TableCell>{s.attendance}%</TableCell>
                    <TableCell>
                      <PerformanceBadge avg={s.avg} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-2 md:hidden">
            {studentReport.map((s) => (
              <div
                key={s.name}
                className="flex items-start justify-between rounded-md border bg-background p-2"
              >
                <div>
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {s.class} • Avg {s.avg}% • Att. {s.attendance}%
                  </p>
                </div>
                <PerformanceBadge avg={s.avg} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/* ───────────────────────────
   CHART COMPONENTS
─────────────────────────── */

function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class‑wise performance</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Average academic score (%) per class.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-64 sm:h-72">
        <ChartContainer
          config={{
            avg: { label: "Average score", color: "hsl(var(--chart-1))" },
          }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="class" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`${value}%`, "Average score"]}
                  />
                }
              />
              <Bar
                dataKey="avg"
                fill="var(--color-avg)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function AttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance trend</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Monthly average attendance percentage.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-64 sm:h-72">
        <ChartContainer
          config={{
            attendance: {
              label: "Attendance",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={true} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                domain={[80, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`${value}%`, "Attendance"]}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="gray"
                strokeWidth={2.5}
                dot={{ r: 3, stroke: "blue" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

/* ───────────────────────────
   PERFORMANCE BADGE
─────────────────────────── */

function PerformanceBadge({ avg }: { avg: number }) {
  if (avg >= 80) {
    return (
      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
        Good
      </Badge>
    );
  }

  if (avg >= 65) {
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-200">
        Average
      </Badge>
    );
  }

  return (
    <Badge className="bg-rose-100 text-rose-700 border-rose-200">
      Needs improvement
    </Badge>
  );
}

"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

/* ───────────────────────────
   DUMMY STUDENT DATA
─────────────────────────── */

const courses = [
  { name: "Mathematics", teacher: "Suresh Kumar" },
  { name: "Physics", teacher: "Ravi Prakash" },
  { name: "English", teacher: "Meena Iyer" },
  { name: "Computer Science", teacher: "Karthik Rao" },
];

const assignments = [
  {
    subject: "Mathematics",
    title: "Algebra Worksheet",
    due: "Dec 18, 2025",
  },
  {
    subject: "Physics",
    title: "Numerical Problems – Motion",
    due: "Dec 20, 2025",
  },
];

const notices = [
  {
    title: "Mid-Semester Exams",
    date: "Dec 14, 2025",
  },
  {
    title: "Holiday on Monday",
    date: "Dec 12, 2025",
  },
];

export default function StudentDashboard() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your academic progress
        </p>
      </div>

      {/* TOP SUMMARY */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Attendance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Attendance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Progress value={86} />
            <p className="text-sm font-medium">86%</p>
            <p className="text-xs text-muted-foreground">Overall attendance</p>
          </CardContent>
        </Card>

        {/* Courses */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{courses.length}</p>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        {/* Assignments */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pending Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{assignments.length}</p>
            <p className="text-xs text-muted-foreground">Due soon</p>
          </CardContent>
        </Card>
      </div>

      {/* COURSES */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enrolled Courses</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {courses.map((c, i) => (
            <div key={i} className="rounded-md border p-3">
              <p className="font-medium">{c.name}</p>
              <p className="text-xs text-muted-foreground">
                Teacher: {c.teacher}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ASSIGNMENTS */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upcoming Assignments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {assignments.map((a, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <div>
                <p className="font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.subject}</p>
              </div>
              <Badge variant="outline">Due {a.due}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* NOTICES */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {notices.map((n, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>{n.title}</span>
              <span className="text-muted-foreground">{n.date}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

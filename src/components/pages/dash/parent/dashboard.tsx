"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

/* ───────────────────────────
   DUMMY CHILD DATA
─────────────────────────── */

const child = {
  name: "Rahul Sharma",
  class: "10-A",
  rollNo: "10A-01",
};

const attendance = {
  presentDays: 19,
  totalDays: 22,
};

const notices = [
  {
    title: "Mid-Semester Examinations",
    date: "Dec 14, 2025",
  },
  {
    title: "Holiday Announcement",
    date: "Dec 12, 2025",
  },
];

export default function ParentDashboardPage() {
  const percentage = Math.round(
    (attendance.presentDays / attendance.totalDays) * 100
  );

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your child’s academic status
        </p>
      </div>

      {/* CHILD OVERVIEW */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Child Overview</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Info label="Student Name" value={child.name} />
          <Info label="Class" value={child.class} />
          <Info label="Roll Number" value={child.rollNo} />
        </CardContent>
      </Card>

      {/* ATTENDANCE SUMMARY */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Attendance Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <Progress value={percentage} />
          <div className="flex justify-between text-sm">
            <span>
              Present: <strong>{attendance.presentDays}</strong> /
              {attendance.totalDays}
            </span>
            <span className="font-medium">{percentage}%</span>
          </div>

          <p className="text-xs text-muted-foreground">
            Maintaining regular attendance supports consistent learning.
          </p>
        </CardContent>
      </Card>

      {/* NOTICES */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notices</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {notices.map((n, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span>{n.title}</span>
              <Badge variant="outline">{n.date}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

/* ───────────────────────────
   INFO ROW
─────────────────────────── */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

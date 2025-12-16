"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

/* ───────────────────────────
   DUMMY ATTENDANCE DATA
─────────────────────────── */

const monthlySummary = {
  month: "December 2025",
  presentDays: 19,
  totalDays: 22,
};

const dailyAttendance = [
  { date: "Dec 15, 2025", status: "Present" },
  { date: "Dec 14, 2025", status: "Present" },
  { date: "Dec 13, 2025", status: "Absent" },
  { date: "Dec 12, 2025", status: "Present" },
  { date: "Dec 11, 2025", status: "Present" },
  { date: "Dec 10, 2025", status: "Absent" },
];

export default function ParentAttendancePage() {
  const percentage = Math.round(
    (monthlySummary.presentDays / monthlySummary.totalDays) * 100
  );

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Attendance</h1>
        <p className="text-sm text-muted-foreground">
          Attendance report for your child
        </p>
      </div>

      {/* ───────────────
         MONTHLY SUMMARY
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Monthly Summary – {monthlySummary.month}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <Progress value={percentage} />

          <div className="flex justify-between text-sm">
            <span>
              Present: <strong>{monthlySummary.presentDays}</strong> /
              {monthlySummary.totalDays}
            </span>
            <span className="font-medium">{percentage}%</span>
          </div>

          <p className="text-xs text-muted-foreground">
            Regular attendance is essential for consistent academic progress.
          </p>
        </CardContent>
      </Card>

      {/* ───────────────
         DAILY REPORT
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daily Attendance Report</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {dailyAttendance.map((d, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{d.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        d.status === "Present" ? "default" : "destructive"
                      }
                    >
                      {d.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}

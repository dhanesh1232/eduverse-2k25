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

/* ───────────────────────────
   DUMMY DATA
─────────────────────────── */

const examSchedule = [
  {
    subject: "Mathematics",
    date: "Dec 18, 2025",
    time: "10:00 AM",
    maxMarks: 100,
  },
  {
    subject: "Physics",
    date: "Dec 20, 2025",
    time: "10:00 AM",
    maxMarks: 100,
  },
  {
    subject: "English",
    date: "Dec 22, 2025",
    time: "10:00 AM",
    maxMarks: 80,
  },
];

const results = [
  {
    subject: "Mathematics",
    marks: 78,
    maxMarks: 100,
    grade: "B+",
    status: "Pass",
  },
  {
    subject: "Physics",
    marks: 92,
    maxMarks: 100,
    grade: "A",
    status: "Pass",
  },
  {
    subject: "English",
    marks: 41,
    maxMarks: 80,
    grade: "C",
    status: "Pass",
  },
];

export default function StudentExamsPage() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Exams & Results</h1>
        <p className="text-sm text-muted-foreground">
          View exam schedule and your academic results
        </p>
      </div>

      {/* ───────────────
         EXAM SCHEDULE
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Exam Schedule</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {examSchedule.map((e, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <div>
                <p className="font-medium">{e.subject}</p>
                <p className="text-xs text-muted-foreground">
                  {e.date} · {e.time}
                </p>
              </div>

              <Badge variant="outline">Max {e.maxMarks}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ───────────────
         RESULTS TABLE
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Results</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {results.map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{r.subject}</TableCell>
                  <TableCell>
                    {r.marks}/{r.maxMarks}
                  </TableCell>
                  <TableCell>{r.grade}</TableCell>
                  <TableCell>
                    <Badge
                      variant={r.status === "Pass" ? "default" : "destructive"}
                    >
                      {r.status}
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

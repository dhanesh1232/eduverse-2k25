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
   DUMMY ASSIGNMENT DATA
─────────────────────────── */

const summary = {
  total: 8,
  completed: 5,
  pending: 3,
};

const assignments = [
  {
    subject: "Mathematics",
    title: "Algebra Practice Set",
    dueDate: "Dec 16, 2025",
    status: "Completed",
  },
  {
    subject: "Science",
    title: "Chemical Reactions Worksheet",
    dueDate: "Dec 17, 2025",
    status: "Pending",
  },
  {
    subject: "English",
    title: "Essay on Environmental Awareness",
    dueDate: "Dec 14, 2025",
    status: "Completed",
  },
  {
    subject: "Social Studies",
    title: "Civics Notes – Chapter 4",
    dueDate: "Dec 18, 2025",
    status: "Pending",
  },
  {
    subject: "Computer Science",
    title: "HTML Basics Assignment",
    dueDate: "Dec 13, 2025",
    status: "Completed",
  },
];

export default function ParentAssignmentsPage() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Assignments</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your child’s homework status
        </p>
      </div>

      {/* ───────────────
         SUMMARY
      ─────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Total Assignments" value={summary.total} />
        <SummaryCard label="Completed" value={summary.completed} />
        <SummaryCard label="Pending" value={summary.pending} />
      </div>

      {/* ───────────────
         ASSIGNMENT TABLE
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Assignment Status</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {assignments.map((a, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{a.subject}</TableCell>
                  <TableCell>{a.title}</TableCell>
                  <TableCell>{a.dueDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        a.status === "Completed" ? "default" : "destructive"
                      }
                    >
                      {a.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Footer note */}
      <p className="text-xs text-muted-foreground">
        Assignment status is updated by subject teachers and reflects submission
        records.
      </p>
    </section>
  );
}

/* ───────────────
   REUSABLE SUMMARY CARD
──────────────── */
function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="py-4 text-center">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}

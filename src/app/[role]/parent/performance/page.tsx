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
   DUMMY PERFORMANCE DATA
─────────────────────────── */

const examSummary = {
  exam: "Mid-Semester Examination",
  class: "Class 10 – Section A",
  totalSubjects: 6,
  overallPercentage: 78,
};

const subjectMarks = [
  { subject: "Mathematics", marks: 82, max: 100 },
  { subject: "Science", marks: 76, max: 100 },
  { subject: "English", marks: 88, max: 100 },
  { subject: "Social Studies", marks: 71, max: 100 },
  { subject: "Computer Science", marks: 91, max: 100 },
  { subject: "Hindi", marks: 68, max: 100 },
];

function grade(marks: number) {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  return "D";
}

export default function ParentPerformancePage() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Performance</h1>
        <p className="text-sm text-muted-foreground">
          Academic performance overview
        </p>
      </div>

      {/* ───────────────
         EXAM SUMMARY
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Exam Result Summary</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Exam</p>
            <p className="font-medium">{examSummary.exam}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Class</p>
            <p className="font-medium">{examSummary.class}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Subjects</p>
            <p className="font-medium">{examSummary.totalSubjects}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Overall Percentage</p>
            <p className="font-medium">{examSummary.overallPercentage}%</p>
          </div>
        </CardContent>
      </Card>

      {/* ───────────────
         SUBJECT MARKS
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Subject-wise Marks</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {subjectMarks.map((s, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{s.subject}</TableCell>
                  <TableCell>
                    {s.marks} / {s.max}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{grade(s.marks)}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Footer note */}
      <p className="text-xs text-muted-foreground">
        Grades are indicative and provided for parental reference only.
      </p>
    </section>
  );
}

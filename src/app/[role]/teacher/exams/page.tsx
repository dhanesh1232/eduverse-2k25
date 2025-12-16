"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
   DUMMY RESULTS DATA
─────────────────────────── */

const results = [
  {
    roll: "10A-01",
    name: "Rahul Sharma",
    marks: 78,
    grade: "B+",
    status: "Pass",
  },
  {
    roll: "10A-02",
    name: "Ananya Patel",
    marks: 92,
    grade: "A",
    status: "Pass",
  },
  {
    roll: "10A-03",
    name: "Mohammed Irfan",
    marks: 41,
    grade: "D",
    status: "Fail",
  },
  {
    roll: "10A-04",
    name: "Sneha Iyer",
    marks: 86,
    grade: "A-",
    status: "Pass",
  },
];

export default function ExamsPage() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Exams</h1>
        <p className="text-sm text-muted-foreground">
          Create exams and review student performance
        </p>
      </div>

      {/* ───────────────
         CREATE EXAM
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Create Exam</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input placeholder="Exam name (e.g. Mid-Term Mathematics)" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input placeholder="Class (e.g. 10-A)" />
            <Input placeholder="Subject" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input type="date" />
            <Input type="time" />
            <Input type="number" placeholder="Max marks" />
          </div>

          <Button className="w-full">Create Exam</Button>
        </CardContent>
      </Card>

      {/* ───────────────
         RESULTS
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Exam Results</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {results.map((r) => (
                <TableRow key={r.roll}>
                  <TableCell className="font-medium">{r.roll}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.marks}</TableCell>
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

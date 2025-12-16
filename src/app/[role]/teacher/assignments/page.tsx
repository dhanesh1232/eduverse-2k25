"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
   DUMMY SUBMISSIONS DATA
─────────────────────────── */

const submissions = [
  {
    roll: "10A-01",
    name: "Rahul Sharma",
    submittedOn: "Dec 14, 2025",
    status: "Submitted",
  },
  {
    roll: "10A-02",
    name: "Ananya Patel",
    submittedOn: "Dec 14, 2025",
    status: "Submitted",
  },
  {
    roll: "10A-03",
    name: "Mohammed Irfan",
    submittedOn: "-",
    status: "Pending",
  },
  {
    roll: "10A-04",
    name: "Sneha Iyer",
    submittedOn: "Dec 15, 2025",
    status: "Submitted",
  },
];

export default function AssignmentsPage() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Assignments</h1>
        <p className="text-sm text-muted-foreground">
          Create assignments and track student submissions
        </p>
      </div>

      {/* ───────────────
         CREATE ASSIGNMENT
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Create Assignment</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input placeholder="Assignment title" />

          <Textarea
            placeholder="Assignment description or instructions"
            rows={4}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input type="date" />
            <Input type="time" />
          </div>

          <Button className="w-full">Publish Assignment</Button>
        </CardContent>
      </Card>

      {/* ───────────────
         SUBMISSIONS LIST
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Submissions</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Submitted On</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {submissions.map((s) => (
                <TableRow key={s.roll}>
                  <TableCell className="font-medium">{s.roll}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.submittedOn}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        s.status === "Submitted" ? "default" : "destructive"
                      }
                    >
                      {s.status}
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

"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ───────────────────────────
   DUMMY DATA
─────────────────────────── */

const students = [
  { id: "10A-01", name: "Rahul Sharma" },
  { id: "10A-02", name: "Ananya Patel" },
  { id: "10A-03", name: "Mohammed Irfan" },
  { id: "10A-04", name: "Sneha Iyer" },
];

const history = [
  { date: "Dec 13, 2025", present: 38, total: 42 },
  { date: "Dec 12, 2025", present: 40, total: 42 },
  { date: "Dec 11, 2025", present: 39, total: 42 },
];

/* ───────────────────────────
   PAGE
─────────────────────────── */

export default function AttendancePage() {
  const [attendance, setAttendance] = React.useState<Record<string, boolean>>(
    () =>
      students.reduce((acc, s) => {
        acc[s.id] = true; // default present
        return acc;
      }, {} as Record<string, boolean>)
  );

  const toggle = (id: string) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Attendance</h1>
        <p className="text-sm text-muted-foreground">
          Mark today’s attendance and review past records
        </p>
      </div>

      {/* ───────────────
         MARK ATTENDANCE
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Today’s Attendance</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {students.map((s) => {
            const present = attendance[s.id];
            return (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Roll No: {s.id}
                  </p>
                </div>

                <Button
                  size="sm"
                  variant={present ? "default" : "outline"}
                  onClick={() => toggle(s.id)}
                  className={cn(
                    "gap-1",
                    present
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "border-destructive text-destructive"
                  )}
                >
                  {present ? (
                    <>
                      <Check size={14} /> Present
                    </>
                  ) : (
                    <>
                      <X size={14} /> Absent
                    </>
                  )}
                </Button>
              </div>
            );
          })}

          <Button className="w-full mt-4">Save Attendance</Button>
        </CardContent>
      </Card>

      {/* ───────────────
         ATTENDANCE HISTORY
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Attendance History</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {history.map((h) => (
            <div
              key={h.date}
              className="flex items-center justify-between rounded-md border px-3 py-2"
            >
              <span className="text-sm font-medium">{h.date}</span>
              <span className="text-sm text-muted-foreground">
                {h.present}/{h.total} present
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

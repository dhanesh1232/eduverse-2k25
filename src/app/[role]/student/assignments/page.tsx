"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload } from "lucide-react";

/* ───────────────────────────
   DUMMY ASSIGNMENT DATA
─────────────────────────── */

const assignments = [
  {
    id: "A-101",
    subject: "Mathematics",
    title: "Algebra Worksheet",
    due: "Dec 18, 2025",
    status: "Pending",
  },
  {
    id: "A-104",
    subject: "Physics",
    title: "Motion Numerical Problems",
    due: "Dec 20, 2025",
    status: "Pending",
  },
  {
    id: "A-108",
    subject: "English",
    title: "Essay on Environmental Protection",
    due: "Dec 12, 2025",
    status: "Submitted",
  },
];

export default function StudentAssignmentsPage() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Assignments</h1>
        <p className="text-sm text-muted-foreground">
          View and submit your assignments
        </p>
      </div>

      {/* Assignment List */}
      <div className="space-y-4">
        {assignments.map((a) => (
          <Card key={a.id}>
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-base">{a.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{a.subject}</p>
              </div>

              <Badge
                variant={a.status === "Submitted" ? "default" : "destructive"}
              >
                {a.status}
              </Badge>
            </CardHeader>

            <CardContent className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">Due: {a.due}</p>

              {/* Upload UI */}
              {a.status === "Pending" ? (
                <Button size="sm" variant="outline" className="gap-2">
                  <Upload size={14} />
                  Upload
                </Button>
              ) : (
                <span className="text-sm text-emerald-600 font-medium">
                  Submitted
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

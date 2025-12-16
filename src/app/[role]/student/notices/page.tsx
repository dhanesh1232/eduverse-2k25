"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ───────────────────────────
   DUMMY ANNOUNCEMENTS
─────────────────────────── */

const notices = [
  {
    title: "Mid-Semester Examinations",
    message:
      "Mid-semester examinations will begin from 18th December. Students are advised to check the exam schedule and prepare accordingly.",
    date: "Dec 14, 2025",
    category: "Academic",
  },
  {
    title: "Holiday Announcement",
    message: "The college will remain closed on Monday due to local elections.",
    date: "Dec 12, 2025",
    category: "General",
  },
  {
    title: "Library Book Submission",
    message:
      "Students must return all borrowed library books before the end of this month to avoid penalties.",
    date: "Dec 10, 2025",
    category: "Library",
  },
];

export default function StudentNoticesPage() {
  return (
    <section className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Notices</h1>
        <p className="text-sm text-muted-foreground">
          Official announcements for students
        </p>
      </div>

      {/* Notices */}
      <div className="space-y-2">
        {notices.map((notice, index) => (
          <Card key={index} className="gap-4">
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-base">{notice.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{notice.date}</p>
              </div>

              <Badge variant="outline">{notice.category}</Badge>
            </CardHeader>

            <CardContent>
              <p className="text-sm leading-relaxed text-foreground">
                {notice.message}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

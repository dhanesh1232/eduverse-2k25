"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ───────────────────────────
   DUMMY NOTICES DATA
─────────────────────────── */

const notices = [
  {
    title: "Mid-Semester Examinations",
    message:
      "Mid-semester examinations will commence from 18th December. Teachers are requested to complete syllabus coverage before the deadline.",
    date: "Dec 14, 2025",
    type: "Academic",
  },
  {
    title: "Staff Meeting",
    message:
      "A mandatory staff meeting is scheduled on Friday at 3:00 PM in the seminar hall.",
    date: "Dec 13, 2025",
    type: "Administrative",
  },
  {
    title: "Holiday Announcement",
    message:
      "The institution will remain closed on Monday due to local elections.",
    date: "Dec 12, 2025",
    type: "General",
  },
];

export default function NoticesPage() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Notices</h1>
        <p className="text-sm text-muted-foreground">
          Official announcements from the administration
        </p>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((notice, index) => (
          <Card key={index}>
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-base">{notice.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{notice.date}</p>
              </div>

              <Badge variant="outline">{notice.type}</Badge>
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

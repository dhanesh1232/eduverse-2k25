"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ───────────────────────────
   DUMMY NOTICE DATA
─────────────────────────── */

const notices = [
  {
    title: "Mid-Semester Examination Schedule Released",
    description:
      "The mid-semester examinations will commence from December 18, 2025. Detailed timetable has been shared with students.",
    date: "Dec 14, 2025",
    type: "Exam",
  },
  {
    title: "Holiday on December 16",
    description:
      "The institution will remain closed on December 16, 2025 due to local administrative elections.",
    date: "Dec 13, 2025",
    type: "Holiday",
  },
  {
    title: "Parent-Teacher Meeting",
    description:
      "PTM is scheduled for December 20, 2025. Parents are requested to attend as per the allocated time slots.",
    date: "Dec 12, 2025",
    type: "Meeting",
  },
  {
    title: "Submission Deadline Reminder",
    description:
      "Students are reminded to complete all pending assignments before December 17, 2025.",
    date: "Dec 11, 2025",
    type: "Academic",
  },
];

export default function ParentNoticesPage() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Notices</h1>
        <p className="text-sm text-muted-foreground">
          Official announcements from the institution
        </p>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((notice, index) => (
          <NoticeCard key={index} {...notice} />
        ))}
      </div>
    </section>
  );
}

/* ───────────────
   NOTICE CARD
──────────────── */

function NoticeCard({
  title,
  description,
  date,
  type,
}: {
  title: string;
  description: string;
  date: string;
  type: string;
}) {
  return (
    <Card className="hover:bg-muted/30 transition-colors">
      <CardHeader className="pb-2 space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant="outline">{type}</Badge>
        </div>
        <p className="text-xs text-muted-foreground">{date}</p>
      </CardHeader>

      <CardContent className="pt-1">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

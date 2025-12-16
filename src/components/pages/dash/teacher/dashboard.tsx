"use client";

import { BookOpen, CalendarClock, ClipboardList, Bell } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ───────────────────────────
   DUMMY DATA (REALISTIC)
─────────────────────────── */

const assignedClasses = [
  { class: "10-A", subject: "Mathematics" },
  { class: "9-B", subject: "Mathematics" },
  { class: "11-C", subject: "Statistics" },
];

const todaySchedule = [
  { time: "09:00 – 09:45", class: "10-A", subject: "Mathematics" },
  { time: "10:00 – 10:45", class: "9-B", subject: "Mathematics" },
  { time: "12:00 – 12:45", class: "11-C", subject: "Statistics" },
];

const pendingTasks = [
  { task: "Upload Unit Test marks (10-A)", due: "Today" },
  { task: "Prepare worksheet for 9-B", due: "Tomorrow" },
  { task: "Attendance verification (11-C)", due: "Today" },
];

const notices = [
  { title: "Staff meeting at 3:30 PM", date: "Today" },
  { title: "Exam duty roster updated", date: "Yesterday" },
];

/* ───────────────────────────
   PAGE
─────────────────────────── */

export default function TeacherDashboard() {
  return (
    <section className="space-y-6">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your classes and tasks
        </p>
      </div>

      {/* OVERVIEW CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          title="Assigned Classes"
          value={assignedClasses.length}
          icon={BookOpen}
        />
        <OverviewCard
          title="Today’s Periods"
          value={todaySchedule.length}
          icon={CalendarClock}
        />
        <OverviewCard
          title="Pending Tasks"
          value={pendingTasks.length}
          icon={ClipboardList}
        />
        <OverviewCard title="New Notices" value={notices.length} icon={Bell} />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Assigned Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Assigned Classes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {assignedClasses.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md border p-2"
              >
                <span className="text-sm font-medium">{c.class}</span>
                <Badge variant="secondary">{c.subject}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today’s Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Today’s Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaySchedule.map((s, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{s.time}</span>
                <span className="font-medium">
                  {s.class} · {s.subject}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Notices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notices.map((n, i) => (
              <div key={i}>
                <p className="text-sm font-medium">{n.title}</p>
                <span className="text-xs text-muted-foreground">{n.date}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* PENDING TASKS */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Pending Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingTasks.map((t, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md border p-2"
            >
              <span className="text-sm">{t.task}</span>
              <Badge variant={t.due === "Today" ? "destructive" : "outline"}>
                {t.due}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

/* ───────────────────────────
   COMPONENTS
─────────────────────────── */

function OverviewCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<any>;
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-xs text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}

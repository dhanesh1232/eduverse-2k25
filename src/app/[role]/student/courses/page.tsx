"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ───────────────────────────
   DUMMY COURSE DATA
─────────────────────────── */

const courses = [
  {
    subject: "Mathematics",
    teacher: "Suresh Kumar",
    content: [
      "Algebra – Linear equations",
      "Quadratic equations",
      "Trigonometry basics",
      "Coordinate geometry",
    ],
  },
  {
    subject: "Physics",
    teacher: "Ravi Prakash",
    content: [
      "Motion and Laws of Motion",
      "Work, Energy and Power",
      "Gravitation",
      "Sound",
    ],
  },
  {
    subject: "English",
    teacher: "Meena Iyer",
    content: [
      "Prose: The Last Leaf",
      "Poetry: The Road Not Taken",
      "Grammar – Tenses",
      "Writing skills",
    ],
  },
  {
    subject: "Computer Science",
    teacher: "Karthik Rao",
    content: [
      "Introduction to Computers",
      "Basics of Programming",
      "Flowcharts and Algorithms",
      "Internet fundamentals",
    ],
  },
];

export default function MyCoursesPage() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">My Courses</h1>
        <p className="text-sm text-muted-foreground">
          Subjects you are currently enrolled in
        </p>
      </div>

      {/* SUBJECT LIST */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {courses.map((course, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center justify-between">
                {course.subject}
                <Badge variant="outline">Active</Badge>
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Teacher: {course.teacher}
              </p>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-sm font-medium">Course Content</p>

              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {course.content.map((topic, i) => (
                  <li key={i}>{topic}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

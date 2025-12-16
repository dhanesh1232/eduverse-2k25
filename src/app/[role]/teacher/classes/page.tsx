"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/* ───────────────────────────
   DUMMY DATA
─────────────────────────── */

const classes = [
  {
    id: "10-A",
    subject: "Mathematics",
    students: 42,
  },
  {
    id: "9-B",
    subject: "Mathematics",
    students: 38,
  },
  {
    id: "11-C",
    subject: "Statistics",
    students: 36,
  },
];

export default function MyClassesPage() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">My Classes</h1>
        <p className="text-sm text-muted-foreground">
          Classes assigned to you this term
        </p>
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => (
          <Card key={c.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Class {c.id}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Subject: <span className="font-medium">{c.subject}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Students: <span className="font-medium">{c.students}</span>
              </p>

              <Button asChild size="sm" className="mt-2 w-full">
                <Link href={`classes/${c.id}`}>View Students</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ───────────────────────────
   DUMMY PROFILE DATA
─────────────────────────── */

const parentInfo = {
  name: "Ramesh Kumar",
  email: "ramesh.parent@gmail.com",
  phone: "9876543210",
  relation: "Father",
};

const childInfo = {
  name: "Aarav Kumar",
  class: "Class 10",
  section: "A",
  rollNo: "10A-23",
  admissionNo: "ADM-4587",
  status: "Active",
};

export default function ParentProfilePage() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Parent and student information
        </p>
      </div>

      {/* ───────────────
         PARENT INFO
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Parent Information</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
          <Info label="Name" value={parentInfo.name} />
          <Info label="Relation" value={parentInfo.relation} />
          <Info label="Email" value={parentInfo.email} />
          <Info label="Phone" value={parentInfo.phone} />
        </CardContent>
      </Card>

      {/* ───────────────
         CHILD INFO
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Child Information</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
          <Info label="Student Name" value={childInfo.name} />
          <Info
            label="Class / Section"
            value={`${childInfo.class} – ${childInfo.section}`}
          />
          <Info label="Roll Number" value={childInfo.rollNo} />
          <Info label="Admission Number" value={childInfo.admissionNo} />

          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge className="mt-1">{childInfo.status}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Footer note */}
      <p className="text-xs text-muted-foreground">
        Profile information is maintained by the institution. Please contact the
        administration for corrections.
      </p>
    </section>
  );
}

/* ───────────────
   INFO FIELD
──────────────── */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

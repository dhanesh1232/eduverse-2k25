"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

/* ───────────────────────────
   DUMMY TEACHER DATA
─────────────────────────── */

const teacher = {
  name: "Suresh Kumar",
  email: "suresh.kumar@college.edu",
  phone: "9876543210",
  subject: "Mathematics",
  employeeId: "TCH-201",
};

export default function TeacherProfilePage() {
  const [show, setShow] = React.useState(false);

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground">
          View your profile information and update password
        </p>
      </div>

      {/* ───────────────
         TEACHER DETAILS
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Teacher Details</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Detail label="Full Name" value={teacher.name} />
          <Detail label="Employee ID" value={teacher.employeeId} />
          <Detail label="Subject" value={teacher.subject} />
          <Detail label="Email" value={teacher.email} />
          <Detail label="Phone" value={teacher.phone} />
        </CardContent>
      </Card>

      {/* ───────────────
         CHANGE PASSWORD
      ─────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Change Password</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input type="password" placeholder="Current password" />

          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              placeholder="New password"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-2.5 text-muted-foreground"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <Input type="password" placeholder="Confirm new password" />

          <Button className="w-full">Update Password</Button>
        </CardContent>
      </Card>
    </section>
  );
}

/* ───────────────────────────
   REUSABLE DETAIL ROW
─────────────────────────── */

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

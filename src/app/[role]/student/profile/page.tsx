"use client";

import { PasswordField } from "@/app/auth/register/page";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import * as React from "react";

/* ───────────────────────────
   DUMMY STUDENT DATA
─────────────────────────── */

const student = {
  name: "Rahul Sharma",
  rollNo: "10A-01",
  class: "10-A",
  section: "A",
  email: "rahul.sharma@student.college.edu",
  phone: "9876543210",
  guardian: "Suresh Sharma",
  admissionYear: "2024",
};

export default function StudentProfilePage() {
  const [passwords, setPasswords] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    showOldPassword: false,
    showNewPassword: false,
    showConfirmNewPassword: false,
  });

  return (
    <section className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Your personal and academic information
        </p>
      </div>

      {/* PROFILE CARD */}
      <Card className="gap-4 p-4 rounded-md">
        <CardHeader className="px-0 py-0">
          <CardTitle className="text-base">Personal Information</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-2 sm:grid-cols-2 px-0 py-0">
          <Info label="Full Name" value={student.name} />
          <Info label="Roll Number" value={student.rollNo} />
          <Info label="Class" value={student.class} />
          <Info label="Section" value={student.section} />
          <Info label="Email" value={student.email} />
          <Info label="Phone Number" value={student.phone} />
          <Info label="Guardian Name" value={student.guardian} />
          <Info label="Admission Year" value={student.admissionYear} />
        </CardContent>
        <CardFooter className="flex flex-col w-full items-start border-t space-y-1.5 px-0 py-0 [.border-t]:pt-0">
          <Label className="text-xl font-bold text-muted-foreground">
            Change Password
          </Label>
          <PasswordField
            value={passwords.oldPassword}
            handleChange={(v) =>
              setPasswords((prev) => ({
                ...prev,
                oldPassword: v,
              }))
            }
            show={passwords.showOldPassword}
            setShow={() =>
              setPasswords((prev) => ({
                ...prev,
                showOldPassword: !prev.showOldPassword,
              }))
            }
          />
          <PasswordField
            value={passwords.newPassword}
            handleChange={(v) =>
              setPasswords((prev) => ({
                ...prev,
                newPassword: v,
              }))
            }
            show={passwords.showNewPassword}
            setShow={() =>
              setPasswords((prev) => ({
                ...prev,
                showNewPassword: !prev.showNewPassword,
              }))
            }
          />
          <PasswordField
            value={passwords.confirmNewPassword}
            handleChange={(v) =>
              setPasswords((prev) => ({
                ...prev,
                confirmNewPassword: v,
              }))
            }
            show={passwords.showConfirmNewPassword}
            setShow={() =>
              setPasswords((prev) => ({
                ...prev,
                showConfirmNewPassword: !prev.showConfirmNewPassword,
              }))
            }
          />
        </CardFooter>
      </Card>

      {/* FOOT NOTE */}
      <p className="text-xs text-muted-foreground">
        If any information is incorrect, please contact the administration.
      </p>
    </section>
  );
}

/* ───────────────────────────
   INFO ROW
─────────────────────────── */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-foreground">{value}</p>
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { DashboardOverviewAdmin } from "@/components/pages/dash/admin/dashboard";
import TeacherDashboard from "@/components/pages/dash/teacher/dashboard";
import StudentDashboard from "@/components/pages/dash/student/dashboard";
import ParentDashboardPage from "@/components/pages/dash/parent/dashboard";

export default function Page() {
  const { data: session } = useSession();
  console.log(session);

  switch (session?.user.role) {
    case "ADMIN":
      return (
        <div className="w-full">
          <DashboardOverviewAdmin />
        </div>
      );
    case "TEACHER":
      return (
        <div className="w-full">
          <TeacherDashboard />
        </div>
      );
    case "STUDENT":
      return (
        <div className="w-full">
          <StudentDashboard />
        </div>
      );
    case "PARENT":
      return (
        <div className="w-full">
          <ParentDashboardPage />
        </div>
      );
  }
  return null;
}

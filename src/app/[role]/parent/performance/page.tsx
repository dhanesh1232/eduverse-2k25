"use client";

import CoursesList from "@/components/pages/dash/lms/coursesList";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return <CoursesList basePath={`/${session?.user?.id}/parent/performance`} />;
}

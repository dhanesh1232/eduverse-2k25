"use client";
import { ClassesPage } from "@/components/pages/dash/lms/classesView";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function Page() {
  const { data: session } = useSession();
  const params = useParams();
  return (
    <ClassesPage
      basePath={`/${session?.user?.id}/parent/performance/${params.classId}}`}
    />
  );
}

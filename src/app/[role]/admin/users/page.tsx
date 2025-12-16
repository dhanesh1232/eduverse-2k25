"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function RedirectPage() {
  const { data: session } = useSession();
  redirect(`/${session?.user.id}/admin/users/students`);
}

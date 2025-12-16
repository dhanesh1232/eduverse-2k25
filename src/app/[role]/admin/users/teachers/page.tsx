"use client";

import { useCallback, useEffect, useState } from "react";
import { useUsers } from "@/context/userProvider";
import { UsersTable } from "@/components/pages/dash/admin/UsersTable";

interface Teacher {
  _id: string;
  customId: string;
  name: string;
  phone: string;
  status: string;
  metadata?: {
    subject?: string;
  };
}

interface TableTeacher {
  id: string;
  name: string;
  subject: string;
  phone: string;
  status: string;
}

export default function TeachersPage() {
  const { openAdd } = useUsers();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TableTeacher[]>([]);

  const fetchTeachers = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/users/teachers", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch teachers");
      }

      const result = await res.json();

      const normalized: TableTeacher[] = result.data.map((t: Teacher) => ({
        id: t.customId,
        name: t.name,
        subject: t.metadata?.subject ?? "-",
        phone: t.phone,
        status: t.status,
      }));

      setData(normalized);
    } catch (err) {
      console.error("FETCH_TEACHERS_ERROR:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  return (
    <UsersTable
      title="Teachers"
      addLabel="Add Teacher"
      columns={[
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "subject", label: "Subject" },
        { key: "phone", label: "Phone" },
      ]}
      data={data}
      loading={loading}
      onAdd={() => openAdd("TEACHER")}
    />
  );
}

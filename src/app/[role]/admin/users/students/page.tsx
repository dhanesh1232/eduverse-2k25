"use client";

import { UsersTable } from "@/components/pages/dash/admin/UsersTable";
import { useUsers } from "@/context/userProvider";
import { useCallback, useEffect, useState } from "react";

interface Student {
  _id: string;
  customId: string;
  name: string;
  phone: string;
  status: string;
  metadata?: {
    class?: string;
  };
}

interface TableStudent {
  id: string;
  name: string;
  class: string;
  phone: string;
  status: string;
}

export default function StudentsPage() {
  const { openAdd } = useUsers();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TableStudent[]>([]);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/users/students", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch students");
      }

      const result = await res.json();

      const normalized: TableStudent[] = result.data.map((s: Student) => ({
        id: s.customId,
        name: s.name,
        class: s.metadata?.class ?? "-",
        phone: s.phone,
        status: s.status,
      }));

      setData(normalized);
    } catch (err) {
      console.error("FETCH_STUDENTS_ERROR:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <UsersTable
      title="Students"
      addLabel="Add Student"
      columns={[
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "class", label: "Class" },
        { key: "phone", label: "Phone" },
      ]}
      data={data}
      loading={loading}
      onAdd={() => openAdd("STUDENT")}
    />
  );
}

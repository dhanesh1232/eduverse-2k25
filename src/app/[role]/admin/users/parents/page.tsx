"use client";

import { useCallback, useEffect, useState } from "react";
import { useUsers } from "@/context/userProvider";
import { UsersTable } from "@/components/pages/dash/admin/UsersTable";

interface Parent {
  _id: string;
  customId: string;
  name: string;
  phone: string;
  status: string;
  studentId?: {
    _id: string;
    name: string;
    customId?: string;
    studentInfo?: {
      class?: string;
      section?: string;
    };
  };
}

interface TableParent {
  id: string;
  name: string;
  student: string;
  phone: string;
  status: string;
}

export default function ParentsPage() {
  const { openAdd } = useUsers();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TableParent[]>([]);

  const fetchParents = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/users/parents", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch parents");
      }

      const result = await res.json();

      const normalized: TableParent[] = result.data.map((p: Parent) => {
        const student = p.studentId;

        const studentLabel = student
          ? `${student.name}${
              student.customId ? ` (${student.customId})` : ""
            }${
              student.studentInfo?.class
                ? ` • Class ${student.studentInfo.class}${
                    student.studentInfo.section
                      ? `-${student.studentInfo.section}`
                      : ""
                  }`
                : ""
            }`
          : "-";

        return {
          id: p.customId,
          name: p.name,
          student: studentLabel,
          phone: p.phone,
          status: p.status,
        };
      });

      setData(normalized);
    } catch (err) {
      console.error("FETCH_PARENTS_ERROR:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchParents();
  }, [fetchParents]);

  return (
    <UsersTable
      title="Parents"
      addLabel="Add Parent"
      columns={[
        { key: "id", label: "ID" },
        { key: "name", label: "Parent Name" },
        { key: "student", label: "Student" },
        { key: "phone", label: "Phone" },
      ]}
      data={data}
      loading={loading}
      onAdd={() => openAdd("PARENT")}
    />
  );
}

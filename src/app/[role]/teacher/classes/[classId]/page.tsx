"use client";

import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

/* ───────────────────────────
   DUMMY STUDENT DATA
─────────────────────────── */

const students = [
  {
    roll: "10A-01",
    name: "Rahul Sharma",
    phone: "9876543210",
  },
  {
    roll: "10A-02",
    name: "Ananya Patel",
    phone: "9123456789",
  },
  {
    roll: "10A-03",
    name: "Mohammed Irfan",
    phone: "9988776655",
  },
  {
    roll: "10A-04",
    name: "Sneha Iyer",
    phone: "9876501122",
  },
];

export default function ClassStudentsPage() {
  const { classId } = useParams();

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-start gap-2">
        <Button size="icon" variant="ghost" onClick={() => history.back()}>
          <MoveLeft className="h-4 w-4 text-muted-foreground" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold">Class {classId}</h1>
          <p className="text-sm text-muted-foreground">
            Student list (read-only)
          </p>
        </div>
      </div>

      {/* Student Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Students</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {students.map((s) => (
                <TableRow key={s.roll}>
                  <TableCell className="font-medium">{s.roll}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}

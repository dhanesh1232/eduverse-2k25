"use client";

import * as React from "react";
import { GraduationCap, Pencil, Plus, LayoutGrid, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/pages/dash/admin/StatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ───────────────────────────
   DUMMY DATA (ENHANCED)
─────────────────────────── */

const classesData = [
  {
    id: "CLS-10A",
    grade: "10",
    section: "A",
    teacher: "Suresh Kumar",
    students: 42,
    subjects: ["Maths", "Science", "English", "Social"],
    status: "active",
  },
  {
    id: "CLS-10B",
    grade: "10",
    section: "B",
    teacher: "Meena Iyer",
    students: 39,
    subjects: ["Maths", "Science", "English", "Hindi"],
    status: "active",
  },
  {
    id: "CLS-9A",
    grade: "9",
    section: "A",
    teacher: "Ravi Prakash",
    students: 36,
    subjects: ["Maths", "Physics", "Chemistry", "English"],
    status: "active",
  },
  {
    id: "CLS-9B",
    grade: "9",
    section: "B",
    teacher: "Sunita Reddy",
    students: 31,
    subjects: ["Biology", "Maths", "English", "History"],
    status: "inactive",
  },
  {
    id: "CLS-8A",
    grade: "8",
    section: "A",
    teacher: "Vikram Singh",
    students: 40,
    subjects: ["Maths", "Science", "Geography", "English"],
    status: "active",
  },
];

/* ───────────────────────────
   PAGE
─────────────────────────── */

type StatusTypes = "all" | "active" | "inactive";
export default function ClassesPage() {
  const [view, setView] = React.useState<"card" | "table">("card");
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<StatusTypes>("all");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedClass, setSelectedClass] = React.useState<any>(null);

  const filtered = classesData.filter((cls) => {
    const matchQuery =
      cls.grade.includes(query) ||
      cls.section.toLowerCase().includes(query.toLowerCase()) ||
      cls.teacher.toLowerCase().includes(query.toLowerCase());

    const matchStatus = status === "all" ? true : cls.status === status;

    return matchQuery && matchStatus;
  });

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Classes & Courses</h1>
          <p className="text-sm text-muted-foreground">
            Manage academic structure and class assignments
          </p>
        </div>

        <Button onClick={() => setModalOpen(true)}>
          <Plus className="mr-1 h-4 w-4" />
          Add Class
        </Button>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search by grade, section or teacher"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-xs"
        />

        <Select
          value={status}
          onValueChange={(value) => setStatus(value as StatusTypes)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>

          <SelectContent side="bottom" align="start" position="popper">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto flex gap-1">
          <Button
            size="icon"
            variant={view === "card" ? "default" : "outline"}
            onClick={() => setView("card")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={view === "table" ? "default" : "outline"}
            onClick={() => setView("table")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      {view === "card" ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cls) => (
            <ClassCard
              key={cls.id}
              data={cls}
              onEdit={() => {
                setSelectedClass(cls);
                setModalOpen(true);
              }}
            />
          ))}
        </div>
      ) : (
        <ClassTable data={filtered} onEdit={setSelectedClass} />
      )}

      {/* MODAL */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedClass ? "Edit Class" : "Add Class"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input placeholder="Grade (e.g. 10)" />
            <Input placeholder="Section (e.g. A)" />
            <Input placeholder="Class Teacher" />
            <Input placeholder="Number of Students" />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ───────────────────────────
   CARD VIEW
─────────────────────────── */

function ClassCard({ data, onEdit }: any) {
  return (
    <Card className="hover:shadow-md transition gap-3 p-4 rounded-md">
      <CardHeader className="px-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>
              Grade {data.grade} – {data.section}
            </CardTitle>
            <CardDescription className="flex items-center gap-1">
              <GraduationCap className="h-3 w-3" />
              {data.teacher}
            </CardDescription>
          </div>
          <StatusBadge status={data.status} />
        </div>
      </CardHeader>

      <CardContent className="space-y-2 px-2 relative flex items-center justify-between">
        <div className="flex flex-col space-y-2">
          <p className="text-sm">
            <strong>{data.students}</strong> students enrolled
          </p>

          <div className="flex flex-wrap gap-1">
            {data.subjects.map((s: string) => (
              <Badge key={s} variant="secondary" className="text-xs">
                {s}
              </Badge>
            ))}
          </div>
        </div>
        <Button size="icon" variant="ghost" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

/* ───────────────────────────
   TABLE VIEW
─────────────────────────── */

function ClassTable({ data, onEdit }: any) {
  return (
    <Card className="hover:shadow-md transition gap-2 rounded-md py-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((cls: any) => (
            <TableRow key={cls.id}>
              <TableCell>
                Grade {cls.grade} – {cls.section}
              </TableCell>
              <TableCell>{cls.teacher}</TableCell>
              <TableCell>{cls.students}</TableCell>
              <TableCell>
                <StatusBadge status={cls.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button size="icon" variant="ghost" onClick={() => onEdit(cls)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

"use client";

import * as React from "react";
import {
  GraduationCap,
  Pencil,
  Plus,
  LayoutGrid,
  List,
  Check,
  ChevronsUpDown,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Link from "next/link";

/* ───────────────────────────
   TYPES
─────────────────────────── */

type StatusTypes = "all" | "active" | "inactive";

type ClassForm = {
  title: string;
  description: string;
  grade: string;
  section: string;
  teacher: string;
  students: string[];
};

const defaultForm: ClassForm = {
  title: "",
  description: "",
  grade: "",
  section: "",
  teacher: "",
  students: [],
};

/* ───────────────────────────
   PAGE
─────────────────────────── */

export default function CoursesList({ basePath }: { basePath?: string }) {
  const [view, setView] = React.useState<"card" | "table">("card");
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<StatusTypes>("all");
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedClass, setSelectedClass] = React.useState<any>(null);

  const [teachers, setTeachers] = React.useState<any[]>([]);
  const [students, setStudents] = React.useState<any[]>([]);
  const [courses, setCourses] = React.useState<any[]>([]);

  const [form, setForm] = React.useState<ClassForm>(defaultForm);
  const [isSaving, setIsSaving] = React.useState(false);

  /* ───────── Fetch ───────── */

  React.useEffect(() => {
    Promise.all([
      fetch("/api/users/teachers").then((r) => r.json()),
      fetch("/api/users/students").then((r) => r.json()),
      fetch("/api/courses").then((r) => r.json()),
    ])
      .then(([t, s, c]) => {
        console.log(t, s, c);

        setTeachers(Array.isArray(t?.data) ? t.data : []);
        setStudents(Array.isArray(s?.data) ? s.data : []);
        setCourses(Array.isArray(c?.data) ? c.data : c ?? []); // adjust to your /api/courses shape
      })
      .catch((err) => {
        console.error(err);
        setTeachers([]);
        setStudents([]);
        setCourses([]);
      });
  }, []);

  /* ───────── Edit preload ───────── */

  React.useEffect(() => {
    if (!modalOpen) return;

    if (selectedClass) {
      setForm({
        title: selectedClass.title ?? "",
        description: selectedClass.description ?? "",
        grade: selectedClass.grade,
        section: selectedClass.section,
        teacher: selectedClass.teacherId._id,
        students: selectedClass.studentIds ?? [],
      });
    } else {
      setForm(defaultForm);
    }
  }, [selectedClass, modalOpen]);

  /* ───────── Save ───────── */

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const finalForm = selectedClass
        ? { ...form, id: selectedClass._id }
        : form;

      const res = await fetch("/api/courses", {
        method: selectedClass ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Class saved successfully");
      setModalOpen(false);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = courses.filter((c) => {
    const q = query.toLowerCase();
    const matchQuery =
      c.grade.includes(q) ||
      c.section.toLowerCase().includes(q) ||
      c.teacherId?.name?.toLowerCase().includes(q);

    const matchStatus =
      status === "all" ? true : status === "active" ? c.isActive : !c.isActive;

    return matchQuery && matchStatus;
  });

  /* ───────── Render ───────── */

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Classes & Courses</h1>
          <p className="text-sm text-muted-foreground">
            Manage academic structure
          </p>
        </div>
        {session?.user.role === "ADMIN" && (
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="mr-1 h-4 w-4" />
            Add Class
          </Button>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-xs"
        />

        <Select
          value={status}
          onValueChange={(v) => setStatus(v as StatusTypes)}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent side="bottom" position="popper">
            <SelectItem value="all">All</SelectItem>
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

      {/* Content */}
      {!courses.length ? (
        <div className="w-full flex-col flex justify-center items-center">
          <span className="text-muted-foreground">! No classes found</span>
          {session?.user.role === "ADMIN" && (
            <Button size="sm" onClick={() => setModalOpen(true)}>
              Add Course
            </Button>
          )}
        </div>
      ) : (
        <>
          {view === "card" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <ClassCard
                  key={c._id}
                  data={c}
                  onEdit={() => {
                    setSelectedClass(c);
                    setModalOpen(true);
                  }}
                  path={basePath}
                />
              ))}
            </div>
          ) : (
            <ClassTable
              data={filtered}
              onEdit={(c: any) => {
                setSelectedClass(c);
                setModalOpen(true);
              }}
              path={basePath}
            />
          )}
        </>
      )}

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedClass ? "Edit Class" : "Add Class"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
            />
            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
            />

            <div className="flex gap-2">
              <Input
                placeholder="Grade"
                value={form.grade}
                onChange={(e) =>
                  setForm((p) => ({ ...p, grade: e.target.value }))
                }
              />
              <Input
                placeholder="Section"
                value={form.section}
                onChange={(e) =>
                  setForm((p) => ({ ...p, section: e.target.value }))
                }
              />
            </div>

            <Select
              value={form.teacher}
              onValueChange={(v) => setForm((p) => ({ ...p, teacher: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Teacher" />
              </SelectTrigger>
              <SelectContent side="bottom" position="popper">
                {teachers.map((t) => (
                  <SelectItem key={t._id} value={t._id}>
                    {t.name} ({t.customId})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Students Multi Select */}
            <StudentsMultiSelect
              students={students}
              value={form.students}
              onChange={(v) => setForm((p) => ({ ...p, students: v }))}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ───────────────────────────
   STUDENTS MULTI SELECT
─────────────────────────── */

function StudentsMultiSelect({
  students,
  value,
  onChange,
}: {
  students: any[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium">Students</p>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {value.length ? `${value.length} selected` : "Select students"}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
          <Command>
            <CommandInput placeholder="Search students..." />
            <CommandEmpty>No students found</CommandEmpty>
            <ScrollArea className="h-48">
              <CommandGroup>
                {students.map((s) => {
                  const checked = value.includes(s._id);
                  return (
                    <CommandItem
                      key={s._id}
                      onSelect={() =>
                        onChange(
                          checked
                            ? value.filter((i) => i !== s._id)
                            : [...value, s._id]
                        )
                      }
                      className="flex gap-2"
                    >
                      <Checkbox checked={checked} />
                      {s.name}
                      {checked && <Check className="ml-auto h-4 w-4" />}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1">
          {value.map((id) => (
            <Badge key={id} variant="secondary" className="gap-1">
              {students.find((s) => s._id === id)?.name}
              <button onClick={() => onChange(value.filter((v) => v !== id))}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────
   CARD
─────────────────────────── */

function ClassCard({ data, onEdit, path }: any) {
  return (
    <Link href={`${path}/${data._id}`}>
      <Card className="p-4">
        <CardHeader className="px-0">
          <CardTitle>
            Grade {data.grade} – {data.section}
          </CardTitle>
          <CardDescription className="flex gap-1 items-center">
            <GraduationCap className="h-3 w-3" />
            {data.teacherId.name}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-between items-center px-0">
          <p className="text-sm">
            <strong>{data.studentIds.length}</strong> students
          </p>
          <StatusBadge status={data.isActive ? "active" : "inactive"} />
          <Button size="icon" variant="ghost" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

/* ───────────────────────────
   TABLE
─────────────────────────── */

function ClassTable({ data, onEdit, path }: any) {
  return (
    <Card className="py-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((c: any) => (
            <TableRow key={c._id}>
              <Link href={`${path}/${c._id}`}>
                <TableCell>
                  Grade {c.grade} – {c.section}
                </TableCell>
                <TableCell>{c.teacherId.name}</TableCell>
                <TableCell>{c.studentIds.length}</TableCell>
                <TableCell>
                  <StatusBadge status={c.isActive ? "active" : "inactive"} />
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" onClick={() => onEdit(c)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </Link>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

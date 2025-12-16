"use client";

import * as React from "react";
import { Plus, Pencil, Trash2, Filter, Search, Archive } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

/* ───────────────────────────
   DUMMY DATA
─────────────────────────── */

type NoticeStatus = "active" | "archived";

type Notice = {
  id: string;
  title: string;
  content: string;
  date: string;
  status: NoticeStatus;
};

const initialNotices: Notice[] = [
  {
    id: "NT-001",
    title: "Mid-Semester Examinations",
    content:
      "Mid-semester examinations will begin from Monday, 18th December. Students are advised to check the timetable.",
    date: "Dec 14, 2025",
    status: "active",
  },
  {
    id: "NT-002",
    title: "Holiday Announcement",
    content:
      "The institution will remain closed on Friday due to local elections.",
    date: "Dec 12, 2025",
    status: "active",
  },
  {
    id: "NT-003",
    title: "Internal Audit Notice",
    content:
      "An internal academic audit will be conducted for all departments this week.",
    date: "Dec 08, 2025",
    status: "archived",
  },
];

/* ───────────────────────────
   PAGE
─────────────────────────── */

export default function AnnouncementsPage() {
  const [notices, setNotices] = React.useState<Notice[]>(initialNotices);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Notice | null>(null);
  const [search, setSearch] = React.useState("");
  const [tab, setTab] = React.useState<NoticeStatus | "all">("all");

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const resetForm = () => {
    setTitle("");
    setContent("");
  };

  const handleOpenNew = () => {
    setEditing(null);
    resetForm();
    setOpen(true);
  };

  const handleOpenEdit = (notice: Notice) => {
    setEditing(notice);
    setTitle(notice.title);
    setContent(notice.content);
    setOpen(true);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    if (editing) {
      setNotices((prev) =>
        prev.map((n) => (n.id === editing.id ? { ...n, title, content } : n))
      );
    } else {
      const newNotice: Notice = {
        id: `NT-${(notices.length + 1).toString().padStart(3, "0")}`,
        title,
        content,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        status: "active",
      };
      setNotices((prev) => [newNotice, ...prev]);
    }

    setOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const handleToggleArchive = (id: string) => {
    setNotices((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              status: n.status === "active" ? "archived" : "active",
            }
          : n
      )
    );
  };

  const filteredNotices = notices
    .filter((n) => (tab === "all" ? true : n.status === tab))
    .filter((n) =>
      [n.title, n.content].some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    );

  const activeCount = notices.filter((n) => n.status === "active").length;
  const archivedCount = notices.length - activeCount;

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Announcements
          </h1>
          <p className="text-sm text-muted-foreground">
            Publish and manage notices for students, staff, and parents.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              className="w-full pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button onClick={handleOpenNew} className="w-full sm:w-auto">
            <Plus className="mr-1.5 h-4 w-4" />
            New Announcement
          </Button>
        </div>
      </div>

      {/* STATS + FILTER TABS */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <Card className="flex-1 py-0 p-2 rounded-md">
            <CardContent className="flex items-center justify-between px-2">
              <div>
                <p className="text-xs text-muted-foreground">Active</p>
                <p className="text-xl font-semibold">{activeCount}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                Live
              </Badge>
            </CardContent>
          </Card>
          <Card className="flex-1 py-0 p-2 rounded-md">
            <CardContent className="flex items-center justify-between px-2">
              <div>
                <p className="text-xs text-muted-foreground">Archived</p>
                <p className="text-xl font-semibold">{archivedCount}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                History
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as any)}
          className="self-start"
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* NOTICE LIST */}
      {filteredNotices.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <p className="text-sm font-medium">No announcements yet</p>
            <p className="text-xs text-muted-foreground max-w-sm">
              Create a new announcement to share important updates with your
              institution. You can always edit or archive it later.
            </p>
            <Button size="sm" onClick={handleOpenNew}>
              <Plus className="mr-1.5 h-4 w-4" />
              Create announcement
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filteredNotices.map((n) => (
            <NoticeCard
              key={n.id}
              notice={n}
              onEdit={() => handleOpenEdit(n)}
              onDelete={() => handleDelete(n.id)}
              onToggleArchive={() => handleToggleArchive(n.id)}
            />
          ))}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {editing ? "Edit announcement" : "New announcement"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium">
                Title <span className="text-rose-500">*</span>
              </label>
              <Input
                placeholder="Exam schedule, holiday, event..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium">
                Content <span className="text-rose-500">*</span>
              </label>
              <Textarea
                placeholder="Write the announcement content here..."
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <p className="text-[11px] text-muted-foreground">
                Keep it concise and include any important dates, times, or
                instructions.
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <p className="text-[11px] text-muted-foreground">
              This will be visible immediately to all relevant users.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                {editing ? "Save changes" : "Publish"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ───────────────────────────
   NOTICE CARD
─────────────────────────── */

function NoticeCard({
  notice,
  onEdit,
  onDelete,
  onToggleArchive,
}: {
  notice: Notice;
  onEdit: () => void;
  onDelete: () => void;
  onToggleArchive: () => void;
}) {
  const isActive = notice.status === "active";

  return (
    <Card className="transition hover:shadow-md px-0 p-4 gap-2">
      <CardHeader className="px-0">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{notice.title}</CardTitle>
              <span className="text-[11px] text-muted-foreground">
                {notice.id}
              </span>
            </div>
            <CardDescription className="text-xs">
              Published on {notice.date}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2 self-start">
            <Badge
              variant="outline"
              className={
                isActive
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }
            >
              {isActive ? "Active" : "Archived"}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Filter className="h-4 w-4 rotate-90 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onToggleArchive}>
                  <Archive className="mr-2 h-4 w-4" />
                  {isActive ? "Move to archive" : "Restore"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-rose-600 focus:text-rose-600"
                  onClick={onDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-0">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {notice.content}
        </p>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-2 border-t [.border-t]:pt-0 pt-3 px-0">
        <div className="text-[11px] text-muted-foreground">
          Visible to: Students, Teachers, Parents
        </div>
        <div className="flex gap-1.5">
          <Button size="icon" variant="ghost" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onToggleArchive}>
            <Archive className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onDelete}>
            <Trash2 className="h-4 w-4 text-rose-600" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

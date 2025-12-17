"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { MoveLeft, Plus } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

type ClassItem = {
  _id: string;
  title: string; // e.g. "Algebra – Introduction"
  subject: string; // e.g. "Maths"
  videoUrl?: string; // e.g. "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  order?: number;
  description?: string;
};

export function ClassesPage({ basePath }: { basePath?: string }) {
  const { data: session } = useSession();
  const params = useParams<{ classId: string }>();
  const router = useRouter();
  const [classes, setClasses] = React.useState<ClassItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    title: "",
    subject: "",
    videoUrl: "",
    order: 1,
    description: "",
  });
  const [isSaving, setIsSaving] = React.useState(false);
  console.log(params);
  const isTeacher = session?.user.role === "TEACHER";

  React.useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/classes?courseId=${params.classId}`);
      const data = await res.json();
      // API returns array directly, sorted by order
      const list = Array.isArray(data) ? data : [];
      setClasses(list);
      // next default order = last order + 1
      const nextOrder = list.length
        ? Math.max(...list.map((c) => c.order ?? 0)) + 1
        : 1;
      setForm((p) => ({ ...p, order: nextOrder }));
    };
    if (params.classId) load();
  }, [params.classId]);

  const handleCreate = async () => {
    try {
      setIsSaving(true);
      const res = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          order: Number(form.order),
          courseId: params.classId,
        }),
      });

      const created = await res.json();
      if (res.ok) {
        // API returns the document itself
        setClasses((prev) =>
          [...prev, created].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        );
        setOpen(false);
        const nextOrder = (created.order ?? 0) + 1;
        setForm({
          title: "",
          subject: "",
          videoUrl: "",
          order: nextOrder,
          description: "",
        });
      }
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2 justify-start">
          <Button variant="outline" onClick={() => history.back()}>
            <MoveLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">Classes</h1>
            <p className="text-sm text-muted-foreground">
              Browse subjects and open details.
            </p>
          </div>
        </div>

        {isTeacher && (
          <Button
            variant="outline"
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <Plus className="text-muted-foreground h-4 w-4" /> Add Class
          </Button>
        )}
      </div>

      {/* List */}
      {!classes.length ? (
        <div className="w-full flex-col flex py-20 justify-center items-center">
          <span className="text-muted-foreground mb-4">! No classes found</span>
          {isTeacher && (
            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Add Class
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <Link key={cls._id} href={`${basePath}/${cls._id}`}>
              <Card className="cursor-pointer hover:bg-muted/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex justify-between">
                    <span>
                      {cls.order}. {cls.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {cls.subject}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  {cls.videoUrl ? "Video tutorial available" : "No video yet"}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Add Class Modal (teacher only) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Class</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              placeholder="Title (e.g. Algebra – Introduction)"
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
            />
            <Input
              placeholder="Subject (e.g. Maths, Science)"
              value={form.subject}
              onChange={(e) =>
                setForm((p) => ({ ...p, subject: e.target.value }))
              }
            />
            <Input
              placeholder="Video URL (YouTube, etc.)"
              value={form.videoUrl}
              onChange={(e) =>
                setForm((p) => ({ ...p, videoUrl: e.target.value }))
              }
            />
            <Input
              type="number"
              min={1}
              placeholder="Order (1, 2, 3...)"
              value={form.order}
              onChange={(e) =>
                setForm((p) => ({ ...p, order: Number(e.target.value) || 1 }))
              }
            />
            <div className="space-y-0.5">
              <Textarea
                placeholder="Briefly describe what students will learn in this class…"
                className="resize-none"
                rows={3}
                value={form.description ?? ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
              />
              <p className="text-[11px] text-muted-foreground">
                Optional – helps students understand the topic at a glance.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              disabled={isSaving}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button disabled={isSaving} onClick={handleCreate}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

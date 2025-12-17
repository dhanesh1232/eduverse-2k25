"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { defaultForm, useUsers } from "@/context/userProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

type Student = {
  _id: string;
  name: string;
  metadata?: Record<string, unknown>;
  customId?: string;
};

export function UserFormModal() {
  const { role, editingUser, close, triggerRefresh, code, form, setForm } =
    useUsers();
  const [students, setStudents] = useState<Student[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [generatingId, setGeneratingId] = useState(false);

  useEffect(() => {
    if (role) {
      const prefixMap: Record<string, string> = {
        STUDENT: "STU",
        TEACHER: "TCH",
        PARENT: "PAR",
      };
      const prefix = prefixMap[role] || "USR";

      const generateId = async () => {
        try {
          setGeneratingId(true);
          const res = await fetch(`/api/users/latest-id?role=${role}`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });
          if (!res.ok) {
            throw new Error("Failed to fetch latest ID");
          }
          const value = await res.json();
          const data = value.data;

          const latestNumber = data.latestNumber || 0;
          const nextNumber = (latestNumber + 1).toString().padStart(4, "0");
          const newId = `${code}-${prefix}-${nextNumber}`;
          setForm((prev) => ({ ...prev, id: newId }));
        } catch (error) {
          console.error("Failed to generate ID", error);
          const fallbackNumber = "0001";
          setForm((prev) => ({
            ...prev,
            id: `${code}-${prefix}-${fallbackNumber}`,
          }));
        } finally {
          setGeneratingId(false);
        }
      };

      generateId();
    }
  }, [role, code, setForm]);

  const fetchSudents = useCallback(async () => {
    const res = await fetch(`/api/users/students`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
    setStudents(data.data);
  }, []);

  useEffect(() => {
    if (role && role === "PARENT") {
      // Defer fetch to avoid synchronous setState inside effect
      queueMicrotask(() => fetchSudents?.());
    }
  }, [fetchSudents, role]);

  if (!role) return null;

  const validateForm = () => {
    if (!form?.id?.trim()) {
      return false;
    }
    if (!form.name.trim()) {
      return false;
    }
    if (!form.phone.trim()) {
      return false;
    }
    if (role !== "PARENT" && !form.extra?.trim()) {
      return false;
    }
    if (role === "PARENT" && !form.student?.trim()) {
      return false;
    }
    if (form.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form?.email)) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSaving(true);

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed");
        return;
      }

      if (data.credentials?.password) {
        toast.success(`User created succussfully`);
      } else {
        toast.success("User updated successfully");
      }
      setForm(defaultForm);
    } catch (err) {
      console.log(err);
      toast.error((err as Error).message || "Something went wrong");
    } finally {
      setIsSaving(false);
    }

    triggerRefresh();
    close();
  };

  const onClose = () => {
    setForm(defaultForm);
    close();
  };

  return (
    <Dialog open={!!role} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingUser ? "Edit" : "Add"} {role}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            value={form.id}
            className={`transition-all duration-300 ${
              generatingId ? "animate-pulse bg-blue-50" : ""
            }`}
            placeholder={generatingId ? "Generating..." : ""}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            disabled
            readOnly
          />

          <Input
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          {role !== "PARENT" && (
            <Input
              placeholder={role === "STUDENT" ? "Class" : "Subject"}
              value={form.extra}
              onChange={(e) => setForm({ ...form, extra: e.target.value })}
            />
          )}
          {role === "PARENT" && (
            <Select
              value={form.student}
              onValueChange={(v) => setForm((p) => ({ ...p, student: v }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Student !" />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom" className="w-full">
                {students.map((s) => (
                  <SelectItem key={s?._id} value={s._id}>
                    {s?.name} {s.customId && `(${s.customId})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Button
            onClick={handleSubmit}
            disabled={isSaving || !validateForm()}
            className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white w-full"
          >
            {isSaving ? (
              <span className="flex items-center gap-1">
                <Loader2 className="animate-spin" />
                Saving....
              </span>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

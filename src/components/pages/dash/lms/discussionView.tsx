"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";

type DiscussionItem = {
  _id: string;
  userId: {
    name: string;
    role: string;
    metadata: {
      subject: string;
    };
  };
  message: string;
  createdAt: string;
};

export function Discussions({ classId }: { classId: string }) {
  const { data: session } = useSession();
  const [items, setItems] = React.useState<DiscussionItem[]>([]);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [posting, setPosting] = React.useState(false);

  const load = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/classes/${classId}/discussions`);
      const data = await res.json();
      setItems(
        Array.isArray(data.data?.discussions) ? data.data.discussions : []
      );
    } finally {
      setLoading(false);
    }
  }, [classId]);

  React.useEffect(() => {
    if (classId) load();
  }, [classId, load]);

  const handlePost = async () => {
    if (!value.trim()) return;
    setPosting(true);
    try {
      const res = await fetch(`/api/classes/${classId}/discussions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value }),
      });
      const data = await res.json();
      if (res.ok && data.data?.discussion) {
        setItems((prev) => [data.data.discussion, ...prev]);
        setValue("");
      }
      await load();
    } finally {
      setPosting(false);
    }
  };
  const showAction =
    session?.user.role === "STUDENT" || session?.user.role === "TEACHER";

  return (
    <Card className="border-none shadow-sm rounded-md bg-muted/40 p-2">
      <CardHeader className="px-2 pt-2 border-b [.border-b]:pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Discussion</CardTitle>
          <p className="text-xs text-muted-foreground">
            Ask questions or share your notes
          </p>
        </div>
      </CardHeader>

      <CardContent className="px-2 py-2 space-y-2">
        {/* Threads */}
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {loading ? (
            <p className="text-xs text-muted-foreground">Loading…</p>
          ) : !items.length ? (
            <p className="text-xs text-muted-foreground">
              No messages yet. Be the first to start the discussion.
            </p>
          ) : (
            items.map((item) => (
              <div key={item._id} className="flex gap-3">
                <div
                  className={`h-7 w-7 rounded-full ${
                    item.userId.role === "TEACHER"
                      ? "bg-blue-500/80"
                      : "bg-sky-400/70"
                  } text-white flex items-center justify-center`}
                >
                  {item.userId.name?.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium">
                      {item?.userId?.name}{" "}
                      <span className="text-xs capitalize text-muted-foreground">
                        ({item.userId.role})
                      </span>
                    </p>
                    <span className="text-[11px] text-muted-foreground">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-snug whitespace-pre-line">
                    {item.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t" />

        {/* Composer */}
        {showAction && (
          <div className="flex gap-3">
            <div className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground bg-primary/80">
              {session?.user?.name?.charAt(0)}
            </div>
            <div className="flex-1 space-y-1">
              <Textarea
                placeholder="Write a comment or question…"
                className="min-h-[72px] resize-none text-sm"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-muted-foreground">
                  Be specific and respectful. Your teacher and classmates can
                  see this.
                </p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => setValue("")}
                    disabled={posting || !value}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="text-xs px-4"
                    onClick={handlePost}
                    disabled={posting || !value}
                  >
                    {posting ? "Posting…" : "Post"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

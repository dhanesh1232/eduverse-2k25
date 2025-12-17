"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoveLeft } from "lucide-react";
import { Discussions } from "./discussionView";
import { useSession } from "next-auth/react";
import Link from "next/link";

type ClassDetail = {
  _id: string;
  title: string;
  subject: string;
  description?: string;
  videoUrl?: string;
};

export default function ClassDetailPage() {
  const params = useParams<{ id: string; classId: string }>();
  const classId = params.id;
  const { data: session } = useSession();

  const [cls, setCls] = React.useState<ClassDetail | null>(null);

  React.useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/classes/${classId}`);
      const data = await res.json();
      console.log(data);
      setCls(data.data ?? null);
    };
    if (classId) load();
  }, [classId]);

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return "";
    const watchMatch = url.match(/v=([^&]+)/);
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    const id = watchMatch?.[1] ?? shortMatch?.[1];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  };

  if (!cls) {
    return (
      <p className="text-sm text-muted-foreground">Loading class details…</p>
    );
  }

  return (
    <section className="space-y-1 p-0">
      {/* Header: title + quiz button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 justify-start">
          <Button variant="outline" onClick={() => history.back()}>
            <MoveLeft className="h-4 w-4 text-muted-foreground" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">{cls.title}</h1>
            <p className="text-sm text-muted-foreground">{cls.subject}</p>
          </div>
        </div>
        {session?.user.role === "STUDENT" && (
          <Button variant="outline">
            <Link
              href={`/${session?.user.id}/student/courses/${params.classId}/${classId}/quiz`}
            >
              Start Quiz
            </Link>
          </Button>
        )}
        {session?.user.role === "TEACHER" && (
          <Button variant="outline" asChild>
            <Link
              href={`/${session?.user.id}/teacher/classes/${params.classId}/${classId}/quiz`}
            >
              Prepare Quiz
            </Link>
          </Button>
        )}
      </div>

      {/* Video section */}
      <Card className="p-0 gap-0">
        <CardContent className="px-0">
          {cls.videoUrl ? (
            <div className="aspect-video lg:aspect-16/7 w-full overflow-hidden rounded-md">
              <iframe
                src={getYoutubeEmbedUrl(cls.videoUrl)}
                className="h-full w-full"
                title={cls.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No video added for this class yet.
            </p>
          )}
        </CardContent>
      </Card>
      <Discussions classId={classId} />
    </section>
  );
}

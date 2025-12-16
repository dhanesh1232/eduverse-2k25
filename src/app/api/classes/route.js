import { ClassLesson } from "@/models/class";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await getUserFromRequest(req);
  requireRole(user, ["teacher"]);

  const body = await req.json();
  const { courseId, title, videoUrl, order } = body;

  const cls = await ClassLesson.create({
    courseId,
    title,
    videoUrl,
    order,
    createdBy: user.id,
  });

  return NextResponse.json(cls);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");

  const classes = await ClassLesson.find({ courseId }).sort({ order: 1 });
  return NextResponse.json(classes);
}

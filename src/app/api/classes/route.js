import { requireRole } from "@/lib/auth";
import dbConnect from "@/lib/connection";
import { getUserFromRequest } from "@/lib/getUser";
import { ClassLesson } from "@/models/class";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const user = await getUserFromRequest(req);
  requireRole(user, ["TEACHER"]);

  const body = await req.json();
  const { courseId, title, videoUrl, order, subject, description } = body;

  const cls = await ClassLesson.create({
    courseId,
    title,
    subject,
    videoUrl,
    order,
    createdBy: user.id,
    description,
  });

  return NextResponse.json(cls);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");

  const classes = await ClassLesson.find({ courseId }).sort({ order: 1 });
  return NextResponse.json(classes);
}

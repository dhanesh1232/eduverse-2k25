import { Discussion } from "@/models/discussion";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await getUserFromRequest(req);
  requireRole(user, ["teacher", "student"]);

  const body = await req.json();
  const { classId, message } = body;

  const discussion = await Discussion.create({
    classId,
    userId: user.id,
    message,
  });

  return NextResponse.json(discussion);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const classId = searchParams.get("classId");

  const messages = await Discussion.find({ classId })
    .populate("userId", "name role")
    .sort({ createdAt: 1 });

  return NextResponse.json(messages);
}

import { Quiz } from "@/models/quize";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await getUserFromRequest(req);
  requireRole(user, ["teacher"]);

  const body = await req.json();
  const { classId, questions } = body;

  const quiz = await Quiz.create({
    classId,
    questions,
    createdBy: user.id,
  });

  return NextResponse.json(quiz);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const classId = searchParams.get("classId");

  const quiz = await Quiz.findOne({ classId });
  return NextResponse.json(quiz);
}

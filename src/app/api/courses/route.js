import { NextResponse } from "next/server";
import { Course } from "@/models/course";
import { getUserFromRequest } from "@/lib/getUser";
import { requireRole } from "@/lib/auth";

export async function POST(req) {
  const user = await getUserFromRequest(req);
  requireRole(user, ["ADMIN"]);

  const body = await req.json();
  const { title, description, teacherId, studentIds } = body;

  const course = await Course.create({
    title,
    description,
    teacherId,
    studentIds,
    createdBy: user.id,
  });

  return NextResponse.json(course);
}

export async function GET(req) {
  const user = await getUserFromRequest(req);

  let filter = {};

  if (user.role === "teacher") {
    filter.teacherId = user.id;
  }

  if (user.role === "student") {
    filter.studentIds = user.id;
  }

  // parent handled later via childIds

  const courses = await Course.find(filter);
  return NextResponse.json(courses);
}

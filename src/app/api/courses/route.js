import { NextResponse } from "next/server";
import { Course } from "@/models/course";
import { getUserFromRequest } from "@/lib/getUser";
import { requireRole } from "@/lib/auth";

export async function POST(req) {
  const user = await getUserFromRequest(req);
  requireRole(user, ["ADMIN"]);

  const body = await req.json();
  const { title, description, teacher, students, grade, section } = body;

  console.log(body);
  const course = await Course.create({
    title,
    description,
    teacherId: teacher,
    studentIds: students,
    createdBy: user.id,
    grade,
    section,
  });

  return NextResponse.json(course);
}

export async function GET(req) {
  const user = await getUserFromRequest(req);

  let filter = {};

  if (user.role === "TEACHER") {
    filter.teacherId = user.id;
  }

  if (user.role === "STUDENT") {
    filter.studentIds = user.id;
  }
  // parent handled later via childIds
  const courses = await Course.find(filter).populate("teacherId");
  console.log(courses, user);
  return NextResponse.json(courses);
}

export async function PUT(req) {
  const user = await getUserFromRequest(req);
  requireRole(user, ["ADMIN"]);

  const body = await req.json();
  const {
    id,
    title,
    description,
    teacher,
    students,
    grade,
    section,
    isActive,
  } = body;

  if (!id) {
    return NextResponse.json(
      { message: "Course ID is required" },
      { status: 400 }
    );
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    {
      title,
      description,
      teacherId: teacher,
      studentIds: students,
      grade,
      section,
      isActive,
    },
    { new: true }
  ).populate("teacherId");

  if (!updatedCourse) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(updatedCourse);
}

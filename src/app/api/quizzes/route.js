import { requireRole } from "@/lib/auth";
import dbConnect from "@/lib/connection";
import { getUserFromRequest } from "@/lib/getUser";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { Quiz } from "@/models/quize";

export async function POST(req) {
  await dbConnect();
  try {
    const user = await getUserFromRequest(req);
    requireRole(user, ["TEACHER"]);

    const body = await req.json();
    const { classId, questions } = body;

    const quiz = await Quiz.create({
      classId,
      questions,
      createdBy: user.id,
    });

    return SuccessHandles.Ok("Sucessfully added quiz", { quiz });
  } catch (err) {
    console.log(err);
    return ErrorHandles.InternalServer(err.message || "Something went wrong");
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");

    const quiz = await Quiz.findOne({ classId }).populate("classId");
    return SuccessHandles.Ok("Sucessfully fetched quiz", { quiz });
  } catch (err) {
    console.log(err.message);
    return ErrorHandles.InternalServer(err.message || "Something went wrong");
  }
}

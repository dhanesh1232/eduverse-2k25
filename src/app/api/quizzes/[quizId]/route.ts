import dbConnect from "@/lib/connection";
import { getUserFromRequest } from "@/lib/getUser";
import { requireRole } from "@/lib/auth";
import { Quiz } from "@/models/quize";
import { ErrorHandles, SuccessHandles } from "@/lib/response";

type Ctx = { params: Promise<{ quizId: string }> };

export async function PUT(req: Request, ctx: Ctx) {
  try {
    await dbConnect();

    const user = await getUserFromRequest();
    requireRole(user, ["TEACHER"]);

    const { quizId } = await ctx.params;

    const body = await req.json();
    const { classId, questions } = body;

    if (!quizId) {
      return ErrorHandles.BadRequest("quizId is required");
    }
    if (!classId || !Array.isArray(questions) || !questions.length) {
      return ErrorHandles.BadRequest("classId and questions are required");
    }

    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      {
        classId,
        questions,
        updatedBy: user.id,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!quiz) {
      return ErrorHandles.NotFound("Quiz not found");
    }

    return SuccessHandles.Ok("Quiz updated successfully", { quiz });
  } catch (err: unknown) {
    console.error(err);
    return ErrorHandles.InternalServer(
      (err as Error).message || "Something went wrong"
    );
  }
}

export async function GET(req: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");

    const quiz = await Quiz.findOne({ classId });

    if (!quiz) {
      return ErrorHandles.NotFound("Quiz not found");
    }

    console.log(quiz);
    return SuccessHandles.Ok("Quiz fetched successfully", { quiz });
  } catch (err: unknown) {
    console.error(err);
    return ErrorHandles.InternalServer(
      (err as Error).message || "Something went wrong"
    );
  }
}

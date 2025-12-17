import dbConnect from "@/lib/connection";
import { getUserFromRequest } from "@/lib/getUser";
import { requireRole } from "@/lib/auth";
import { Quiz } from "@/models/quize";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { QuizAttempt } from "@/models/quizeAttempts";

type Ctx = { params: Promise<{ quizId: string }> };

export async function GET(req: Request, ctx: Ctx) {
  try {
    await dbConnect();

    const user = await getUserFromRequest();
    requireRole(user, ["STUDENT"]);

    const { quizId } = await ctx.params;

    if (!quizId) {
      return ErrorHandles.BadRequest("quizId is required");
    }

    // Find LATEST attempt by this student (matches your schema)
    const latestAttempt = await QuizAttempt.findOne({
      quizId,
      studentId: user.id,
    })
      .sort({ createdAt: -1 })
      .lean();

    if (!latestAttempt) {
      return SuccessHandles.Ok("No previous attempts found", null);
    }

    // Get quiz to recalculate results
    const quiz = await Quiz.findById(quizId).lean();
    if (!quiz) {
      return ErrorHandles.NotFound("Quiz not found");
    }

    const questions = quiz.questions || [];
    let correctCount = 0;
    const results = questions.map(
      (q: { correctAnswer: number }, idx: number) => {
        const userAnswer = latestAttempt.answers[idx];
        const isCorrect = userAnswer === q.correctAnswer;
        if (isCorrect) correctCount += 1;
        return {
          questionIndex: idx,
          correctAnswer: q.correctAnswer,
          userAnswer,
          isCorrect,
        };
      }
    );

    return SuccessHandles.Ok("Previous attempt retrieved", {
      _id: latestAttempt._id.toString(),
      score: latestAttempt.score,
      correctCount,
      totalQuestions: questions.length,
      createdAt: latestAttempt.createdAt.toISOString(),
      answers: latestAttempt.answers,
      results,
    });
  } catch (err: unknown) {
    console.error(err);
    return ErrorHandles.InternalServer(
      (err as Error).message || "Failed to fetch previous attempt"
    );
  }
}

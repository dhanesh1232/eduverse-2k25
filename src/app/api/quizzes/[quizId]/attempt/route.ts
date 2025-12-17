// app/api/quizzes/[quizId]/attempt/route.ts
import dbConnect from "@/lib/connection";
import { getUserFromRequest } from "@/lib/getUser";
import { requireRole } from "@/lib/auth";
import { Quiz } from "@/models/quize";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { QuizAttempt } from "@/models/quizeAttempts";

type Ctx = { params: Promise<{ quizId: string }> };

export async function POST(req: Request, ctx: Ctx) {
  try {
    await dbConnect();

    const user = await getUserFromRequest();
    requireRole(user, ["STUDENT"]);

    const { quizId } = await ctx.params;
    const body = await req.json();
    const answers: number[] = body?.answers;

    if (!quizId) {
      return ErrorHandles.BadRequest("quizId is required");
    }
    if (!Array.isArray(answers)) {
      return ErrorHandles.BadRequest("answers must be an array");
    }

    const quiz = await Quiz.findById(quizId).lean();
    if (!quiz) {
      return ErrorHandles.NotFound("Quiz not found");
    }

    const questions = quiz.questions || [];
    if (!questions.length) {
      return ErrorHandles.BadRequest("Quiz has no questions");
    }

    // Compute score
    let correctCount = 0;
    const results = questions.map(
      (q: { correctAnswer: number }, idx: number) => {
        const userAnswer = answers[idx];
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

    const score = Math.round((correctCount / questions.length) * 100);

    // CREATE new attempt (matches your schema exactly)
    const attempt = await QuizAttempt.create({
      quizId,
      studentId: user.id,
      answers,
      score,
    });

    return SuccessHandles.Created("Quiz attempt created", {
      attempt,
      score,
      correctCount,
      totalQuestions: questions.length,
      results,
    });
  } catch (err: unknown) {
    console.error(err);
    return ErrorHandles.InternalServer(
      (err as Error).message || "Something went wrong while submitting quiz"
    );
  }
}

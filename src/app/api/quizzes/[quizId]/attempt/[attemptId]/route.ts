import dbConnect from "@/lib/connection";
import { getUserFromRequest } from "@/lib/getUser";
import { requireRole } from "@/lib/auth";
import { Quiz } from "@/models/quize";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { QuizAttempt } from "@/models/quizeAttempts";

type Ctx = {
  params: Promise<{
    quizId: string;
    attemptId: string;
  }>;
};

export async function PUT(req: Request, ctx: Ctx) {
  try {
    await dbConnect();

    const user = await getUserFromRequest();
    requireRole(user, ["STUDENT"]);

    const { quizId, attemptId } = await ctx.params;
    const body = await req.json();
    const answers: number[] = body?.answers;

    if (!quizId || !attemptId) {
      return ErrorHandles.BadRequest("quizId and attemptId are required");
    }
    if (!Array.isArray(answers)) {
      return ErrorHandles.BadRequest("answers must be an array");
    }

    // Verify attempt belongs to this student
    const existingAttempt = await QuizAttempt.findOne({
      _id: attemptId,
      quizId,
      studentId: user.id,
    });

    if (!existingAttempt) {
      return ErrorHandles.NotFound("Attempt not found or access denied");
    }

    const quiz = await Quiz.findById(quizId).lean();
    if (!quiz) {
      return ErrorHandles.NotFound("Quiz not found");
    }

    const questions = quiz.questions || [];
    if (!questions.length) {
      return ErrorHandles.BadRequest("Quiz has no questions");
    }

    // Compute new score
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

    // UPDATE existing attempt (only allowed fields from your schema)
    const attempt = await QuizAttempt.findByIdAndUpdate(
      attemptId,
      {
        answers, // ✅ Schema field
        score, // ✅ Schema field
      },
      {
        new: true, // Return updated document
        runValidators: true,
      }
    )!; // Non-null assertion since we verified existence

    return SuccessHandles.Ok("Quiz attempt updated", {
      attempt,
      score,
      correctCount,
      totalQuestions: questions.length,
      results,
    });
  } catch (err: unknown) {
    console.error(err);
    return ErrorHandles.InternalServer(
      (err as Error).message || "Something went wrong while updating quiz"
    );
  }
}

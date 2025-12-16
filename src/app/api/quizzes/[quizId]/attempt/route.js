import { Quiz } from "@/models/quize";
import { QuizAttempt } from "@/models/quizeAttempts";

export async function POST(req, { params }) {
  const user = await getUserFromRequest(req);
  requireRole(user, ["student"]);

  const body = await req.json();
  const { answers } = body;

  const quiz = await Quiz.findById(params.quizId);

  let score = 0;
  quiz.questions.forEach((q, i) => {
    if (q.correctAnswer === answers[i]) score++;
  });

  const attempt = await QuizAttempt.create({
    quizId: quiz._id,
    studentId: user.id,
    answers,
    score,
  });

  return NextResponse.json(attempt);
}

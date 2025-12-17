"use client";
import { QuizAttempt } from "@/components/pages/dash/lms/QuizAttempt";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type QuizQuestion = {
  question: string;
  explanation?: string;
  options: string[];
  correctAnswer: number;
};

type Quiz = {
  _id?: string;
  title?: string;
  classId: {
    title: string;
    subject?: string;
  };
  questions: QuizQuestion[];
};

export default function Page() {
  const [quiz, setQuiz] = useState<Quiz>();
  const params = useParams();
  const { id } = params;
  console.log(id);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const res = await fetch(`/api/quizzes?classId=${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setQuiz(data.data.quiz);
      } catch (err: unknown) {
        toast.error((err as Error).message || "Something went wrong");
      }
    };
    fetchQuizData();
  }, [id]);

  return <QuizAttempt quiz={quiz} />;
}

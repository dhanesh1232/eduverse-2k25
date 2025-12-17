"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, PlusCircle } from "lucide-react";
import { toast } from "sonner";

type QuizQuestion = {
  question: string;
  explanation?: string;
  options: string[];
  correctAnswer: number;
};

type Quiz = {
  _id?: string;
  classId: string;
  questions: QuizQuestion[];
};

export function QuizBuilder() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const classId = params.id;

  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      question: "",
      explanation: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    },
  ]);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ---------- Load existing quiz ----------
  useEffect(() => {
    if (!classId) return;

    const loadQuiz = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/quizzes?classId=${classId}`);
        const data = await res.json();
        const quiz: Quiz | null = data?.data?.quiz ?? null;

        if (quiz && Array.isArray(quiz.questions) && quiz.questions.length) {
          setQuizId(quiz._id || null);
          setQuestions(
            quiz.questions.map((q) => ({
              question: q.question ?? "",
              explanation: q.explanation ?? "",
              options: q.options?.length ? q.options : ["", "", "", ""],
              correctAnswer:
                typeof q.correctAnswer === "number" ? q.correctAnswer : 0,
            }))
          );
        } else {
          setQuizId(null);
          setQuestions([
            {
              question: "",
              explanation: "",
              options: ["", "", "", ""],
              correctAnswer: 0,
            },
          ]);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [classId]);

  // ---------- Question helpers ----------
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        question: "",
        explanation: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuestionField = (
    index: number,
    field: keyof QuizQuestion,
    value: string | number | string[]
  ) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    setQuestions((prev) => {
      const copy = [...prev];
      const opts = [...copy[qIndex].options];
      opts[optIndex] = value;
      copy[qIndex].options = opts;
      return copy;
    });
  };

  // ---------- Save / Update ----------
  const saveQuiz = async () => {
    if (!classId) return;

    // Simple validation: at least one non-empty question
    const hasValid = questions.some((q) => q.question.trim().length > 0);
    if (!hasValid) {
      toast.error("Add at least one question before saving.");
      return;
    }

    setSaving(true);
    try {
      const payload: Quiz = {
        classId: String(classId),
        questions,
      };

      const url = quizId ? `/api/quizzes/${quizId}` : "/api/quizzes";
      const method = quizId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data?.message || "Something went wrong. Please try again."
        );
      }

      const savedQuiz: Quiz | undefined = data?.data?.quiz;
      if (savedQuiz?._id) setQuizId(savedQuiz._id);

      toast.success(
        quizId ? "Quiz updated successfully" : "Quiz created successfully"
      );
    } catch (err) {
      const e = err as Error;
      console.error(e.message);
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Loading quiz builder…</p>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <div>
            <h1 className="text-xl font-semibold">
              {quizId ? "Edit Quiz" : "Create Quiz"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Add questions, options and mark the correct answer.
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={addQuestion}>
          <PlusCircle className="mr-1 h-4 w-4" />
          Add Question
        </Button>
      </div>

      <div className="space-y-4">
        {questions.map((q, i) => (
          <Card key={i} className="border-muted/60 p-2 gap-2 rounded-md">
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2 px-2">
              <CardTitle className="text-sm font-medium">
                Question {i + 1}
              </CardTitle>
              {questions.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground"
                  onClick={() => removeQuestion(i)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>

            <CardContent className="space-y-2 px-2">
              <div className="space-y-1.5">
                <Label className="text-xs">Question text</Label>
                <Textarea
                  placeholder="Type the question here…"
                  className="text-sm"
                  value={q.question}
                  onChange={(e) =>
                    updateQuestionField(i, "question", e.target.value)
                  }
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {q.options.map((op, j) => (
                  <div key={j} className="space-y-1.5">
                    <Label className="text-xs">Option {j + 1}</Label>
                    <Input
                      placeholder={`Answer option ${j + 1}`}
                      value={op}
                      onChange={(e) => updateOption(i, j, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-[2fr,3fr]">
                <div className="space-y-1.5">
                  <Label className="text-xs">Correct answer</Label>
                  <div className="flex gap-2">
                    {q.options.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          updateQuestionField(i, "correctAnswer", idx)
                        }
                        className={`px-3 py-2 rounded-md border text-sm transition-colors ${
                          q.correctAnswer === idx
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground border-border hover:bg-muted"
                        }`}
                      >
                        Option {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Explanation (optional)</Label>
                  <Input
                    placeholder="Why this answer is correct (shown after submit)"
                    value={q.explanation ?? ""}
                    onChange={(e) =>
                      updateQuestionField(i, "explanation", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          variant="outline"
          type="button"
          onClick={addQuestion}
          className="sm:hidden"
        >
          <PlusCircle className="mr-1 h-4 w-4" />
          Add Question
        </Button>
        <Button type="button" onClick={saveQuiz} disabled={saving}>
          {saving ? "Saving…" : quizId ? "Update Quiz" : "Save Quiz"}
        </Button>
      </div>
    </section>
  );
}

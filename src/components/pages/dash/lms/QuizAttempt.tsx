"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";
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

type SubmissionResult = {
  score: number;
  correctCount: number;
  totalQuestions: number;
  results: Array<{
    questionIndex: number;
    correctAnswer: number;
    userAnswer: number;
    isCorrect: boolean;
  }>;
};

type PreviousAttempt = {
  _id: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  createdAt: string;
  answers: number[];
  results: Array<{
    questionIndex: number;
    correctAnswer: number;
    userAnswer: number;
    isCorrect: boolean;
  }>;
};

export function QuizAttempt({ quiz }: { quiz?: Quiz }) {
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState<SubmissionResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [previousAttempt, setPreviousAttempt] =
    useState<PreviousAttempt | null>(null);
  const [loadingPrevious, setLoadingPrevious] = useState(true);
  const [retryMode, setRetryMode] = useState(false);

  const fetchPreviousAttempt = useCallback(async () => {
    if (!quiz?._id) return;

    setLoadingPrevious(true);
    try {
      const res = await fetch(`/api/quizzes/${quiz._id}/previous-attempt`);
      if (res.ok) {
        const data = await res.json();
        if (data?.data) {
          setPreviousAttempt(data.data);
        }
      }
    } catch (e) {
      console.error("Failed to fetch previous attempt:", e);
    } finally {
      setLoadingPrevious(false);
    }
  }, [quiz?._id]);

  useEffect(() => {
    if (quiz?._id) {
      fetchPreviousAttempt();
    }
  }, [quiz?._id, fetchPreviousAttempt]);

  const onSelectOption = (qIndex: number, optIndex: number) => {
    if (retryMode && previousAttempt) {
      const prevResult = previousAttempt.results.find(
        (r) => r.questionIndex === qIndex
      );
      if (prevResult?.isCorrect) {
        toast.info("This answer was already correct!");
        return;
      }
    }

    setAnswers((prev) => {
      const copy = [...prev];
      copy[qIndex] = optIndex;
      return copy;
    });
  };

  const submitQuiz = async () => {
    if (!quiz?._id) return;

    setSubmitting(true);
    try {
      const method = previousAttempt ? "PUT" : "POST";
      const body = {
        answers,
        isRetry: retryMode,
      };
      const url = previousAttempt
        ? `/api/quizzes/${quiz._id}/attempt/${previousAttempt._id}`
        : `/api/quizzes/${quiz._id}/attempt`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Submit failed");

      const result = data?.data;
      setSubmission(result);
      setShowResults(true);

      toast.success(
        retryMode
          ? "Retry submitted successfully!"
          : previousAttempt
          ? "Quiz updated successfully!"
          : "Quiz submitted successfully!"
      );

      // Refresh previous attempt after submission
      await fetchPreviousAttempt();
    } catch (e) {
      const err = e as Error;
      console.error(err.message);
      toast.error(err.message || "Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFreshStart = () => {
    setAnswers([]);
    setSubmission(null);
    setShowResults(false);
    setRetryMode(false);
  };

  const handleRetryIncorrect = () => {
    setShowResults(false);
    setSubmission(null);

    if (previousAttempt && quiz) {
      const correctAnswers = new Array(quiz.questions.length).fill(undefined);
      previousAttempt.results.forEach((result) => {
        if (result.isCorrect) {
          correctAnswers[result.questionIndex] = result.userAnswer;
        }
      });
      setAnswers(correctAnswers);
      setRetryMode(true);
    }
  };

  // Check if user passed (100% score)
  const hasPassed = submission?.score === 100;
  const hasPreviousPassed = previousAttempt?.score === 100;

  if (!quiz) {
    return (
      <p className="text-sm text-muted-foreground">
        No quiz configured for this class yet.
      </p>
    );
  }

  return (
    <>
      <section className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 justify-start">
            <Button variant="outline" size="sm" onClick={() => history.back()}>
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold">
                {quiz.classId?.title || "Quiz"}
              </h1>
              {quiz.classId?.subject && (
                <p className="text-sm text-muted-foreground">
                  Subject: {quiz.classId.subject}
                </p>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {quiz.questions.length} questions · Single choice
          </p>
        </div>

        {/* Previous Score Banner */}
        {!loadingPrevious && previousAttempt && !hasPreviousPassed && (
          <Card className="border-yellow-200 bg-yellow-50/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-900">
                      Previous Score: {previousAttempt.score}%
                    </p>
                    <p className="text-xs text-yellow-700">
                      {previousAttempt.correctCount} out of{" "}
                      {previousAttempt.totalQuestions} correct ·{" "}
                      {new Date(previousAttempt.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFreshStart}
                  className="text-xs"
                >
                  Start Fresh
                </Button>
              </div>
              {retryMode && (
                <p className="text-xs text-yellow-700 mt-2">
                  ✓ Retry Mode: Only re-attempt incorrect answers
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Questions */}
        <div className="space-y-4">
          {quiz.questions.map((q, i) => {
            const selected = answers[i];
            const wasCorrect = previousAttempt?.results.find(
              (r) => r.questionIndex === i
            )?.isCorrect;

            return (
              <Card
                key={q.question + i}
                className={`border-muted/60 p-2 rounded-md gap-0 ${
                  retryMode && wasCorrect
                    ? "bg-green-50/30 border-green-200"
                    : ""
                }`}
              >
                <CardHeader className="pb-2 px-2">
                  <CardTitle className="text-sm font-medium flex justify-between gap-2">
                    <span>
                      Q{i + 1}. {q.question}
                    </span>
                    <div className="flex items-center gap-2">
                      {retryMode && wasCorrect && (
                        <span className="text-[11px] text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Correct
                        </span>
                      )}
                      {typeof selected === "number" && (
                        <span className="text-[11px] text-green-500">
                          Answered
                        </span>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 px-2">
                  <div className="space-y-1">
                    {q.options.map((op, j) => {
                      const isChecked = selected === j;
                      const isLocked = retryMode && wasCorrect;

                      return (
                        <button
                          key={j}
                          type="button"
                          onClick={() => onSelectOption(i, j)}
                          disabled={isLocked}
                          className={`w-full text-left text-sm cursor-pointer border rounded-md px-3 py-2 transition-colors ${
                            isChecked
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted/60"
                          } ${isLocked ? "opacity-60 cursor-not-allowed" : ""}`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                                isChecked
                                  ? "border-primary bg-primary/80"
                                  : "border-muted-foreground/40"
                              }`}
                            >
                              {isChecked && (
                                <div className="h-1.5 w-1.5 rounded-full bg-background" />
                              )}
                            </div>
                            <span>{op}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div className="pt-1">
                      <Label className="text-[11px] text-muted-foreground">
                        Explanation will be shown after submission.
                      </Label>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {!retryMode && (
            <Button
              variant="outline"
              type="button"
              onClick={() => setAnswers([])}
              disabled={submitting || answers.length === 0}
            >
              Clear answers
            </Button>
          )}
          <Button
            type="button"
            onClick={submitQuiz}
            disabled={
              submitting ||
              answers.filter((a) => a !== undefined).length !==
                quiz.questions.length
            }
          >
            {submitting
              ? "Submitting…"
              : retryMode
              ? "Resubmit Quiz"
              : "Submit Quiz"}
          </Button>
        </div>
      </section>

      {/* Results Modal */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Quiz Results
            </DialogTitle>
            <DialogDescription>
              Review your answers and your performance
            </DialogDescription>
          </DialogHeader>

          {submission && (
            <div className="space-y-6">
              {/* Score Card */}
              <div className="bg-gradient-to-r from-muted to-muted/50 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Your Score</p>
                <p className="text-4xl font-bold">
                  {submission.score}
                  <span className="text-lg">%</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {submission.correctCount} out of {submission.totalQuestions}{" "}
                  correct
                </p>
                {retryMode && previousAttempt && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Previous: {previousAttempt.score}% →{" "}
                    <span
                      className={
                        submission.score > previousAttempt.score
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {submission.score > previousAttempt.score ? "↑" : "↓"}{" "}
                      {Math.abs(submission.score - previousAttempt.score)}%
                    </span>
                  </p>
                )}
              </div>

              {/* Question Review */}
              <div className="space-y-4">
                <p className="text-sm font-semibold">Review</p>
                {submission.results.map((result) => {
                  const question = quiz.questions[result.questionIndex];
                  const isCorrect = result.isCorrect;

                  return (
                    <Card
                      key={result.questionIndex}
                      className={`border ${
                        isCorrect
                          ? "border-green-200 bg-green-50/50"
                          : "border-red-200 bg-red-50/50"
                      }`}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          {isCorrect ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                          Q{result.questionIndex + 1}. {question.question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div>
                          <p className="font-medium text-muted-foreground">
                            Your answer:
                          </p>
                          <p>
                            {question.options[result.userAnswer] ||
                              "Not answered"}
                          </p>
                        </div>

                        {!isCorrect && (
                          <div>
                            <p className="font-medium text-muted-foreground">
                              Correct answer:
                            </p>
                            <p>{question.options[result.correctAnswer]}</p>
                          </div>
                        )}

                        {question.explanation && (
                          <div>
                            <p className="font-medium text-muted-foreground">
                              Explanation:
                            </p>
                            <p className="text-muted-foreground">
                              {question.explanation}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Actions - Conditional based on pass/fail */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowResults(false)}>
                  Close
                </Button>
                {!hasPassed && !hasPreviousPassed && (
                  <Button
                    onClick={handleRetryIncorrect}
                    className="gap-2 bg-primary hover:bg-primary/90"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Retry Incorrect
                  </Button>
                )}
                {hasPassed && (
                  <Button variant="outline" disabled className="opacity-50">
                    ✅ Quiz Completed Successfully!
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

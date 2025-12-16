import mongoose, { Schema, Document } from "mongoose";

export interface IQuizAttempt extends Document {
  quizId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  answers: number[];
  score: number;
  createdAt: Date;
}

const QuizAttemptSchema: Schema = new Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: { type: [Number], required: true },
    score: { type: Number, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const QuizAttempt =
  mongoose.models.QuizAttempt ||
  mongoose.model<IQuizAttempt>("QuizAttempt", QuizAttemptSchema);

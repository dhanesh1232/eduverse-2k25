import mongoose, { Schema, Document } from "mongoose";

export interface IQuiz extends Document {
  _id: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const QuizSchema: Schema = new Schema<IQuiz>({
  classId: { type: Schema.Types.ObjectId, ref: "ClassLesson", required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: Number, required: true },
      explanation: { type: String, default: "" },
    },
  ],
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Quiz =
  mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", QuizSchema);

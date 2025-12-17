import mongoose, { Schema, Document, Types } from "mongoose";

export interface IVideoLesson extends Document {
  _id: Types.ObjectId;
  courseId: Types.ObjectId; // reference to CourseId
  title: string;
  subject?: string;
  description?: string;
  videoUrl: string; // YouTube / Vimeo / Bunny
  order: number;
  createdBy: Types.ObjectId; // reference to UserId (teacher)
  createdAt: Date;
}

const ClassLessonSchema = new Schema<IVideoLesson>({
  courseId: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
  subject: { type: String, required: true },
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  order: { type: Number, required: true },
  description: { type: String, default: "" },
  createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export const ClassLesson =
  mongoose.models.ClassLesson ||
  mongoose.model<IVideoLesson>("ClassLesson", ClassLessonSchema);

import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDiscussion extends Document {
  _id: Types.ObjectId;
  classId: Types.ObjectId;
  userId: Types.ObjectId;
  message: string;
  createdAt: Date;
}

const DiscussionSchema: Schema = new Schema<IDiscussion>({
  classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Discussion = mongoose.model<IDiscussion>(
  "Discussion",
  DiscussionSchema
);

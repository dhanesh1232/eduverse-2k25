import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  studentIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // admin
  },

  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);

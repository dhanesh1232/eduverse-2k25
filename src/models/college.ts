import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const College =
  mongoose.models.College || mongoose.model("College", CollegeSchema);

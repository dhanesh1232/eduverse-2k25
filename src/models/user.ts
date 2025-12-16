import mongoose, { Schema, Document, Types } from "mongoose";

export type UserRole = "ADMIN" | "TEACHER" | "STUDENT" | "PARENT";

export interface UserDocument extends Document {
  collegeId: Types.ObjectId;
  role: UserRole;
  name?: string;
  email?: string;
  phone: string;
  password?: string;
  isActive: boolean;
  createdAt: Date;
  status?: string;
  customId?: string;
  metadata?: mongoose.Schema.Types.Mixed;

  // Relations
  studentId?: Types.ObjectId; // for PARENT
  parentId?: Types.ObjectId; // for STUDENT

  // Role-based data
  studentInfo?: {
    class: string;
    section?: string;
    rollNo?: string;
    admissionYear?: number;
  };
}

const StudentInfoSchema = new Schema(
  {
    class: { type: String, required: true },
    section: { type: String },
    rollNo: { type: String },
    admissionYear: { type: Number },
  },
  { _id: false }
);

const UserSchema = new Schema<UserDocument>(
  {
    collegeId: {
      type: Schema.Types.ObjectId,
      ref: "College",
      required: true,
      index: true,
    },

    customId: {
      type: String,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["ADMIN", "TEACHER", "STUDENT", "PARENT"],
      required: true,
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      sparse: true,
      index: true,
    },

    phone: {
      type: String,
      required: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      default: "invited",
      enum: ["invited", "active", "suspended", "deleted", "inactive"],
    },
    // Parent → Student
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      required: function () {
        return this.role === "PARENT";
      },
    },

    // Student → Parent (optional, future)
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Student-only structured data
    studentInfo: {
      type: StudentInfoSchema,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

// One admin per college
UserSchema.index(
  { collegeId: 1, role: 1 },
  { unique: true, partialFilterExpression: { role: "ADMIN" } }
);

export const User =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

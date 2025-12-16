import dbConnect from "@/lib/connection";
import { collageCode, hashPassword } from "@/lib/password_handles";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { College } from "@/models/college";
import { User } from "@/models/user";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();

    /* ───────────────────────────
       1️⃣ INPUT NORMALIZATION
    ─────────────────────────── */

    const collegeName = body.collegeName?.trim();
    const adminEmail = body.adminEmail?.trim().toLowerCase();
    const adminPassword = body.adminPassword;
    const adminPhone = body.adminPhone?.trim();
    const adminName = body.adminName?.trim();

    /* ───────────────────────────
       2️⃣ STRUCTURAL VALIDATION
    ─────────────────────────── */

    if (!collegeName || collegeName.length < 5) {
      return ErrorHandles.BadRequest("College name is too short");
    }

    if (!EMAIL_REGEX.test(adminEmail)) {
      return ErrorHandles.BadRequest("Invalid admin email");
    }

    if (!adminName || adminName.length < 5) {
      return ErrorHandles.BadRequest("Invalid admin name");
    }

    if (!PHONE_REGEX.test(adminPhone)) {
      return ErrorHandles.BadRequest("Invalid admin phone number");
    }

    if (!adminPassword || adminPassword.length < 8) {
      return ErrorHandles.BadRequest("Password must be at least 8 characters");
    }

    /* ───────────────────────────
       3️⃣ COLLEGE EXISTENCE CHECK
    ─────────────────────────── */

    const code = await collageCode(collegeName);

    const existingCollege = await College.findOne({
      $or: [{ name: collegeName }, { code }],
    }).lean();

    if (existingCollege) {
      return ErrorHandles.Conflict("College already registered. Please login.");
    }

    /* ───────────────────────────
       4️⃣ ADMIN UNIQUENESS CHECK
    ─────────────────────────── */

    const existingAdmin = await User.findOne({
      role: "ADMIN",
      $or: [{ email: adminEmail }, { phone: adminPhone }],
    }).lean();

    if (existingAdmin) {
      return ErrorHandles.Conflict(
        "Admin already exists with this email or phone"
      );
    }

    /* ───────────────────────────
       5️⃣ CREATE COLLEGE
    ─────────────────────────── */

    const college = await College.create({
      name: collegeName,
      code,
      isActive: true,
    });

    /* ───────────────────────────
       6️⃣ CREATE ADMIN USER
    ─────────────────────────── */

    const passwordHash = await hashPassword(adminPassword);

    await User.create({
      collegeId: college._id,
      email: adminEmail,
      phone: adminPhone,
      password: passwordHash,
      role: "ADMIN",
      isActive: true,
      name: adminName,
    });

    /* ───────────────────────────
       7️⃣ SUCCESS RESPONSE
    ─────────────────────────── */

    return SuccessHandles.Created("College admin registered successfully");
  } catch (err) {
    console.error("REGISTER_ERROR:", err);

    return ErrorHandles.InternalServer(
      "Something went wrong while registering"
    );
  }
}

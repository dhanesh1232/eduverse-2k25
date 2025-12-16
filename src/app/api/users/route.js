// appp/api/users/route.js

import dbConnect from "@/lib/connection";
import { User } from "@/models/user";
import { generatePassword, hashPassword } from "@/lib/password_handles";
import { validateSession } from "@/lib/session";
import { sendCredentialsEmail } from "@/lib/mailer";
import { ErrorHandles } from "@/lib/response";

function buildMetadata(role, extra, student) {
  if (!extra && role !== "PARENT") return null;
  switch (role) {
    case "STUDENT":
      return {
        class: extra,
      };
    case "TEACHER":
      return {
        subject: extra,
      };
    case "PARENT":
      return {
        studentId: student,
      };
    default:
      return null;
  }
}

export async function POST(req) {
  await dbConnect();

  const session = await validateSession();
  if (!session || session.user.role !== "ADMIN") {
    return new Response("Unauthorized", { status: 401 });
  }

  const { role, name, phone, email, student, extra, id } = await req.json();

  const exUser = await User.findOne({
    email: email.trim().toLowerCase(),
    collegeId: session.user.collegeId,
    role: role,
    phone: phone,
    name: name,
  });

  if (exUser) {
    return ErrorHandles.BadRequest("User already exists");
  }

  const plainPassword = generatePassword(name);
  const passwordHash = await hashPassword(plainPassword);

  const metadata = buildMetadata(role, extra, student);

  const userData = {
    collegeId: session.user.collegeId,
    role,
    name,
    phone,
    email: email.trim().toLowerCase(),
    password: passwordHash,
    isActive: true,
    status: "invited",
    customId: id,
    metadata,
  };

  if (role === "PARENT" && student) {
    userData.studentId = student;
  }

  const user = await User.create(userData);

  await sendCredentialsEmail({
    to: email,
    name,
    role,
    email,
    password: plainPassword,
  });

  return Response.json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      phone: user.phone,
      email: user.email,
    },
    credentials: plainPassword ? { password: plainPassword } : null,
  });
}

export async function PUT(req) {
  await dbConnect();

  const session = await validateSession();
  if (!session || session.user.role !== "ADMIN") {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id, name, phone, email, extra, role, student } = await req.json();

  const metadata = buildMetadata(role, extra, student);

  await User.findByIdAndUpdate(id, {
    name,
    phone,
    email,
    metadata,
  });

  return Response.json({ success: true });
}

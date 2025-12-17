// src/app/api/classes/[id]/route.ts

import { requireRole } from "@/lib/auth";
import dbConnect from "@/lib/connection";
import { getUserFromRequest } from "@/lib/getUser";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { ClassLesson } from "@/models/class";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const user = await getUserFromRequest();
    requireRole(user, ["TEACHER", "ADMIN", "STUDENT", "PARENT"]);

    const { id: courseId } = await context.params; // <- await
    console.log(courseId);

    const cls = await ClassLesson.findById(courseId);
    if (!cls) {
      return ErrorHandles.NotFound("Class not found");
    }

    // If your helpers wrap data like { message, data }, return cls here
    return SuccessHandles.Ok("Class fetched successfully", cls);
  } catch (err: unknown) {
    console.log(err);
    return ErrorHandles.InternalServer(
      (err as Error).message ?? "Server error"
    );
  }
}

// src/app/api/classes/[id]/discussions/route.ts
import dbConnect from "@/lib/connection";
import { getUserFromRequest } from "@/lib/getUser";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { Discussion } from "@/models/discussion";

type Ctx = { params: Promise<{ id: string }> };

// GET: list discussions for a class
export async function GET(req: Request, ctx: Ctx) {
  await dbConnect();
  try {
    const { id: classId } = await ctx.params;

    const items = await Discussion.find({ classId })
      .populate("userId")
      .sort({ createdAt: -1 })
      .limit(50);

    return SuccessHandles.Ok("Discussions fetched", { discussions: items });
  } catch (err: unknown) {
    return ErrorHandles.InternalServer(
      (err as Error).message ?? "Server error"
    );
  }
}

// POST: add a new discussion message
export async function POST(req: Request, ctx: Ctx) {
  await dbConnect();
  try {
    const user = await getUserFromRequest();
    if (!user) return ErrorHandles.Unauthorized("Not authenticated");

    const { id: classId } = await ctx.params;
    const body = await req.json();
    const { message } = body;

    if (!message || !message.trim()) {
      return ErrorHandles.BadRequest("Message is required");
    }

    const created = await Discussion.create({
      classId,
      userId: user.id,
      message: message.trim(),
    });

    return SuccessHandles.Created("Discussion posted", { discussion: created });
  } catch (err: unknown) {
    return ErrorHandles.InternalServer(
      (err as Error).message ?? "Server error"
    );
  }
}

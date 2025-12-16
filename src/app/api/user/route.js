export const runtime = "nodejs";

import "@/models/college";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/connection";
import { User } from "@/models/user";
import { authOptions } from "../auth/[...nextauth]/route";
import { ErrorHandles } from "@/lib/response";
import { CLG_CODE } from "@/lib/password_handles";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return ErrorHandles.Unauthorized();
  }

  await dbConnect();

  const user = await User.findById(session.user.id)
    .select("-password")
    .populate("collegeId", "name code");

  if (!user) {
    return ErrorHandles.NotFound("User not found", {
      message: "User not found",
      logout: true,
    });
  }
  const code = await CLG_CODE(user.collegeId.name);

  return NextResponse.json({
    success: true,
    data: user,
    code,
    message: "User fetched successfully",
  });
}

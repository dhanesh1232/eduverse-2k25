import dbConnect from "@/lib/connection";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { validateSession } from "@/lib/session";
import { User } from "@/models/user";

export async function GET() {
  await dbConnect();
  try {
    const session = await validateSession();
    if (!session || session?.user.role !== "ADMIN") {
      return ErrorHandles.Unauthorized("Unauthorized");
    }

    const users = await User.find({
      collegeId: session.user.collegeId,
      role: "PARENT",
    }).populate("studentId", "name customId studentInfo");

    return SuccessHandles.Ok("Users fetched successfully", users);
  } catch (err) {
    console.log(err);
    return ErrorHandles(err.message);
  }
}

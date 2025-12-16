import dbConnect from "@/lib/connection";
import { CLG_CODE } from "@/lib/password_handles";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { validateSession } from "@/lib/session";
import { College } from "@/models/college";
import { User } from "@/models/user";

export async function GET(req) {
  await dbConnect();
  try {
    const session = await validateSession(req);

    if (!session) {
      return ErrorHandles.Unauthorized();
    }

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");

    if (!role) {
      return ErrorHandles.BadRequest("Role is required");
    }

    const college = await College.findById(session?.user?.collegeId);

    if (!college) {
      return ErrorHandles.NotFound("College not found");
    }

    const code = CLG_CODE(college?.name);

    // Find latest user for this role
    const latestUser = await User.findOne({
      collegeId: session?.user?.collegeId,
      role,
    })
      .sort({ createdAt: -1 })
      .populate("collegeId", "name code")
      .lean();

    let latestNumber = 0;

    if (latestUser?.customId) {
      const parts = latestUser.customId.split("-");
      latestNumber = Number(parts[2]) || 0;
    }

    return SuccessHandles.Ok("Latest User", {
      latestNumber,
      role,
      code,
    });
  } catch (err) {
    return ErrorHandles(err.message);
  }
}

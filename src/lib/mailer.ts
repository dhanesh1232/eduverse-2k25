// lib/mailer.ts
import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendCredentialsEmail({
  to,
  name,
  role,
  email,
  password,
}: {
  to: string;
  name: string;
  role: string;
  email: string;
  password: string;
}) {
  const loginUrl = `${process.env.APP_URL}/auth/login`;

  await mailer.sendMail({
    from: `"Eduverse LMS" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Your Eduverse Account Access Details",
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:'Segoe UI',Helvetica,Arial,sans-serif;color:#333;line-height:1.6;">
        <div style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px;text-align:center;">
            <h1 style="margin:0;font-size:24px;color:#ffffff;">Welcome to Eduverse LMS</h1>
          </div>
          <div style="padding:32px 24px;">
            <p style="margin:0 0 16px;font-size:16px;">Hi <strong>${name}</strong>,</p>
            <p style="margin:0 0 24px;font-size:16px;">Your new account is ready. Here are your login details:</p>

            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:20px;margin-bottom:24px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
                <span style="font-weight:600;color:#6b7280;">Role:</span>
                <span style="color:#111827;">${role}</span>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
                <span style="font-weight:600;color:#6b7280;">Email:</span>
                <span style="color:#111827;">${email}</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-weight:600;color:#6b7280;">Your Password:</span>
                <span 
                  style="color:#111827;font-family:monospace;background:#e5e7eb;padding:2px 6px;border-radius:4px;cursor:pointer;"
                  onclick="navigator.clipboard.writeText('${password}');alert('Password copied to clipboard!')"
                >
                  ${password}
                </span>
              </div>
            </div>

            <div style="text-align:center;margin-bottom:24px;">
              <a href="${loginUrl}" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:600;font-size:16px;">Log In Now</a>
            </div>

            <p style="margin:0;font-size:14px;color:#6b7280;">Please change your password after your first login.</p>
          </div>
          <div style="background:#f3f4f6;padding:16px 24px;text-align:center;font-size:13px;color:#9ca3af;">
            Regards,<br/>Eduverse Administration
          </div>
        </div>
      </div>
    `,
  });
}

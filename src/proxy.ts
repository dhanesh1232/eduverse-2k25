import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    const isHome = pathname === "/";
    const isAuthPage = pathname.startsWith("/auth");
    const isUserPage = /^\/[a-f0-9]{24}$/.test(pathname); // Mongo ObjectId
    const userId = token?.id;

    /* ───────────────────────────
       1️⃣ HOME PAGE — ALWAYS OPEN
    ─────────────────────────── */
    if (isHome) {
      return NextResponse.next();
    }

    /* ───────────────────────────
       2️⃣ NOT LOGGED IN
    ─────────────────────────── */
    if (!token) {
      // Allow auth pages
      if (isAuthPage) {
        return NextResponse.next();
      }

      // Block protected pages
      return NextResponse.redirect(new URL("/", req.url));
    }

    /* ───────────────────────────
       3️⃣ LOGGED IN
    ─────────────────────────── */

    // Prevent logged-in users from seeing auth pages
    if (isAuthPage) {
      return NextResponse.redirect(new URL(`/${userId}`, req.url));
    }

    // Prevent accessing other users' pages
    if (isUserPage && pathname !== `/${userId}`) {
      return NextResponse.redirect(new URL(`/${userId}`, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // full control handled above
    },
  }
);

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};

// app/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import dbConnect from "@/lib/connection";
import { User } from "@/models/user";
import { verifyPassword } from "@/lib/password_handles";

const isProd = process.env.NODE_ENV === "production";
const domain = isProd ? process.env.NEXTAUTH_URL : undefined;

const getCookiesSettings = () => ({
  sessionToken: {
    name: isProd
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token",
    options: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: isProd,
      domain,
    },
  },
});
export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        await dbConnect();

        const email = credentials.email.trim().toLowerCase();
        const password = credentials.password;

        const user = await User.findOne({
          email,
          isActive: true,
        });

        if (!user) {
          throw new Error("Invalid user credentials");
        }

        const isValid = await verifyPassword(password, user.password);

        console.log("HASH:", user.password);
        console.log("COMPARE:", await verifyPassword(password, user.password));

        if (!isValid) {
          throw new Error("Invalid password");
        }

        if (user.status === "invited") {
          user.status = "active";
          await user.save();
        }

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          collegeId: user.collegeId.toString(),
        };
      },
    }),
  ],

  useSecureCookies: isProd,
  cookies: getCookiesSettings(),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.collegeId = user.collegeId;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.collegeId = token.collegeId;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
    signOut: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

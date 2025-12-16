"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Wrapper>{children}</Wrapper>
    </SessionProvider>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { data: session } = useSession();

  if (
    path.startsWith("/auth") ||
    path.startsWith("/admin") ||
    path.startsWith("/parent") ||
    path.startsWith("/student") ||
    path.startsWith("/teacher")
  ) {
    return children;
  }
  console.log(session);

  return (
    <>
      {path === "/" && <Header />}
      <main className="min-h-screen bg-white">{children}</main>
      {path === "/" && <Footer />}
    </>
  );
}

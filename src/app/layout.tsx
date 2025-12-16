import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/layout";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | EduVerse",
    default: "EduVerse - Empowering Education",
  },
  description:
    "EduVerse is a comprehensive platform designed to enhance learning experiences and connect educators with students worldwide.",
  keywords: [
    "education",
    "learning",
    "online courses",
    "educators",
    "students",
    "EduVerse",
  ],
  authors: [{ name: "EduVerse Team", url: "https://eduverse.com" }],
  openGraph: {
    title: "EduVerse - Empowering Education",
    description:
      "EduVerse is a comprehensive platform designed to enhance learning experiences and connect educators with students worldwide.",
    url: "https://eduverse.com",
    siteName: "EduVerse",
    images: [
      {
        url: "https://eduverse.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "EduVerse Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduVerse - Empowering Education",
    description:
      "EduVerse is a comprehensive platform designed to enhance learning experiences and connect educators with students worldwide.",
    images: ["https://eduverse.com/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>{children}</Layout>
        <Toaster />
      </body>
    </html>
  );
}

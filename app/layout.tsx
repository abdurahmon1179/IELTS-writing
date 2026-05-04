import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IELTS Writing Master — AI-Powered Band 9 Coaching",
  description: "Get instant band scores, detailed error analysis, and 21-day personalized writing drills. Built for Uzbekistan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'DM Sans', sans-serif" }}>{children}</body>
    </html>
  );
}

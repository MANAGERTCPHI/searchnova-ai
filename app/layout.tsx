import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SearchNova AI — SEO Intelligence Platform",
    template: "%s | SearchNova AI",
  },
  description:
    "AI-powered SEO keyword research and content intelligence for marketers, creators, agencies, and businesses.",
  applicationName: "SearchNova AI",
  keywords: ["SEO", "keyword research", "content intelligence", "AI", "marketing"],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

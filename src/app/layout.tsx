import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  // Linear's real weight range tops out at 510 (available via variable
  // fonts) — true 700 bold is absent from the interface entirely.
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Cohort — Linear Study",
  description:
    "A design study: the Cohort course detail page rebuilt against a token spec extracted from Linear's actual UI, for learning purposes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

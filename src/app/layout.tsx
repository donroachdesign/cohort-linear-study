import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
      <head>
        {/* Runs before paint so a stored light-mode preference doesn't flash
            dark first — data-theme defaults to dark (unset) otherwise. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

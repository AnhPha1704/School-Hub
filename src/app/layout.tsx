import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "School Hub",
  description: "School Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vn"
      suppressHydrationWarning
      data-http-version="1.0.44"
      data-http-allow="true"
      data-tabs-api="true"
      data-custom-referer="true"
    >
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}

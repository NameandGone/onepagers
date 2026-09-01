import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "onepagers — Small tools for boring work",
  description: "We bring boring, very niche tools to life for serious repetitive work.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "onepagers — Stop retyping PDFs",
  description: "Small document tools for pulling useful facts out of closing, discovery, and tax PDFs.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

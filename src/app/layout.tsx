import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Winlock",
  description:
    "Secure your folders with passwords using in-place encryption — no file moving needed. Simple, fast, and reliable protection for your sensitive data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

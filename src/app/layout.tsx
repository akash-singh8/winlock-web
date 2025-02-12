import Script from "next/script";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
        <Navbar />
        <div className="pageContainer">
          {children}
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}

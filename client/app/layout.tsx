import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Опционально, для использования в CSS
  display: "swap", // Улучшает рендеринг шрифта
});

export const metadata: Metadata = {
  title: "auto-deal",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.io.png",
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
        className={`${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <div className="mt-12 mb-12">
          {" "}
          {/* Adds 50px margin (12 in Tailwind) above and below */}
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

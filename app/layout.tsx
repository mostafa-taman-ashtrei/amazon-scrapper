import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/Components/Nav/Navbar";
import ToasterProvider from "@/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amazon Scrapper",
  description: "Keep track of any amazon product.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-10xl" mx-auto>
          <ToasterProvider />
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}

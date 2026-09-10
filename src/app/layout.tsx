import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Careers & Jobs Portal",
    template: "%s | Careers & Jobs Portal",
  },
  description: "Discover part-time and full-time job opportunities. Explore roles that match your skills, experience, and career goals.",
  keywords: ["jobs", "careers", "hiring", "employment", "opportunities"],
  openGraph: {
    title: "Careers & Jobs Portal",
    description: "Discover part-time and full-time job opportunities.",
    type: "website",
  },
};

import "./globals.css";
import { Footer } from "@/components/blocks/Footer";
import { Header } from "@/components/blocks/Header";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

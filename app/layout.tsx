import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Martin Céspedes | Portfolio",
    template: "%s | Martin Céspedes",
  },
  description:
    "Portfolio of Martin Céspedes, a junior full-stack developer showcasing web development projects and software development experience.",
  metadataBase: new URL("https://wdd430-portfolio-iota.vercel.app"),
  openGraph: {
    title: "Martin Céspedes | Portfolio",
    description:
      "Portfolio of Martin Céspedes, a junior full-stack developer showcasing web development projects and software development experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-3 focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Skip to main content
        </a>

        <Header />

        <main
          id="main-content"
          className="min-h-[calc(100vh-160px)]"
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}

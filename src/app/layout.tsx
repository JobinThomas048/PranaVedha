import type { Metadata, Viewport } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "PranaVeda Prakriti | Holistic Naturopathy & Ayurvedic E-Consultation",
  description:
    "Instant online consultation with AYUSH certified senior BNYS naturopaths. Zero login friction, personalized Prakriti & Agni diagnosis, and direct WhatsApp booking confirmation.",
  keywords: [
    "Naturopathy consultation",
    "Ayurveda tele-health",
    "BNYS doctors online",
    "WhatsApp doctor booking",
    "Prakriti dosha test",
    "Holistic herbal healing",
  ],
  authors: [{ name: "PranaVeda Naturopathy" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf9f4] text-[#1b1c19] font-sans antialiased selection:bg-[#d4e4ce] selection:text-[#14422d]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

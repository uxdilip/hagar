import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import "./globals.css";

import { SmoothScroll } from "@/app/components/layout/SmoothScroll";
import { CustomCursor } from "@/app/components/layout/CustomCursor";
import { Nav } from "@/app/components/layout/Nav";
import { Footer } from "@/app/components/layout/Footer";
import { Preloader } from "@/app/components/layout/Preloader";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hagar Hassan — UI/UX Designer",
  description:
    "Portfolio of Hagar Hassan, a UI/UX designer crafting clean, considered digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-bg font-sans text-ink">
        <Preloader />
        <SmoothScroll>
          <Nav />
          <main className="relative">{children}</main>
          <Footer />
        </SmoothScroll>
        <CustomCursor />
      </body>
    </html>
  );
}

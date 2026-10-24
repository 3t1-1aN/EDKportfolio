import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GridBackground } from "@/components/ui/grid-background";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { PageEntrance } from "@/lib/page-entrance-context";
import { fontSans } from "@/lib/fonts";
import { GlassFilter } from "@/components/ui/liquid-glass";

export const metadata: Metadata = {
  title: "Ethan Kunder - Portfolio",
  description: "Mechatronics Student & Robotics Lead - Exploring the intersection of programming, robotics, AI, and creative engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis dark" suppressHydrationWarning>
      <body className={`${fontSans.variable} site-ambient font-sans antialiased`}>
        <GlassFilter />
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <div data-site-content-root className="relative min-h-screen">
            <div data-site-backdrop className="pointer-events-none fixed inset-0 z-0" aria-hidden>
              <GridBackground />
              <div className="absolute inset-0 hidden md:block">
                <span className="accent-square absolute left-7 top-[28%] h-2 w-2" />
                <span className="accent-square absolute left-12 top-[31.5%] h-1.5 w-1.5 opacity-80" />
                <span className="accent-square absolute right-8 bottom-[22%] h-2 w-2" />
              </div>
            </div>
            <SmoothScroll>
              <Cursor />
              <Navbar />
              <PageEntrance>{children}</PageEntrance>
            </SmoothScroll>
            {/* Grain sits above content so backdrop-filter on glass only samples grid + sketches */}
            <NoiseOverlay className="fixed inset-0 z-40" />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers/providers";
import { SiteHeader } from "@/components/common/site-header/site-header";
import { SiteFooter } from "@/components/common/site-footer/site-footer";

const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nextjs rekash boilerplate",
  description: "Best project starter for Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}>
        <Providers>
          <SiteHeader />
          <div className="relative flex min-h-dvh flex-col bg-background">
            <main className="flex-1">{children}</main>
          </div>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}

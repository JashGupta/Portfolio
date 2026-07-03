import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/ui/navbar";
import { CommandPalette } from "@/components/ui/command-palette";
import { AppProviders } from "@/components/providers/app-provider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col overflow-x-hidden bg-background antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AppProviders>
          <Navbar />
          <main id="main-content" className="flex-1">
                {children}
          </main>
          <CommandPalette />
        </AppProviders>
      </body>
    </html>
  );
}

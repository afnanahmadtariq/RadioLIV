import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "./context/PlayerContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { Sidebar, TopBar, PlayerBar, PwaRegistrar, MobileNav } from "./components";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#1a1b26",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "RadioLIV - Free Online Radio Stations",
  description: "Listen to thousands of free online radio stations from around the world. Discover music, news, sports, and more on RadioLIV.",
  keywords: ["radio", "online radio", "free radio", "music", "streaming", "internet radio"],
  manifest: "/manifest.webmanifest", // Link to the generated manifest
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RadioLIV",
  },
  openGraph: {
    title: "RadioLIV - Free Online Radio Stations",
    description: "Listen to thousands of free online radio stations from around the world.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <PlayerProvider>
          <FavoritesProvider>
            <div className="app-container">
              <Sidebar />
              <main className="main-content">
                <TopBar />
                {children}
              </main>
              <PlayerBar />
              <MobileNav />
            </div>
            <PwaRegistrar />
          </FavoritesProvider>
        </PlayerProvider>
      </body>
    </html>
  );
}

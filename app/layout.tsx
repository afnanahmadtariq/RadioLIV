import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "./context/PlayerContext";
import { Sidebar, TopBar, PlayerBar } from "./components";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RadioLIV - Free Online Radio Stations",
  description: "Listen to thousands of free online radio stations from around the world. Discover music, news, sports, and more on RadioLIV.",
  keywords: ["radio", "online radio", "free radio", "music", "streaming", "internet radio"],
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
          <div className="app-container">
            <Sidebar />
            <main className="main-content" style={{ marginLeft: 'var(--sidebar-width)' }}>
              <TopBar />
              {children}
            </main>
            <PlayerBar />
          </div>
        </PlayerProvider>
      </body>
    </html>
  );
}

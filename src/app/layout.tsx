import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DualForge",
  description: "Dual-face NSFW video generator",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DualForge",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 min-h-dvh antialiased">
        {children}
      </body>
    </html>
  );
}

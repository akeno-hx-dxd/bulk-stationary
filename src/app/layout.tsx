import type { Metadata } from "next";
import localFont from "next/font/local";
import { SidebarProvider} from "@/components/ui/sidebar";
import "./globals.css";
import {
  WEBSITE_NAME,
  WEBSITE_DESCRIPTION,
} from "@/constants/index";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: WEBSITE_NAME,
  description: WEBSITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
        <div className="flex flex-col justify-center items-center min-h-screen w-full bg-white text-black">
          {children}
        </div>
        </SidebarProvider>
      </body>
    </html>
  );
}

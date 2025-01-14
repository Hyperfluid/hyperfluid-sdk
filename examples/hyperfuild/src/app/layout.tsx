import { HyperfluidSDKProvider } from "@/components/HyperfluidSDKProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { WalletProvider } from "../components/WalletProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hyperfluid SDK Demo",
  description: "Hyperfluid SDK Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HyperfluidSDKProvider>
          <WalletProvider>{children}</WalletProvider>
        </HyperfluidSDKProvider>
        <Toaster />
      </body>
    </html>
  );
}

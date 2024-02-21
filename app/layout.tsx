import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const IMBPlex = IBM_Plex_Sans_KR({ 
  subsets: ["latin"],
  weight:['400','500','600','700'],
  variable:'--font-ibm-plex'
});

export const metadata: Metadata = {
  title: "Imaginify",
  description: "Ai-powered image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables: { colorPrimary:'#624cf5'}
    }}>
      <html lang="en">
        <body className={cn("font-IMBPlex antialiased", IMBPlex.variable)}>{children}</body>
      </html>
    </ClerkProvider>
  );
}

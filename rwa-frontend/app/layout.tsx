import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'AIToken Innovation Fund - AI Asset Investment Platform',
  description: 'Tokenize and invest in AI models, datasets, and patents. Connect developers with investors in the AI innovation ecosystem.',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen bg-cover bg-center bg-fixed`}
        style={{ backgroundImage: 'url(/backgrnd.jpg)' }}
      >
        <div className="min-h-screen bg-black/50">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}

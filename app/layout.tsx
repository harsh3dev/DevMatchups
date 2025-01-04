import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "./StoreProvider";
import { NextAuthProvider } from "./provider";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | DevMatchups',
    default: 'DevMatchups',
  },
  description: "Find teams for hackathons worldwide",
  keywords: ['Hackathon', 'Unstop', 'Teams', 'Find', 'Hackathons', 'Worldwide', 'DevMatchups', 'Dev', 'Matchups', 'Developer'],
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `}
        </Script>
      </head>
      <body className="bg-background" cz-shortcut-listen="false">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <NextAuthProvider>
            <StoreProvider>
              {children}
              {/* <Analytics /> */}
            </StoreProvider>
          </NextAuthProvider>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}

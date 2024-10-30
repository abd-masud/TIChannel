"use client";

import localFont from "next/font/local";
import QueryProvider from "./QueryProvider";
import "./globals.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { AuthProvider } from "@/components/Frontend/Context/AuthContext";
import Loader from "@/components/Loader";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="csrf_token_name" content="ci_csrf_token" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="https://rafusoft.com/assets/img/favicon.png"
        />
        <meta name="theme-color" content="#F15A29" />
        <meta name="version" content="1.0" />
        <meta name="release-date" content="2024-10-30" />
        <meta
          name="description"
          content="Top Best Software Company in Bangladesh for IOS And Android Development, Professional SEO Service. 100% Free Support"
        />
        <meta
          name="keywords"
          content="Top Best Software Company in Bangladesh, IT Solution Dinajpur, IT Training Online, Software Services, Firmware Development, Ai Development"
        />
        <meta name="author" content="Developed by rafusoft.com" />
        <title>TI Channel: Voice of Islam</title>
        <link rel="canonical" href="https://tichannel.com" />
        <link
          rel="shortcut icon"
          href="https://rafusoft.com/assets/img/favicon.png"
          type="img/x-icon"
        />
        <meta
          property="og:title"
          content="Rafusoft: Top Best Software Company in Bangladesh"
        />
        <meta property="og:site_name" content="Rafusoft" />
        <meta property="og:url" content="https://rafusoft.com" />
        <meta
          property="og:description"
          content="Top Best Software Company in Bangladesh for IOS And Android Development, Professional SEO Service. 100% Free Support"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://rafusoft.com/assets/img/favicon.png"
        />
        <meta name="yandex-verification" content="cbdcf62627dad12a" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rafusoft" />
        <meta
          name="twitter:title"
          content="Rafusoft: Top Best Software Company in Bangladesh"
        />
        <meta
          name="twitter:description"
          content="Top Best Software Company in Bangladesh for IOS And Android Development, Professional SEO Service. 100% Free Support"
        />
        <meta
          name="twitter:image"
          content="https://rafusoft.com/assets/img/favicon.png"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <QueryProvider>{loading ? <Loader /> : children}</QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

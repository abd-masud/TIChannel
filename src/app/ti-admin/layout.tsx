"use client";

// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Backend/Header/Header";
import { SideBar } from "@/components/Backend/SideBar/SideBar";
import { useState } from "react";
import { usePathname } from "next/navigation";

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

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isSidebarVisible) setSidebarVisible(false);
  };

  const hiddenPages = [
    "/ti-admin/authentication/sign-up",
    "/ti-admin/authentication/sign-in",
    "/ti-admin/authentication/forgot-password",
    "/ti-admin/authentication/change-password",
    "/ti-admin/authentication/new-password",
  ];
  const isHiddenPage = hiddenPages.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        {!isHiddenPage && (
          <>
            <div
              className={`fixed w-[250px] z-50 transition-transform duration-300 ${
                isSidebarVisible ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <SideBar />
            </div>
            {isSidebarVisible && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition duration-300"
                onClick={closeSidebar}
              />
            )}
          </>
        )}

        <main
          className={`flex-1 transition-all duration-300 ${
            !isHiddenPage && isSidebarVisible ? "md:ml-[250px] ml-0" : "ml-0"
          }`}
        >
          {!isHiddenPage && (
            <div className="sticky top-0 z-20">
              <Header toggleSidebar={toggleSidebar} />
            </div>
          )}
          {children}
        </main>
      </body>
    </html>
  );
}
"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Walter_Turncoat } from "next/font/google";
import "./globals.css";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./navbar"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const walter = Walter_Turncoat({
  subsets: ["latin"],
  weight: "400",
});

// export const metadata: Metadata = {
//   title: "Home",
//   description: "Home Page",
// };

const disableNavbar = ["/login", "/register", "/not-found", "/error"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} ${walter.className} antialiased`}
        >
          {!disableNavbar.includes(pathname) && <Navbar />}
          <div className="container mx-auto my-5">{children}</div>
        </body>
      </html>
    </SessionProvider>
  );
}

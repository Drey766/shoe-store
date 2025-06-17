'use client'

import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { StateProvider } from './context/StateProvider';
import { initialState } from './context/reducer';
import reducer from './context/reducer';
import React from "react";
import Header from './components/Header';
import Footer from './components/Footer';


const montserratSans = Montserrat({
  variable: "--font-montserrat",
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserratSans.variable} ${geistMono.variable}`}>
        <StateProvider>
          <Header />
          {children}
          <Footer />
        </StateProvider>
      </body>
    </html>
  );
}

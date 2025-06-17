'use client'

// app/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import { StateProvider } from './context/StateProvider';
import { initialState } from './context/reducer';
import reducer from './context/reducer';
import './globals.css';


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <StateProvider initialState={initialState} reducer={reducer}>
          {children}
        </StateProvider>
      </body>
    </html>
  );
}
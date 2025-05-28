// app/layout.tsx
"use client";

import React, { useState } from 'react';
import { Sidebar } from '../app/layout/SideBar';
import { Header } from '../app/layout/Header';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100">
        <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
        <div className="flex-1 flex flex-col">
          <Header setIsOpen={setIsOpen} isOpen={isOpen}/>
          <main className="p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
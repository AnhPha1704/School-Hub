"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/menu";
import NavBar from "@/components/navBar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/50"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR: */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[240px] bg-[var(--color-green)] p-4 flex flex-col transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        <Link href="/" className="flex items-center p-4 gap-2 mb-4">
          <Image src="/logo256.png" alt="logo" width={64} height={64} />
          <span className="font-bold text-lg text-gray-200">School Hub</span>
        </Link>
        <div className="overflow-y-scroll hide-scrollbar">
          <Menu closeSidebar={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 bg-[var(--color-yellowBg)] overflow-y-auto hide-scrollbar flex flex-col">
        <NavBar onMenuClick={() => setSidebarOpen(true)} />
        <main>{children}</main>
      </div>
    </div>
  );
}

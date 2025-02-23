"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "./Footer";


export default function Layout({ children }: { children: React.ReactNode }) {
  

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer */}
      < Footer />
      
    </div>
  );
}
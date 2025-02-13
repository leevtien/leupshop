import "./globals.css";
import { CartProvider } from "@/app/context/CartContext";
import Layout from "@/components/layout";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Layout>{children}</Layout>
        </CartProvider>
      </body>
    </html>
  );
}
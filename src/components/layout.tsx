"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { cart } = useCart();

  // Tính tổng số sản phẩm trong giỏ hàng
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">🚀 My E-Commerce</Link>
          

          {/* Navbar */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/products/premium" className="hover:underline">Products</Link>
            <Link href="/about" className="hover:underline">About</Link>
          
            {/* Giỏ hàng có số lượng sản phẩm */}
            <Link href="/cart" className="relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p className="text-lg">🚀 My E-Commerce - Mua tài khoản premium giá rẻ</p>
        <p className="text-sm text-gray-400 mt-2">© 2025 My E-Commerce. All rights reserved.</p>
      </footer>
    </div>
  );
}
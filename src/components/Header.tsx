import Link from "next/link";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import SearchBar from "@/components/SearchBar";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();

  // Tính tổng số sản phẩm trong giỏ hàng
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);


  return (
    <header className=" ">
      <div className="bg-blue-600 text-white p-8 top-0 left-0 w-full z-50 h-full">
      <div className="ontainer mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">🚀 My E-Commerce</Link>
        
        {/* Nút mở menu trên mobile */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
          <Menu size={24} />
        </button>

        {/* <div className="flex justify-center mt-6">
        
      </div> */}

        {/* Ô tìm kiếm */}
        <div className="flex-1 mx-4">
        <div className="flex justify-center mt-6">
        <SearchBar products={products} />
      </div>
        </div>
        <nav className="hidden md:flex space-x-6">
            <button className="hover:underline">Home</button>
            <Link href="/" className="hover:underline">Login</Link>
            <Link href="/products/premium" className="hover:underline">Sign up</Link>
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
      </div>
      <div className="bg-white pt-4">
              hello
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="bg-white text-black p-4 absolute top-full left-0 w-full shadow-md">
          <Link href="/" className="block p-2">🏠 Trang chủ</Link>
          <Link href="/categories" className="block p-2">📂 Danh mục</Link>
          <Link href="/cart" className="block p-2">🛒 Giỏ hàng</Link>
        </div>
      )}
    </header>
  );
}

const products = [
  { id: "1", name: "Netflix Premium", price: 48, description: "1 tháng Netflix Premium" },
  { id: "2", name: "Spotify Premium", price: 24, description: "1 tháng Spotify Premium" },
  { id: "3", name: "YouTube Premium", price: 18, description: "1 năm YouTube Premium" },
  { id: "4", name: "Disney+", price: 36, description: "1 năm Disney+" },
  { id: "5", name: "Apple Music", price: 12, description: "1 tháng Apple Music" },
  { id: "6", name: "HBO Max", price: 30, description: "1 tháng HBO Max" },
  { id: "7", name: "Amazon Prime", price: 60, description: "1 năm Amazon Prime" },
  { id: "8", name: "Tidal", price: 24, description: "1 tháng Tidal" },
  { id: "9", name: "Plex TV", price: 36, description: "1 năm Plex TV" },
  { id: "10", name: "Crunchyroll", price: 18, description: "1 tháng Crunchyroll" },
  { id: "11", name: "Deezer", price: 12, description: "1 tháng Deezer" },
  { id: "12", name: "Pandora", price: 24, description: "1 tháng Pandora" },
  { id: "13", name: "Twitch Prime", price: 12, description: "1 tháng Twitch Prime" },

];
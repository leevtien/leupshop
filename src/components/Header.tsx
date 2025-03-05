"use client";

import Link from "next/link";
import { ShoppingCart, Menu, User, LogIn, X, UserPlus, Search, LogOut, CreditCard, Clock, Heart, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

// Move products definition to the top, before the component
const products = [
  { id: "1", name: "Netflix Premium", price: 48, description: "1 tháng Netflix Premium" },
  // ...other products
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { data: session, status } = useSession();
  const { cart } = useCart();
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Tính tổng số sản phẩm trong giỏ hàng
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Toggle user dropdown menu
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  
  // Toggle search bar on mobile
  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  
  // Handle navigation and close menu
  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    router.push(path);
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut({ redirect: false });
    setIsUserMenuOpen(false);
    router.push("/");
  };

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="relative">
      <div className="bg-blue-600 text-white py-4 px-4 md:px-8 top-0 left-0 w-full z-50">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          {/* Top row with logo and icons */}
          <div className="flex justify-between items-center w-full md:w-auto">
            {/* Logo */}
            <Link href="/" className="text-xl md:text-2xl font-bold">🚀 My E-Commerce</Link>
            
            {/* Mobile icons */}
            <div className="flex md:hidden space-x-4">
              <button onClick={toggleSearchBar} className="focus:outline-none">
                <Search size={22} />
              </button>
              <Link href="/cart" className="relative" onClick={() => setIsMenuOpen(false)}>
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
          
          {/* Mobile search bar */}
          {isSearchVisible && (
            <div className="w-full mt-3 md:hidden">
              <SearchBar products={products} />
            </div>
          )}
          
          {/* Desktop search and nav */}
          <div className="hidden md:flex flex-1 mx-4">
            <div className="flex w-full max-w-xl">
              <SearchBar products={products} />
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            {/* User account dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button onClick={toggleUserMenu} className="focus:outline-none flex items-center">
                <User size={24} />
                {session?.user && <span className="ml-2 hidden md:inline">{session.user.name}</span>}
              </button>
              
              {/* User dropdown menu - Changes based on login status */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50">
                  {status === 'authenticated' ? (
                    <>
                      {/* Logged in menu */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">Welcome, {session.user?.name}</p>
                        <div className="mt-1 flex justify-between items-center">
                          <p className="text-xs text-gray-500">Balance</p>
                          <p className="text-sm font-bold text-blue-600">
                            {(session.user as any)?.balance?.toFixed(2) || '0.00'}€
                          </p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleNavigation("/account")} 
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings size={16} className="mr-2 text-gray-400" />
                        <span>Account Settings</span>
                      </button>
                      
                      <button 
                        onClick={() => handleNavigation("/account?tab=orders")} 
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Clock size={16} className="mr-2 text-gray-400" />
                        <span>Order History</span>
                      </button>
                      
                      <button 
                        onClick={() => handleNavigation("/account?tab=favorites")} 
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Heart size={16} className="mr-2 text-gray-400" />
                        <span>Favorite Products</span>
                      </button>
                      
                      <button 
                        onClick={() => handleNavigation("/account/add-funds")} 
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <CreditCard size={16} className="mr-2 text-gray-400" />
                        <span>Add Funds</span>
                      </button>
                      
                      <div className="border-t border-gray-200 mt-1"></div>
                      
                      <button 
                        onClick={handleLogout} 
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="mr-2" />
                        <span>Log Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Not logged in menu */}
                      <button 
                        onClick={() => handleNavigation("/login")} 
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogIn size={16} className="mr-2" />
                        <span>Sign In</span>
                      </button>
                      <button 
                        onClick={() => handleNavigation("/register")} 
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <UserPlus size={16} className="mr-2" />
                        <span>Register</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Cart with item count */}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div ref={menuRef} className="bg-white text-black p-4 absolute top-full left-0 w-full shadow-md z-50">
          <div className="container mx-auto">
            <button 
              onClick={() => handleNavigation("/")} 
              className="flex items-center p-3 border-b w-full text-left"
            >
              <span className="mr-2">🏠</span>
              <span>Home</span>
            </button>
            <button 
              onClick={() => handleNavigation("/categories")} 
              className="flex items-center p-3 border-b w-full text-left"
            >
              <span className="mr-2">📂</span>
              <span>Categories</span>
            </button>
            
            {/* Mobile menu changes based on login status */}
            {status === 'authenticated' ? (
              <>
                <button 
                  onClick={() => handleNavigation("/account")} 
                  className="flex items-center p-3 border-b w-full text-left"
                >
                  <User size={16} className="mr-2" />
                  <span>My Account</span>
                  <span className="ml-auto text-sm text-blue-600 font-medium">
                    {(session.user as any)?.balance?.toFixed(2) || '0.00'}€
                  </span>
                </button>
                <button 
                  onClick={() => handleNavigation("/account?tab=orders")} 
                  className="flex items-center p-3 border-b w-full text-left"
                >
                  <Clock size={16} className="mr-2" />
                  <span>Orders</span>
                </button>
                <button 
                  onClick={() => handleNavigation("/account?tab=favorites")} 
                  className="flex items-center p-3 border-b w-full text-left"
                >
                  <Heart size={16} className="mr-2" />
                  <span>Favorites</span>
                </button>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center p-3 border-b w-full text-left text-red-600"
                >
                  <LogOut size={16} className="mr-2" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => handleNavigation("/login")} 
                  className="flex items-center p-3 border-b w-full text-left"
                >
                  <LogIn size={16} className="mr-2" />
                  <span>Sign In</span>
                </button>
                <button 
                  onClick={() => handleNavigation("/register")} 
                  className="flex items-center p-3 border-b w-full text-left"
                >
                  <UserPlus size={16} className="mr-2" />
                  <span>Register</span>
                </button>
              </>
            )}
            
            <button 
              onClick={() => handleNavigation("/cart")} 
              className="flex items-center p-3 w-full text-left"
            >
              <span className="mr-2">🛒</span>
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  Users, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronDown,
  ChevronUp 
} from "lucide-react";
import { useState } from "react";

const AdminSidebar = () => {
  const pathname = usePathname();
  const [productsOpen, setProductsOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className="bg-white w-64 min-h-screen shadow-md flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <Link href="/admin" className={`flex items-center p-3 rounded-lg ${isActive('/admin') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
              <BarChart3 className="h-5 w-5 mr-3" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link href="/admin/users" className={`flex items-center p-3 rounded-lg ${isActive('/admin/users') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
              <Users className="h-5 w-5 mr-3" />
              <span>Users</span>
            </Link>
          </li>

          <li>
            <button 
              onClick={() => setProductsOpen(!productsOpen)} 
              className={`flex w-full items-center justify-between p-3 rounded-lg ${pathname.startsWith('/admin/products') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-3" />
                <span>Products</span>
              </div>
              {productsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {productsOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link href="/admin/products" className={`flex items-center p-2 rounded-lg ${isActive('/admin/products') ? 'text-blue-600' : 'hover:bg-gray-50'}`}>
                    <span>All Products</span>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/products/categories" className={`flex items-center p-2 rounded-lg ${isActive('/admin/products/categories') ? 'text-blue-600' : 'hover:bg-gray-50'}`}>
                    <span>Categories</span>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/products/add" className={`flex items-center p-2 rounded-lg ${isActive('/admin/products/add') ? 'text-blue-600' : 'hover:bg-gray-50'}`}>
                    <span>Add Product</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link href="/admin/orders" className={`flex items-center p-3 rounded-lg ${isActive('/admin/orders') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
              <ShoppingBag className="h-5 w-5 mr-3" />
              <span>Orders</span>
            </Link>
          </li>

          <li>
            <Link href="/admin/settings" className={`flex items-center p-3 rounded-lg ${isActive('/admin/settings') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
              <Settings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex w-full items-center p-3 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
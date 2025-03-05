"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";
import { ClipLoader } from "react-spinners";
import {
  User,
  CreditCard,
  Clock,
  ShoppingBag,
  Heart,
  LogOut,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  PencilLine,
  Trash2,
  Eye,
  Download,
} from "lucide-react";

// Define your types
type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  balance: number;
  joinDate: string;
  phone?: string;
};

type Order = {
  id: string;
  date: string;
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[];
  status: "completed" | "processing" | "cancelled";
  total: number;
};

type FavoriteItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const router = useRouter();

  // Mock data loading
  useEffect(() => {
    // In a real app, you'd fetch this data from your API
    setTimeout(() => {
      setUser({
        id: "user123",
        name: "Tien Le",
        email: "user@example.com",
        avatar: "/images/avatar.jpg",
        balance: 125.50,
        joinDate: "2023-05-15",
        phone: "+33612345678"
      });

      setOrders([
        {
          id: "ORD-12345",
          date: "2025-02-25",
          products: [
            {
              id: "1",
              name: "Netflix Premium",
              price: 5.99,
              image: "/images/netflix.png",
              quantity: 1
            },
            {
              id: "3",
              name: "Canva Pro",
              price: 4.99,
              image: "/images/canva.png",
              quantity: 1
            }
          ],
          status: "completed",
          total: 10.98
        },
        {
          id: "ORD-12346",
          date: "2025-02-10",
          products: [
            {
              id: "2",
              name: "Spotify Premium",
              price: 3.99,
              image: "/images/spotify.png",
              quantity: 1
            }
          ],
          status: "processing",
          total: 3.99
        },
        {
          id: "ORD-12347",
          date: "2025-01-15",
          products: [
            {
              id: "7",
              name: "Chat GPT",
              price: 9.99,
              image: "/images/chatgpt.png",
              quantity: 1
            }
          ],
          status: "completed",
          total: 9.99
        }
      ]);

      setFavorites([
        {
          id: "1",
          name: "Netflix Premium",
          price: 5.99,
          image: "/images/netflix.png",
          description: "Tài khoản Netflix Premium 4K cho 1 tháng."
        },
        {
          id: "2",
          name: "Spotify Premium",
          price: 3.99,
          image: "/images/spotify.png",
          description: "Tài khoản Spotify Premium 1 tháng."
        },
        {
          id: "7",
          name: "Chat GPT",
          price: 9.99,
          image: "/images/chatgpt.png",
          description: "Tài khoản Chat GPT 1 tháng."
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
    // For example:
    // logout();
    router.push("/login");
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3B82F6" size={40} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* User Summary Card */}
        <motion.div 
          className="md:col-span-1 bg-white rounded-lg shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col items-center text-center">
            {user?.avatar ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image 
                  src={user.avatar} 
                  alt={user.name} 
                  layout="fill" 
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-4">
                <User size={40} />
              </div>
            )}
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-500 text-sm mb-4">{user?.email}</p>

            <div className="w-full p-3 bg-blue-50 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Your Balance:</span>
                <span className="text-xl font-bold text-blue-600">{user?.balance.toFixed(2)}€</span>
              </div>
              <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Add Funds
              </button>
            </div>

            <button 
              onClick={handleLogout}
              className="flex items-center justify-center w-full text-gray-600 hover:text-red-600 mt-2"
            >
              <LogOut size={18} className="mr-2" />
              Log Out
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="mt-6 md:hidden">
            <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
              <Tab.List className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                <Tab className={({ selected }) => `w-full py-2 text-sm leading-5 font-medium rounded-lg transition ${
                  selected ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-white/[0.5] hover:text-gray-700'
                }`}>
                  Info
                </Tab>
                <Tab className={({ selected }) => `w-full py-2 text-sm leading-5 font-medium rounded-lg transition ${
                  selected ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-white/[0.5] hover:text-gray-700'
                }`}>
                  Orders
                </Tab>
                <Tab className={({ selected }) => `w-full py-2 text-sm leading-5 font-medium rounded-lg transition ${
                  selected ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-white/[0.5] hover:text-gray-700'
                }`}>
                  Favorites
                </Tab>
              </Tab.List>
            </Tab.Group>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <motion.div 
          className="md:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
            {/* Desktop Tabs */}
            <Tab.List className="hidden md:flex space-x-2 border-b">
              <Tab className={({ selected }) => `px-6 py-3 text-sm leading-5 font-medium border-b-2 transition ${
                selected ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}>
                Account Information
              </Tab>
              <Tab className={({ selected }) => `px-6 py-3 text-sm leading-5 font-medium border-b-2 transition ${
                selected ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}>
                Order History
              </Tab>
              <Tab className={({ selected }) => `px-6 py-3 text-sm leading-5 font-medium border-b-2 transition ${
                selected ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}>
                Favorites
              </Tab>
            </Tab.List>

            <Tab.Panels className="mt-6">
              {/* Account Information Panel */}
              <Tab.Panel>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <button className="flex items-center text-blue-600 text-sm">
                      <PencilLine size={16} className="mr-1" />
                      Edit
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          value={user?.name} 
                          readOnly 
                          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                          type="email" 
                          value={user?.email} 
                          readOnly 
                          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          value={user?.phone || 'Not provided'} 
                          readOnly 
                          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Created</label>
                        <input 
                          type="text" 
                          value={new Date(user?.joinDate || '').toLocaleDateString()} 
                          readOnly 
                          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="my-6" />

                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Security</h3>
                  </div>

                  <button className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Change Password
                  </button>

                  <hr className="my-6" />

                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Payment Information</h3>
                    <button className="flex items-center text-blue-600 text-sm">
                      <CreditCard size={16} className="mr-1" />
                      Add Payment Method
                    </button>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center text-gray-500">
                    <p>No payment methods added yet.</p>
                  </div>
                </div>
              </Tab.Panel>

              {/* Order History Panel */}
              <Tab.Panel>
                <div className="bg-white rounded-lg shadow divide-y">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <div key={order.id} className="p-4 md:p-6">
                        <div className="flex flex-wrap justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                            <p className="text-gray-500 text-sm">
                              {new Date(order.date).toLocaleDateString()} • {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0 flex flex-col items-end">
                            <span className="text-lg font-bold">{order.total.toFixed(2)}€</span>
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              order.status === 'completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {order.products.map((product) => (
                            <div key={product.id} className="flex items-center">
                              <div className="relative w-16 h-16 mr-3">
                                <Image 
                                  src={product.image} 
                                  alt={product.name} 
                                  layout="fill" 
                                  objectFit="cover" 
                                  className="rounded-md"
                                />
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-sm text-gray-500">
                                  {product.quantity} x {product.price.toFixed(2)}€
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex space-x-2">
                          <Link href={`/orders/${order.id}`}>
                            <button className="flex items-center text-sm text-blue-600">
                              <Eye size={16} className="mr-1" />
                              View Details
                            </button>
                          </Link>
                          {order.status === 'completed' && (
                            <button className="flex items-center text-sm text-green-600">
                              <Download size={16} className="mr-1" />
                              Download Invoice
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                      <p className="text-gray-500 mt-1">When you make a purchase, it will appear here.</p>
                      <Link href="/products">
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                          Browse Products
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </Tab.Panel>

              {/* Favorites Panel */}
              <Tab.Panel>
                <div className="bg-white rounded-lg shadow">
                  {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                      {favorites.map((item) => (
                        <motion.div 
                          key={item.id}
                          className="border border-gray-200 rounded-lg overflow-hidden"
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="relative h-40">
                            <Image 
                              src={item.image} 
                              alt={item.name} 
                              layout="fill" 
                              objectFit="cover"
                            />
                            <button 
                              onClick={() => handleRemoveFavorite(item.id)}
                              className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-red-50 transition"
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-gray-500 text-sm line-clamp-2 mb-2">{item.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="font-bold">{item.price.toFixed(2)}€</span>
                              <Link href={`/products/${item.id}`}>
                                <button className="text-blue-600 text-sm">View Product</button>
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No favorites yet</h3>
                      <p className="text-gray-500 mt-1">Save your favorite products for later.</p>
                      <Link href="/products">
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                          Browse Products
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </motion.div>
      </div>
    </div>
  );
}
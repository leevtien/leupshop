"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/Sidebar';
import { Loader2 } from 'lucide-react';
import { 
  Users, 
  Package, 
  ShoppingBag, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import Link from 'next/link';
import AdminDebug from './debug';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  newUsers: number;
  newOrders: number;
  userGrowth: number;
  orderGrowth: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    newUsers: 0,
    newOrders: 0,
    userGrowth: 0,
    orderGrowth: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Admin page loaded - Session status:", status);
    console.log("Session data:", session);
    
    // Check if user is logged in and has admin role
    if (status === 'loading') {
      console.log("Session is still loading...");
      return;
    }
    
    if (status === 'unauthenticated') {
      console.log("User is not authenticated, redirecting to login");
      router.push('/login?callbackUrl=/admin');
      return;
    }
    
    console.log("User authenticated:", session?.user);
    console.log("User role:", (session?.user as any)?.role);
    
    // Check if user has admin role
    const isAdmin = (session?.user as any)?.role === 'ADMIN';
    
    if (!isAdmin) {
      console.log("User is not an admin, redirecting to home");
      router.push('/');
      return;
    }
    
    console.log("User authorized as admin");
    setIsAuthorized(true);
  }, [session, status, router]);

  useEffect(() => {
    // In a real app, fetch this data from your API
    const fetchStats = async () => {
      try {
        // For demo purposes, we'll use mock data
        // const response = await fetch('/api/admin/stats');
        // const data = await response.json();
        
        // Mock data
        const mockData = {
          totalUsers: 542,
          totalProducts: 128,
          totalOrders: 1024,
          totalRevenue: 28465.75,
          newUsers: 24,
          newOrders: 87,
          userGrowth: 4.5,
          orderGrowth: 8.2
        };
        
        setStats(mockData);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthorized) {
      fetchStats();
    }
  }, [isAuthorized]);

  // Show loading state when checking authorization
  if (isAuthorized === null || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-xl font-medium">Verifying access...</span>
      </div>
    );
  };

  // If authorized, show admin dashboard
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm ${stats.userGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.userGrowth >= 0 ? (
                <ArrowUpRight className="inline h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="inline h-3 w-3 mr-1" />
              )}
              {Math.abs(stats.userGrowth)}%
            </span>
            <span className="text-xs text-gray-500 ml-2">from last month</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Products</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/products" className="text-sm text-blue-600 hover:underline">
              View all products
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <ShoppingBag className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm ${stats.orderGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.orderGrowth >= 0 ? (
                <ArrowUpRight className="inline h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="inline h-3 w-3 mr-1" />
              )}
              {Math.abs(stats.orderGrowth)}%
            </span>
            <span className="text-xs text-gray-500 ml-2">from last month</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Revenue</p>
              <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline">
              View sales report
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">#ORD-1234</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">John Doe</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">$99.99</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">#ORD-1235</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Jane Smith</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">$79.99</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Processing</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">#ORD-1236</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Mike Johnson</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">$129.99</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Pending</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline">
              View all orders
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">New Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Sarah Parker</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">sarah@example.com</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">2 hours ago</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Robert Lee</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">robert@example.com</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">5 hours ago</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">Thomas Wilson</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">thomas@example.com</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">1 day ago</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <Link href="/admin/users" className="text-sm text-blue-600 hover:underline">
              View all users
            </Link>
          </div>
        </div>
      </div>

      {/* Add the debug component */}
      <AdminDebug />
    </>
  );
}
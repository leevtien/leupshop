// filepath: /leupshop/leupshop/src/app/page.tsx
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
        <p className="mt-4">Manage users, products, and orders from the links below:</p>
        <div className="mt-6 space-y-4">
          <Link href="/admin/users">
            <a className="block bg-blue-500 text-white p-3 rounded-lg text-center">Manage Users</a>
          </Link>
          <Link href="/admin/products">
            <a className="block bg-green-500 text-white p-3 rounded-lg text-center">Manage Products</a>
          </Link>
          <Link href="/admin/orders">
            <a className="block bg-yellow-500 text-white p-3 rounded-lg text-center">Manage Orders</a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
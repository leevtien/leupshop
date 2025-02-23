
"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { ShoppingCart, CreditCard } from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export default function PremiumProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/airtable");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <ClipLoader color="#2563EB" size={50} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Giải trí</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-4">
        {products.map((product, index) => (
          <motion.div 
            key={product.id} 
            className="bg-white p-4 overflow-hidden relative group transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <motion.img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-40 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
            />
            {/* <h2 className="text-2xl font-semibold">{product.name}</h2> */}
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold text-blue-600 mt-2">€{product.price}</p>
            {/* <div className="mt-auto flex flex-col space-y-2">
            
              
            <motion.button 
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
              })}
            >
              🛒 Thêm vào giỏ hàng
            </motion.button>
            </div> */}
            {/* <div className="mt-auto flex space-x-2">
              <a 
                href={`/checkout?product=${product.id}`}
                className="flex-1 bg-blue-600 text-white flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <CreditCard size={18} /> Mua ngay
              </a>
              <button 
                className="flex-1 border border-blue-600 text-blue-600 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-blue-100 transition"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart size={18} /> Thêm vào giỏ
              </button>
            </div> */}
            
          </motion.div>
        ))}
      </div>
    </div>
  );
}
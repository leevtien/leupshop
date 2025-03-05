"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { ShoppingCart, CreditCard, Filter, ArrowUpDown, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Add Image import

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  slug?: string;
};

export default function PremiumProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>("default");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/airtable");
        const data = await res.json();
        
        // Ensure each product has a valid slug - use URL-friendly version of name if not available
        const productsWithSlugs = data.map((product: Product) => ({
          ...product,
          // Create a URL-friendly slug from the product name if none exists
          slug: product.slug || product.id.toString().replace(/\s+/g, '-').toLowerCase()
        }));
        
        setProducts(productsWithSlugs);
        console.log("Products with slugs:", productsWithSlugs); // Debug
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sort products based on current selection
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <ClipLoader color="#2563EB" size={50} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Dịch vụ Giải trí</h1>
      
      {/* Filter and Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center mb-4 md:mb-0">
          <Filter size={20} className="text-gray-600 mr-2" />
          <select 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Tất cả dịch vụ</option>
            <option value="streaming">Streaming</option>
            <option value="gaming">Gaming</option>
            <option value="productivity">Productivity</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <ArrowUpDown size={20} className="text-gray-600 mr-2" />
          <select 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sắp xếp mặc định</option>
            <option value="price-asc">Giá: Thấp đến cao</option>
            <option value="price-desc">Giá: Cao đến thấp</option>
            <option value="name">Theo tên</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {sortedProducts.map((product, index) => (
          <motion.div 
            key={product.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden relative group transition flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="p-3 flex-grow flex flex-col">
              <div className="mb-3 overflow-hidden rounded-md h-40 flex items-center justify-center">
                {/* Use next/image to ensure images load correctly */}
                <div className="relative w-full h-full">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              
              <h2 className="text-lg font-semibold line-clamp-1 mb-1">{product.name}</h2>
              
              <p className="text-gray-600 text-sm line-clamp-2 mb-2 flex-grow">{product.description}</p>
              
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />
                ))}
                <span className="text-xs text-gray-500 ml-1">(5.0)</span>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-blue-600">{product.price}€</p>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">In Stock</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 p-3 pt-0 mt-auto">
              {/* Debug the slug
              <p className="text-xs text-gray-400">Slug: {product.slug}</p> */}
              
              <Link 
                href={`/products/${encodeURIComponent(product.slug || product.id)}`} 
                className="text-center text-sm text-blue-600 hover:underline mb-2"
              >
                Xem chi tiết
              </Link>
              
              <div className="flex space-x-2">
                <Link 
                  href={`/checkout?product=${encodeURIComponent(product.id)}`}
                  className="flex-1 bg-blue-600 text-white flex items-center justify-center gap-1 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  <CreditCard size={14} /> Mua
                </Link>
                <button 
                  className="flex-1 border border-blue-600 text-blue-600 flex items-center justify-center gap-1 py-2 rounded-lg hover:bg-blue-50 transition text-sm"
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                  })}
                >
                  <ShoppingCart size={14} /> Giỏ hàng
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Empty state */}
      {sortedProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 text-7xl mb-4">😢</div>
          <h3 className="text-xl font-medium text-gray-700">Không tìm thấy sản phẩm</h3>
          <p className="text-gray-500 mt-2">Vui lòng thử lại với các tiêu chí khác</p>
        </div>
      )}
    </div>
  );
}
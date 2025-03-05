"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { ArrowLeft } from "lucide-react";
import React from "react";

// Product type definition
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category?: string;
};

// Map slugs to human-readable names
const categoryNames: Record<string, string> = {
  "entertainment": "Giải trí",
  "work": "Làm việc",
  "education": "Học tập",
  "steam": "Game Steam",
  "editing": "Edit Ảnh - Video",
  "microsoft": "Window, Office",
  "google": "Google Drive",
  "steam-wallet": "Steam Wallet",
  "antivirus": "Diệt Virus"
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // Unwrap params with React.use() to get the slug
  const unwrappedParams = React.use(params);
  const slug = unwrappedParams.slug;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Use the unwrapped slug instead of directly accessing params.slug
  const categoryName = categoryNames[slug] || slug;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        // Fetch all products from your API
        const res = await fetch("/api/airtable");
        const allProducts = await res.json();
        
        // Filter products based on category if needed
        // For now, showing all products as an example
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoryProducts();
  }, [slug]); // Use slug from unwrappedParams here

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <ClipLoader color="#2563EB" size={50} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Quay lại</span>
        </button>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Danh mục: {categoryName}</h1>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
            >
              <Link href={`/products/${product.id}`} passHref>
                <div>
                  <div className="relative w-full h-32 md:h-40">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm md:text-base mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-gray-600 text-xs md:text-sm mb-2 line-clamp-2">{product.description}</p>
                    <p className="text-blue-600 font-bold">{product.price}€</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Không có sản phẩm nào trong danh mục này.</p>
        </div>
      )}
    </div>
  );
}
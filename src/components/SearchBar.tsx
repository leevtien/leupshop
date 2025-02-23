"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function SearchBar({ products }) {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Xử lý tìm kiếm với debounce
  useEffect(() => {
    if (query.length > 1) {
      const timeout = setTimeout(() => {
        const results = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(results);
      }, 300); // Chờ 300ms sau khi nhập mới tìm kiếm

      return () => clearTimeout(timeout);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);

  return (
    <div className="relative w-full mx-auto ">
      {/* Ô nhập tìm kiếm */}
      <div className="flex justify-center items-center gap-0 ">
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm..." 
              className="w-1/2 border px-3 py-1 text-black h-9 leading-tight rounded-l-lg focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* <Search className="absolute left-3 top-2 text-gray-500" size={20} /> */}
            <button className="bg-blue-500 text-white px-4 py-2 h-9 leading-tight rounded-r-lg">
              <Search size={20} />
            </button>
          </div>
        

      {/* Hiển thị kết quả tìm kiếm */}
      {filteredProducts.length > 0 && (
        <ul className="absolute left-0 right-0 mx-auto mt-2 w-full bg-white shadow-lg rounded-lg z-50 max-w-md border border-gray-300">
          {filteredProducts.map((product) => (
            <li key={product.id} className="p-3 border-b text-black">
              <Link href={`/products/${product.id}`} className="block text-sm">
                {product.name} - {product.price}€
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
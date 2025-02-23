"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Gamepad2, Briefcase, GraduationCap, Monitor, Paintbrush, Shield, Gift, FileText } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800); // Giả lập thời gian tải
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-blue-600"
        >
          🚀 Đang tải...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* Sidebar Danh Mục */}
      <div className="container mx-auto grid grid-cols-4 gap-4 p-4">
        <motion.aside 
          className="bg-white shadow-lg rounded-xl p-5 col-span-1"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ul className="space-y-4 text-gray-700 ">
            {categories.map((category) => (
              <motion.li 
                key={category.name} 
                className="flex items-center space-x-3 hover:text-blue-600 transition cursor-pointer hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                {category.icon}
                <span className="font-semibold">{category.name}</span>
              </motion.li>
            ))}
          </ul>
        </motion.aside>

        {/* Banner Chính */}
        <motion.section 
          className="relative bg-cover bg-center rounded-xl col-span-2 flex flex-col items-center text-center shadow-lg"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="relative w-full h-full">
                <Image
                  src="/images/hero.png"
                  alt="hero"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
          
        </motion.section>
        
        <motion.section className="col-span-1 flex flex-col space-y-4">
        <div className="relative w-full h-1/2">
                <Image
                  src="/images/vpn.png"
                  alt="hero"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="relative w-full h-1/2">
                <Image
                  src="/images/ai.png"
                  alt="hero"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
        </motion.section>
        
      </div>
       

      {/* Sản phẩm nổi bật */}
      <section className="container mx-auto px-4 mt-10 text-black">
        <motion.h2 
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Sản phẩm nổi bật
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 mt-4">
          {products.map((product, index) => (
            
            <motion.div 
              key={product.id}
              className="bg-white transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              
            >
            <Link href={`/products/${product.id}`} passHref>
            <div>
            
              {/* Hình ảnh sản phẩm */}
              <div className="relative w-full h-40">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              {/* Thông tin sản phẩm */}
              <div className="mt-3">
                <p className="text-gray-500 text-sm">{product.description}</p>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-black-500">{product.price}€</span>
                </div>
              </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* sản phâm bán chạy */}
      <section className="w-full bg-blue-500 py-10 mt-10">
        <motion.h2 
          className="text-2xl font-bold container mx-auto text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          
        >
          Sản phẩm bán chạy
        </motion.h2>

        <div className=" container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 mt-4">
          {products.map((product, index) => (
            
            <motion.div 
              key={product.id}
              className="transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              
            >
            <Link href={`/products/${product.id}`} passHref>
            <div>
            
              {/* Hình ảnh sản phẩm */}
              <div className="relative w-full h-40">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              {/* Thông tin sản phẩm */}
              <div className="mt-3">
                <p className="text-white text-sm">{product.description}</p>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-white">{product.price}€</span>
                </div>
              </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* sản phâm mới */}
      <section className="w-full bg-white py-10 mt-10">
        <motion.h2 
          className="text-2xl font-bold container mx-auto text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          color="blue"
        >
          Sản phẩm mới
        </motion.h2>

        <div className=" container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 mt-4">
          {products.map((product, index) => (
            
            <motion.div 
              key={product.id}
              className="transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              
            >
            <Link href={`/products/${product.id}`} passHref>
            <div>
            
              {/* Hình ảnh sản phẩm */}
              <div className="relative w-full h-40">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              {/* Thông tin sản phẩm */}
              <div className="mt-3">
                <p className="text-black text-sm">{product.description}</p>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-black">{product.price}€</span>
                </div>
              </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Hoc tập */}
      <section className="container mx-auto px-4 mt-10">
        <motion.h2 
          className="text-2xl font-bold text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Học tập
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 mt-4">
          {products.map((product, index) => (
            
            <motion.div 
              key={product.id}
              className="bg-white transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              
            >
            <Link href={`/products/${product.id}`} passHref>
            <div>
            
              {/* Hình ảnh sản phẩm */}
              <div className="relative w-full h-40">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              {/* Thông tin sản phẩm */}
              <div className="mt-3">
                <p className="text-gray-500 text-sm">{product.description}</p>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-black">{product.price}€</span>
                </div>
              </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Giải trí */}
      <section className="w-full bg-white py-10 mt-10">
        <motion.h2 
          className="text-2xl font-bold container mx-auto text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          color="blue"
        >
          Giải trí
        </motion.h2>

        <div className=" container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 mt-4">
          {products.map((product, index) => (
            
            <motion.div 
              key={product.id}
              className="transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              
            >
            <Link href={`/products/${product.id}`} passHref>
            <div>
            
              {/* Hình ảnh sản phẩm */}
              <div className="relative w-full h-40">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              {/* Thông tin sản phẩm */}
              <div className="mt-3">
                <p className="text-black text-sm">{product.description}</p>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-black">{product.price}€</span>
                </div>
              </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Công việc */}
      <section className="w-full bg-white py-10 mt-10">
        <motion.h2 
          className="text-2xl font-bold container mx-auto text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          color="blue"
        >
          Công việc
        </motion.h2>

        <div className=" container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 mt-4">
          {products.map((product, index) => (
            
            <motion.div 
              key={product.id}
              className="transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              
            >
            <Link href={`/products/${product.id}`} passHref>
            <div>
            
              {/* Hình ảnh sản phẩm */}
              <div className="relative w-full h-40">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              {/* Thông tin sản phẩm */}
              <div className="mt-3">
                <p className="text-black text-sm">{product.description}</p>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-black">{product.price}€</span>
                </div>
              </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      
    </motion.div>

    
    
  );
}
const products = [
  {
    id: "1",
    name: "Netflix Premium",
    price: 5.99,
    description: "Tài khoản Netflix Premium 4K cho 1 tháng.",
    image: "/images/netflix.png",
  },
  {
    id: "2",
    name: "Spotify Premium",
    price: 3.99,
    description: "Tài khoản Spotify Premium 1 tháng.",
    image: "/images/spotify.png",
  },
  {
    id: "3",
    name: "Canva Pro",
    price: 4.99,
    description: "Tài khoản Canva Pro 1 tháng.",
    image: "/images/canva.png",
  },
  {
    id: "4",
    name: "Disney+",
    price: 6.99,
    description: "Tài khoản Disney+ 1 tháng.",
    image: "/images/disney.png",
  },
  {
    id: "5",
    name: "Youtube Premium",
    price: 7.99,
    description: "Tài khoản Youtube Premium 1 tháng.",
    image: "/images/youtube.png",
  },
  {
    id: "6",
    name: "Duolingo Super",
    price: 8.99,
    description: "Tài khoản Duolingo Super 1 năm.",
    image: "/images/duolingo.png",
  },
  {
    id: "7",
    name: "Chat GPT",
    price: 9.99,
    description: "Tài khoản Chat GPT 1 tháng.",
    image: "/images/chatgpt.png",
  },
  {
    id: "8",
    name: "Windows 10 Pro",
    price: 10.99,
    description: "Key Windows 10 Pro bản quyền.",
    image: "/images/windows.png",
  }
];

const categories = [
  { name: "Giải trí", icon: <Gamepad2 size={22} className="text-blue-500" /> },
  { name: "Làm việc", icon: <Briefcase size={22} className="text-green-500" /> },
  { name: "Học tập", icon: <GraduationCap size={22} className="text-orange-500" /> },
  { name: "Game Steam", icon: <Monitor size={22} className="text-red-500" /> },
  { name: "Edit Ảnh - Video", icon: <Paintbrush size={22} className="text-purple-500" /> },
  { name: "Window, Office", icon: <FileText size={22} className="text-gray-600" /> },
  { name: "Google Drive", icon: <FileText size={22} className="text-yellow-500" /> },
  { name: "Steam Wallet", icon: <Gift size={22} className="text-indigo-500" /> },
  { name: "Diệt Virus", icon: <Shield size={22} className="text-red-600" /> },
];

const heroApps = [
  { name: "Adobe", image: "/images/adobe.png" },
  { name: "Canva", image: "/images/canva.png" },
  { name: "Zoom", image: "/images/zoom.png" },
  { name: "HIDE my ASS!", image: "/images/hidemyass.png" },
  { name: "NordVPN", image: "/images/nordvpn.png" },
  { name: "Doodly", image: "/images/doodly.png" },
];

const sideBanners = [
  { title: "FAKE IP VPN", price: "Chỉ từ 35K" },
  { title: "AI Chatbot", price: "Chỉ từ 99K" },
];

const bottomBanners = [
  { title: "Steam Wallet", price: "Siêu tiết kiệm" },
  { title: "Phần mềm thiết kế", price: "Chỉ từ 25K" },
  { title: "Phần mềm diệt Virus", price: "Chỉ từ 99K" },
  { title: "Microsoft Office", price: "Chỉ từ 99k" },
];
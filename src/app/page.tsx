'use client';
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Gamepad2, Briefcase, GraduationCap, Monitor, Paintbrush, Shield, Gift, FileText } from "lucide-react";


export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Kiểm tra nếu đã có dark mode trong localStorage
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
    }
  }, []);

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  //   localStorage.setItem("darkMode", (!darkMode).toString());
  // };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      {/* Toggle Dark Mode Button */}
      {/* <div className="absolute top-4 right-4">
        <button 
          onClick={toggleDarkMode} 
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div> */}

      {/* Hero Section */}
      {/* <section className="relative w-full h-[500px] flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center">
        <motion.div 
          className="container px-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold">🎉 Mua Tài Khoản Premium Giá Rẻ!</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Netflix, Spotify, Canva, và nhiều hơn nữa! Trải nghiệm premium với giá tốt nhất.
          </p>
          <Link href="/products/premium">
            <motion.button 
              className="mt-6 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              whileHover={{ scale: 1.1 }}
            >
              🔥 Xem sản phẩm ngay
            </motion.button>
          </Link>
        </motion.div>
      </section> */}
      {/* Sidebar danh mục */}
      {/* Hero Section - Dùng Grid */}
      <div className="grid grid-cols-4 gap-4">
        
        {/* Sidebar Danh Mục */}
        <aside className="bg-white shadow-lg rounded-xl p-5 col-span-1">
          <ul className="space-y-4 text-gray-700">
            {categories.map((category) => (
              <li 
                key={category.name} 
                className="flex items-center space-x-3 hover:text-blue-600 transition cursor-pointer hover:scale-105"
              >
                {category.icon}
                <span className="font-semibold">{category.name}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Banner Chính */}
        <section className="relative bg-cover bg-center rounded-xl p-8 col-span-2 flex flex-col items-center text-center shadow-lg"
            style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
          >
            <div className="absolute inset-0 bg-black opacity-20 rounded-xl"></div>
            <h1 className="relative text-3xl font-bold mb-6 text-white bg-clip-text">
              🚀 TỐI ƯU CÔNG VIỆC
            </h1>
            <div className="grid grid-cols-3 gap-6 relative">
              {heroApps.map((app) => (
                <div key={app.name} className="flex flex-col items-center space-y-2 hover:scale-105 transition">
                  <Image src={app.image} alt={app.name} width={70} height={70} className="rounded-xl shadow-md" />
                  <span className="text-md font-semibold text-white">{app.name}</span>
                </div>
              ))}
            </div>
        </section>

        {/* Banners Phụ Bên Phải */}
        <aside className="col-span-1 flex flex-col space-y-4">
          {sideBanners.map((banner) => (
            <div 
              key={banner.title} 
              className="bg-blue-500 text-white p-6 rounded-xl text-center hover:shadow-xl hover:scale-105 transition transform"
            >
              <h3 className="text-lg font-bold">{banner.title}</h3>
              <p className="text-xl font-bold">{banner.price}</p>
            </div>
          ))}
        </aside>
      </div>

      {/* Banners Dưới */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        {bottomBanners.map((banner) => (
          <div 
            key={banner.title} 
            className="bg-gray-200 p-6 rounded-xl flex flex-col items-center hover:shadow-lg hover:scale-105 transition"
          >
            <h3 className="text-lg font-bold">{banner.title}</h3>
            <p className="text-blue-600 text-xl font-bold">{banner.price}</p>
          </div>
        ))}
      </div>

      {/* Danh mục sản phẩm phổ biến */}
      <section className="container mx-auto my-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Sản phẩm phổ biến</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularProducts.map((product, index) => (
            <motion.div 
              key={product.id} 
              className="bg-white shadow-lg rounded-lg p-4 hover:scale-105 transition-transform dark:bg-gray-800 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Image src={product.image} alt={product.name} width={200} height={200} className="mx-auto" />
              <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
              <p className="text-lg font-bold text-blue-600">€{product.price}</p>
              <Link href="/products/premium">
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Mua ngay
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

const popularProducts = [
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
    name: "HBO Max",
    price: 8.99,
    description: "Tài khoản HBO Max 1 tháng.",
    image: "/images/hbo.png",
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
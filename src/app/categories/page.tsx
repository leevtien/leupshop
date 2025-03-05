"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gamepad2, Briefcase, GraduationCap, Monitor, Paintbrush, Shield, Gift, FileText } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    { name: "Giải trí", icon: <Gamepad2 size={40} className="text-blue-500" />, path: "/categories/entertainment", description: "Dịch vụ Streaming giải trí cao cấp" },
    { name: "Làm việc", icon: <Briefcase size={40} className="text-green-500" />, path: "/categories/work", description: "Phần mềm và dịch vụ làm việc chuyên nghiệp" },
    { name: "Học tập", icon: <GraduationCap size={40} className="text-orange-500" />, path: "/categories/education", description: "Công cụ học tập và phát triển kỹ năng" },
    { name: "Game Steam", icon: <Monitor size={40} className="text-red-500" />, path: "/categories/steam", description: "Game bản quyền trên nền tảng Steam" },
    { name: "Edit Ảnh - Video", icon: <Paintbrush size={40} className="text-purple-500" />, path: "/categories/editing", description: "Phần mềm chỉnh sửa ảnh và video chuyên nghiệp" },
    { name: "Window, Office", icon: <FileText size={40} className="text-gray-600" />, path: "/categories/microsoft", description: "Phần mềm văn phòng và hệ điều hành Microsoft" },
    { name: "Google Drive", icon: <FileText size={40} className="text-yellow-500" />, path: "/categories/google", description: "Dịch vụ lưu trữ đám mây Google" },
    { name: "Steam Wallet", icon: <Gift size={40} className="text-indigo-500" />, path: "/categories/steam-wallet", description: "Thẻ nạp Steam Wallet với giá ưu đãi" },
    { name: "Diệt Virus", icon: <Shield size={40} className="text-red-600" />, path: "/categories/antivirus", description: "Phần mềm bảo mật và diệt virus hàng đầu" },
  ];

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Danh Mục Sản Phẩm</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <Link href={category.path} className="flex flex-col items-center w-full">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                {category.icon}
              </div>
              <h2 className="text-xl font-bold mb-2">{category.name}</h2>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
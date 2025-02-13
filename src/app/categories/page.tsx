import Link from "next/link";
import { categories } from "@/app/data/categories";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">📂 Danh mục sản phẩm</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`}>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center space-x-4">
              <span className="text-3xl">{category.icon}</span>
              <span className="text-xl font-semibold">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
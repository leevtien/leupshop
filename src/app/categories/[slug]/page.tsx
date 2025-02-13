import { notFound } from "next/navigation";
import { categories } from "@/app/data/categories";
import { products } from "@/app/data/products";
import Link from "next/link";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return notFound();

  const filteredProducts = products.filter((p) => p.category === params.slug);

  return (
    <div className="container mx-auto py-6">
      {/* Banner Danh Mục */}
      <div className="relative bg-blue-600 text-white text-center py-10 rounded-lg">
        <h1 className="text-4xl font-bold">{category.icon} {category.name}</h1>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-6">
        {/* Sidebar */}
        <aside className="bg-white shadow-lg rounded-lg p-6 col-span-1">
          <h2 className="text-lg font-semibold mb-4">📂 Danh mục khác</h2>
          <ul className="space-y-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/categories/${c.slug}`} className={`block p-2 rounded-lg hover:bg-blue-100 ${c.slug === params.slug ? "bg-blue-500 text-white" : ""}`}>
                  {c.icon} {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Danh sách sản phẩm */}
        <section className="col-span-3">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {filteredProducts.length > 0 ? filteredProducts.map((product) => (
      <Link key={product.id} href={`/products/${product.slug}`}>
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
            Giảm {product.discount}%
          </span>
          <Image src={product.image} alt={product.name} width={200} height={100} className="w-full rounded-lg" />
          <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
          <p className="text-gray-500">{product.description}</p>
          <p className="text-xl font-bold text-blue-600">Từ {product.price}đ</p>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            🛒 Xem chi tiết
          </button>
        </div>
      </Link>
    )) : (
      <p className="text-center text-gray-500">Không có sản phẩm nào.</p>
    )}
  </div>
</section>
      </div>
    </div>
  );
}
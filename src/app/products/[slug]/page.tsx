import { notFound } from "next/navigation";
import { products } from "@/app/data/products";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Hình ảnh sản phẩm */}
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-center">
          <Image src={product.image} alt={product.name} width={300} height={300} className="rounded-lg" />
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>

          <div className="mt-4">
            {product.discount && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                Giảm {product.discount}%
              </span>
            )}
            <p className="text-2xl font-bold text-blue-600 mt-2">
              {product.price}đ
            </p>
          </div>

          <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            🛒 Mua ngay
          </button>

          <p className="text-gray-500 text-sm mt-2">* Giá có thể thay đổi theo thời gian.</p>
        </div>
      </div>

      {/* Mô tả chi tiết */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">📜 Mô tả chi tiết</h2>
        <p className="text-gray-600 leading-relaxed">{product.details}</p>
      </section>

      {/* Chính sách bảo hành & câu hỏi thường gặp */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">❓ Câu hỏi thường gặp</h2>
        <ul className="space-y-4">
          {product.faq.map((qa, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <strong>{qa.question}</strong>
              <p className="text-gray-600">{qa.answer}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
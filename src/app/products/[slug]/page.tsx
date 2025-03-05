"use client";
import { useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { Heart, Check, ArrowLeft, Star, ShoppingCart, AlertCircle, Truck, Shield, Clock } from "lucide-react";
import { ClipLoader } from "react-spinners";
import React from "react";

// Product type should match between pages
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  slug?: string;
  details?: string;
  rating?: number;
  discount?: number;
  faq?: { question: string; answer: string }[];
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  // Unwrap params with React.use()
  const unwrappedParams = React.use(params);
  const slug = unwrappedParams.slug;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]); // For related products
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product with slug/id:", slug);
        const res = await fetch("/api/airtable");
        const data = await res.json();
        
        // Debug output to see all products
        console.log("All products:", data.map((p: Product) => ({
          id: p.id,
          slug: p.slug || p.id,
          name: p.name
        })));
        
        // Store all products for related products section
        setProducts(data);
        
        // More comprehensive matching logic
        const foundProduct = data.find((p: Product) => {
          // Try matching by various ID formats
          const isIdMatch = (
            p.id === slug || 
            p.id?.toString().toLowerCase() === slug.toLowerCase() ||
            // Special case for Airtable record IDs
            (p.id?.startsWith('rec') && slug.startsWith('rec') && 
             p.id.toLowerCase() === slug.toLowerCase())
          );
          
          // Try matching by slug if available
          const isSlugMatch = p.slug && (
            p.slug === slug ||
            p.slug.toLowerCase() === slug.toLowerCase()
          );
          
          return isIdMatch || isSlugMatch;
        });
        
        console.log("Found product matching slug/id:", foundProduct);
        
        if (foundProduct) {
          // Add default values for missing fields
          setProduct({
            ...foundProduct,
            details: foundProduct.details || foundProduct.description,
            rating: foundProduct.rating || 5,
            faq: foundProduct.faq || [
              { 
                question: "Làm thế nào để kích hoạt sản phẩm?", 
                answer: "Sau khi mua hàng, bạn sẽ nhận được email hướng dẫn kích hoạt sản phẩm."
              },
              {
                question: "Tôi có thể sử dụng trên mấy thiết bị?",
                answer: "Sản phẩm có thể sử dụng trên nhiều nền tảng khác nhau."
              }
            ]
          });
        } else {
          console.error("Product not found with slug/id:", slug);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [slug]);
  
  // Rest of your component remains the same
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQuantity(value);
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };
  
  const handleBuyNow = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
    router.push('/checkout');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <ClipLoader color="#2563EB" size={50} />
      </div>
    );
  }
  
  if (!product) return notFound();
  
  // Calculate discounted price if applicable
  const finalPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;
    
  // Filter related products
  const relatedProducts = products
    .filter(p => p.id !== product.id)
    .slice(0, 4);
    
  return (
    <div className="container mx-auto py-4 px-4 md:py-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-blue-600">Sản phẩm</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium truncate">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 md:p-6 rounded-lg shadow-md">
        {/* Back button (mobile only) */}
        <button 
          onClick={() => router.back()} 
          className="md:hidden flex items-center text-gray-600 mb-2"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Quay lại</span>
        </button>
        
        {/* Hình ảnh sản phẩm */}
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square">
            <Image 
              src={product.image} 
              alt={product.name} 
              layout="fill" 
              objectFit="contain" 
              className="rounded-lg" 
            />
            {product.discount && (
              <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount}%
              </span>
            )}
          </div>
          
          {/* Thumbnail Gallery - can be expanded in the future */}
          <div className="flex justify-center mt-4 space-x-2">
            <div className="border-2 border-blue-500 p-1 rounded">
              <Image 
                src={product.image} 
                alt={product.name} 
                width={60} 
                height={60} 
                className="rounded"
              />
            </div>
            {/* Additional thumbnails would go here */}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          
          {/* Ratings */}
          <div className="flex items-center mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < (product.rating || 5) ? "text-yellow-400" : "text-gray-300"} fill={i < (product.rating || 5) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">(120 đánh giá)</span>
          </div>
          
          <p className="text-gray-600 mt-3">{product.description}</p>
          
          {/* Price section */}
          <div className="mt-4 flex items-end">
            <p className="text-2xl font-bold text-blue-600">
              {finalPrice.toLocaleString()}€
            </p>
            {product.discount && (
              <p className="ml-3 text-base text-gray-500 line-through">
                {product.price.toLocaleString()}€
              </p>
            )}
          </div>
          
          {/* Availability */}
          <div className="flex items-center mt-3 text-sm">
            <Check size={16} className="text-green-500 mr-2" />
            <span>Còn hàng</span>
          </div>
          
          {/* Divider */}
          <hr className="my-4 border-gray-200" />
          
          {/* Quantity selector */}
          <div className="flex items-center">
            <span className="text-gray-700 mr-3">Số lượng:</span>
            <div className="flex items-center border rounded">
              <button 
                className="px-3 py-1 border-r" 
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                -
              </button>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={handleQuantityChange}
                className="w-12 text-center py-1 focus:outline-none"
              />
              <button 
                className="px-3 py-1 border-l" 
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button 
              onClick={handleAddToCart}
              className={`flex justify-center items-center bg-gray-100 text-blue-600 border border-blue-600 py-3 rounded-lg hover:bg-gray-200 transition ${addedToCart ? 'bg-green-50 text-green-600 border-green-600' : ''}`}
            >
              {addedToCart ? (
                <>
                  <Check size={20} className="mr-2" />
                  <span>Đã thêm</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={20} className="mr-2" />
                  <span>Thêm vào giỏ</span>
                </>
              )}
            </button>
            <button 
              onClick={handleBuyNow}
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Mua ngay
            </button>
          </div>
          
          {/* Quick info */}
          <div className="mt-6 space-y-3">
            <div className="flex items-start">
              <Truck size={18} className="text-gray-700 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Giao hàng nhanh chóng</p>
                <p className="text-xs text-gray-500">Nhận hàng trong vòng 24 giờ</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield size={18} className="text-gray-700 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Bảo hành an toàn</p>
                <p className="text-xs text-gray-500">Bảo hành 30 ngày</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock size={18} className="text-gray-700 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Hỗ trợ 24/7</p>
                <p className="text-xs text-gray-500">Liên hệ bất cứ lúc nào</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-8 bg-white rounded-lg shadow-md">
        <div className="flex border-b">
          <button 
            className={`px-4 py-3 text-sm md:text-base font-medium ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('description')}
          >
            Mô tả chi tiết
          </button>
          <button 
            className={`px-4 py-3 text-sm md:text-base font-medium ${activeTab === 'faq' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('faq')}
          >
            Câu hỏi thường gặp
          </button>
        </div>
        
        <div className="p-4 md:p-6">
          {activeTab === 'description' && (
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-4">{product.details}</p>
              <h3 className="font-medium text-lg mb-2">Thông tin chi tiết:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Hỗ trợ đa nền tảng: Windows, Mac, iOS, Android</li>
                <li>Kích hoạt tự động, sử dụng ngay lập tức</li>
                <li>Bảo hành trọn đời, hỗ trợ kỹ thuật 24/7</li>
                <li>Thanh toán an toàn qua nhiều phương thức</li>
              </ul>
            </div>
          )}
          
          {activeTab === 'faq' && (
            <div className="space-y-4">
              {product.faq.map((qa, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium flex items-center">
                    <AlertCircle size={16} className="text-blue-600 mr-2" />
                    {qa.question}
                  </div>
                  <p className="text-gray-600 mt-2">{qa.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      <section className="mt-12">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Sản phẩm tương tự</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map(relatedProduct => (
            <Link href={`/products/${relatedProduct.slug || relatedProduct.id}`} key={relatedProduct.id}>
              <div className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition">
                <div className="relative aspect-square mb-2">
                  <Image 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name} 
                    layout="fill" 
                    objectFit="cover" 
                    className="rounded-lg" 
                  />
                </div>
                <h3 className="font-medium text-sm md:text-base line-clamp-2">{relatedProduct.name}</h3>
                <p className="text-blue-600 font-bold mt-1">{relatedProduct.price.toLocaleString()}€</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
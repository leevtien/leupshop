import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get("method");

  return (
    <div className="container mx-auto text-center p-6">
      <h1 className="text-3xl font-bold text-green-600">✅ Thanh toán thành công!</h1>
      <p className="text-lg mt-4">
        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận.
      </p>
      {paymentMethod && <p className="text-md mt-2">Phương thức thanh toán: <strong>{paymentMethod.toUpperCase()}</strong></p>}
      <a href="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
        Quay về trang chủ
      </a>
    </div>
  );
}
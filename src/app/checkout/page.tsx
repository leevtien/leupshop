"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    // Chuyển hướng đến trang thanh toán phù hợp
    if (paymentMethod === "stripe") {
      router.push("/checkout/stripe");
    } else if (paymentMethod === "paypal") {
      router.push("/checkout/paypal");
    } else if (paymentMethod === "banking") {
      router.push("/checkout/banking");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Thanh toán</h1>

      {/* Hiển thị danh sách sản phẩm trong giỏ hàng */}
      <div className="mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <span>{item.name} x {item.quantity}</span>
            <span className="font-semibold">${item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      {/* Chọn phương thức thanh toán */}
      <h2 className="text-xl font-semibold mb-4">🔍 Chọn phương thức thanh toán</h2>
      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input type="radio" name="payment" value="stripe" onChange={() => setPaymentMethod("stripe")} />
          <span>💳 Stripe (Visa, MasterCard)</span>
        </label>
        <label className="flex items-center space-x-3">
          <input type="radio" name="payment" value="paypal" onChange={() => setPaymentMethod("paypal")} />
          <span>🅿️ PayPal</span>
        </label>
        <label className="flex items-center space-x-3">
          <input type="radio" name="payment" value="banking" onChange={() => setPaymentMethod("banking")} />
          <span>🏦 Banking EU (Chuyển khoản)</span>
        </label>
      </div>

      <button 
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        onClick={handlePayment}
      >
        Tiến hành thanh toán
      </button>
    </div>
  );
}
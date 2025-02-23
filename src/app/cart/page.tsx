// "use client";

// import React from "react";
// import { useCart } from "@/app/context/CartContext";
// import { Trash2 } from "lucide-react";

// export default function CartPage() {
//   const { cart, removeFromCart, clearCart } = useCart();

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-4xl font-bold text-center mb-8">🛍️ Giỏ hàng của bạn</h1>
      
//       {cart.length === 0 ? (
//         <p className="text-center text-lg font-semibold">🛒 Giỏ hàng đang trống!</p>
//       ) : (
//         <div className="bg-white shadow-md rounded-lg p-6">
//           {cart.map((item) => (
//             <div key={item.id} className="flex justify-between items-center border-b pb-4 mb-4">
//               <div className="flex items-center">
//                 <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
//                 <div className="ml-4">
//                   <h2 className="text-xl font-semibold">{item.name}</h2>
//                   <p className="text-gray-600">${item.price} x {item.quantity}</p>
//                 </div>
//               </div>
//               <button 
//                 className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
//                 onClick={() => removeFromCart(item.id)}
//               >
//                 <Trash2 size={20} />
//               </button>
//             </div>
//           ))}
//           <button 
//             className="mt-6 w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition"
//             onClick={clearCart}
//           >
//             🗑️ Xóa toàn bộ giỏ hàng
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("");

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleBankingPayment = () => {
    router.push(`/checkout/banking?amount=${totalAmount}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
          🛍️
         Giỏ hàng
         </h1>

      {cart.length === 0 ? (
        <p className="text-center text-lg font-semibold">Giỏ hàng của bạn đang trống!</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4 mb-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">€{item.price} x {item.quantity}</p>
                </div>
              </div>
              <button 
                className="bg-while-100 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
                onClick={() => removeFromCart(item.id)}
              >
                ❌
              </button>
              
            </div>
            
          ))}
          
          {/* Hiển thị tổng tiền */}
          <div className="flex justify-between mt-6">
            <p className="text-xl font-semibold">Tổng tiền:</p>
            <p className="text-2xl font-bold text-blue-600">${totalAmount}</p>
          </div>

          {/* Chọn phương thức thanh toán */}
          <h2 className="text-xl font-semibold mt-6">🔍 Chọn phương thức thanh toán</h2>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input type="radio" name="payment" value="paypal" onChange={() => setPaymentMethod("paypal")} />
              <span>🅿️ PayPal</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="radio" name="payment" value="banking" onChange={() => setPaymentMethod("banking")} />
              <span>🏦 Banking EU (Chuyển khoản)</span>
            </label>
          </div>

          {/* Nút thanh toán */}
          {paymentMethod === "paypal" && (
            <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
              <div className="mt-6 flex justify-center">
                <PayPalButtons 
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: { value: totalAmount },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      alert(`Thanh toán thành công! Cảm ơn bạn, ${details.payer.name.given_name}.`);
                      clearCart();
                      router.push(`/checkout/success?method=paypal`);
                    });
                  }}
                />
              </div>
            </PayPalScriptProvider>
          )}

          {paymentMethod === "banking" && (
            <button 
              className="mt-6 w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition"
              onClick={handleBankingPayment}
            >
              Chuyển khoản ngân hàng 🏦
            </button>
          )}

          
        </div>
      )}
    </div>
  );
}
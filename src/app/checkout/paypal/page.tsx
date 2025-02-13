"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "@/app/context/CartContext";

export default function PayPalCheckout() {
  const { cart } = useCart();

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      alert(`Thanh toán thành công! Cảm ơn bạn, ${details.payer.name.given_name}.`);
    });
  };

  return (
    <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">🅿️ Thanh toán bằng PayPal</h1>
        <div className="flex justify-center">
          <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
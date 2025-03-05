"use client"
import { useEffect, useState } from 'react';
import OrderTable from '@/components/admin/OrderTable';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from an API or data source
    const fetchOrders = async () => {
      const response = await fetch('/api/orders'); // Adjust the API endpoint as needed
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      <OrderTable orders={orders} />
    </div>
  );
};

export default OrdersPage;
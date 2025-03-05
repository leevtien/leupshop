import React from 'react';
import { Order } from '../../../types/admin';

interface OrderTableProps {
  orders: Order[];
  onUpdateOrder: (orderId: string) => void;
  onDeleteOrder: (orderId: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onUpdateOrder, onDeleteOrder }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Customer Name</th>
            <th className="py-2 px-4 border-b">Total Amount</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.customerName}</td>
              <td className="py-2 px-4 border-b">{order.totalAmount}€</td>
              <td className="py-2 px-4 border-b">{order.status}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => onUpdateOrder(order.id)} className="text-blue-500 hover:underline">Update</button>
                <button onClick={() => onDeleteOrder(order.id)} className="text-red-500 hover:underline ml-4">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
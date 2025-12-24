import React from 'react';
import { Order } from '@/server/order'; // Import the shared interface

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  
  // Helper to get color based on status
  const getStatusColor = (status: string) => {
    const s = status.toLowerCase(); // Ensure case insensitivity
    switch(s) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Helper to get color based on payment status
  const getPaymentColor = (status: string) => {
    const s = status.toLowerCase();
    return s === 'paid' ? 'text-green-600' : 'text-orange-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase font-medium text-xs">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              {/* Removed "Items" column until we add it to backend resource */}
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-800">{order.order_number}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs uppercase">
                        {order.customer.charAt(0)}
                      </div>
                      {order.customer}
                    </div>
                  </td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">${order.total_amount}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold ${getPaymentColor(order.payment_status)} capitalize`}>
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">View Details</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
        <span>Showing {orders.length} entries</span>
        <div className="flex gap-2">
           <button className="px-3 py-1 border rounded hover:bg-white disabled:opacity-50" disabled>Previous</button>
           <button className="px-3 py-1 border rounded hover:bg-white disabled:opacity-50" disabled>Next</button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
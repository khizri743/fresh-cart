import React from 'react';

const OrdersTable = () => {
  // Mock Data for Orders
  const orders = [
    {
      id: "#ORD-7752",
      customer: "Sarah Williams",
      date: "Oct 24, 2023",
      amount: "$120.50",
      payment: "Paid",
      status: "Delivered",
      items: 12
    },
    {
      id: "#ORD-7753",
      customer: "Michael Brown",
      date: "Oct 24, 2023",
      amount: "$45.00",
      payment: "Unpaid",
      status: "Pending",
      items: 4
    },
    {
      id: "#ORD-7754",
      customer: "Emily Davis",
      date: "Oct 23, 2023",
      amount: "$230.00",
      payment: "Paid",
      status: "Processing",
      items: 25
    },
    {
      id: "#ORD-7755",
      customer: "John Doe",
      date: "Oct 22, 2023",
      amount: "$15.99",
      payment: "Refunded",
      status: "Cancelled",
      items: 1
    },
  ];

  // Helper to get color based on status
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Processing': return 'bg-blue-100 text-blue-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
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
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-slate-800">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">
                      {order.customer.charAt(0)}
                    </div>
                    {order.customer}
                  </div>
                </td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">{order.items} items</td>
                <td className="px-6 py-4 font-bold text-slate-800">{order.amount}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold ${order.payment === 'Paid' ? 'text-green-600' : 'text-orange-500'}`}>
                    {order.payment}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
        <span>Showing 1 to 4 of 50 entries</span>
        <div className="flex gap-2">
           <button className="px-3 py-1 border rounded hover:bg-white disabled:opacity-50">Previous</button>
           <button className="px-3 py-1 border rounded hover:bg-white">Next</button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
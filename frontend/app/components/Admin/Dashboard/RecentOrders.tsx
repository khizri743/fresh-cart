import React from 'react';

const RecentOrders = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">Recent Orders</h3>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase font-medium text-xs">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-medium text-slate-800">#ORD-001</td>
              <td className="px-6 py-4">Sarah Smith</td>
              <td className="px-6 py-4">Oct 24, 2023</td>
              <td className="px-6 py-4">$120.50</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Completed</span>
              </td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:underline">View</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-medium text-slate-800">#ORD-002</td>
              <td className="px-6 py-4">Michael Johnson</td>
              <td className="px-6 py-4">Oct 24, 2023</td>
              <td className="px-6 py-4">$45.00</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>
              </td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:underline">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
import React from 'react';
import OrdersToolbar from '../../../components/Admin/Orders/OrdersToolbar';
import OrdersTable from '../../../components/Admin/Orders/OrdersTable';
import { getOrders } from '@/server/order'; // Import Server Action

const OrdersPage = async () => {
  // Fetch real data
  const orders = await getOrders();

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Orders</h2>
          <p className="text-gray-500 mt-1">Manage and track customer orders.</p>
        </div>
        
        {/* Export Button */}
        <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition shadow-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Toolbar (Search & Filter) */}
      <OrdersToolbar />

      {/* Main Table with Real Data */}
      <OrdersTable orders={orders} />
    </div>
  );
};

export default OrdersPage;
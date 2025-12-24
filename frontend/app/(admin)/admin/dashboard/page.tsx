import React from 'react';
import StatsGrid from '../../../components/Admin/Dashboard/StatsGrid';
import RecentOrders from '../../../components/Admin/Dashboard/RecentOrders';

const Dashboard = () => {
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Overview</h2>
          <p className="text-gray-500 mt-1">Here is what's happening with your store today.</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition shadow-sm">
          + Add Product
        </button>
      </div>

      {/* Components */}
      <StatsGrid />
      <RecentOrders />
    </div>
  );
};

export default Dashboard;
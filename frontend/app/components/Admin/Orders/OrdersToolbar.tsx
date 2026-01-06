'use client'; // Required for hooks

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const OrdersToolbar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search by Order ID or Customer..."
          onChange={(e) => handleFilter('search', e.target.value)}
          defaultValue={searchParams.get('search')?.toString()}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        {/* Status Filter */}
        <select
          onChange={(e) => handleFilter('status', e.target.value)}
          defaultValue={searchParams.get('status')?.toString()}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-green-500 bg-white"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* Payment Filter */}
        <select
          onChange={(e) => handleFilter('payment', e.target.value)}
          defaultValue={searchParams.get('payment')?.toString()}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-green-500 bg-white"
        >
          <option value="">All Payments</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>
    </div>
  );
};

export default OrdersToolbar;

'use client'; // Required for hooks

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'; // Optional: Install 'use-debounce' or use generic timeout

// Note: If you don't want to install 'use-debounce', just use a simple onChange without delay for now
// To install: npm install use-debounce

const ProductToolbar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Helper to update URL params
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  };

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
          placeholder="Search products..."
          onChange={(e) => handleSearch(e.target.value)}
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
        {/* Category Filter */}
        <select
          onChange={(e) => handleFilter('category', e.target.value)}
          defaultValue={searchParams.get('category')?.toString()}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-green-500 bg-white"
        >
          <option value="">All Categories</option>
          <option value="Fruits & Veg">Fruits & Veg</option>
          <option value="Dairy">Dairy</option>
          <option value="Meats">Meat</option>
          <option value="Bakery">Bakery</option>
          <option value="Beverages">Beverages</option>
          <option value="Snacks">Snacks</option>
        </select>

        {/* Status Filter */}
        <select
          onChange={(e) => handleFilter('status', e.target.value)}
          defaultValue={searchParams.get('status')?.toString()}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-green-500 bg-white"
        >
          <option value="">All Statuses</option>
          <option value="in_stock">In Stock</option>
          <option value="low_stock">Low Stock</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>
    </div>
  );
};

export default ProductToolbar;

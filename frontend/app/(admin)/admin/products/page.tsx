import React from 'react';
import ProductToolbar from '../../../components/Admin/Products/ProductToolbar';
import ProductTable from '../../../components/Admin/Products/ProductTable';

const ProductsPage = () => {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Products</h2>
          <p className="text-gray-500 mt-1">Manage your store inventory</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg transition shadow-sm flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Product
        </button>
      </div>

      {/* Toolbar (Search & Filter) */}
      <ProductToolbar />

      {/* Main Table */}
      <ProductTable />
    </div>
  );
};

export default ProductsPage;
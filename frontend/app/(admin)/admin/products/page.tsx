import React from 'react';
import ProductToolbar from '../../../components/Admin/Products/ProductToolbar';
import ProductTable from '../../../components/Admin/Products/ProductTable';
import AddProductModal from '../../../components/Admin/Products/AddProductModal'; // Import new component
import { getProducts } from '@/server/product'; 

const ProductsPage = async () => {
  
  // 1. Fetch real data from Laravel
  const products = await getProducts();

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Products</h2>
          <p className="text-gray-500 mt-1">Manage your store inventory</p>
        </div>
        
        {/* Replace static button with the Modal Component */}
        <AddProductModal />
        
      </div>

      {/* Toolbar */}
      <ProductToolbar />

      {/* Main Table with Real Data */}
      <ProductTable products={products} />
    </div>
  );
};

export default ProductsPage;
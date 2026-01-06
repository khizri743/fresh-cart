import React from 'react';
import ProductToolbar from '../../../components/Admin/Products/ProductToolbar';
import ProductTable from '../../../components/Admin/Products/ProductTable';
import AddProductModal from '../../../components/Admin/Products/AddProductModal';
import { getProducts } from '@/server/product';

// In Next.js 15+, searchParams is typed as a Promise
interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    status?: string;
  }>;
}

const ProductsPage = async (props: ProductsPageProps) => {
  // 1. Await the params before using them
  const searchParams = await props.searchParams;

  // 2. Fetch real data with filters
  const products = await getProducts({
    search: searchParams?.search,
    category: searchParams?.category,
    status: searchParams?.status,
  });

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Products</h2>
          <p className="text-gray-500 mt-1">Manage your store inventory</p>
        </div>

        <AddProductModal />
      </div>

      {/* Toolbar - Controls the URL params */}
      <ProductToolbar />

      {/* Main Table - Displays filtered data */}
      <ProductTable products={products} />
    </div>
  );
};

export default ProductsPage;

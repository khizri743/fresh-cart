import React from 'react';
import { getProducts } from '@/server/product';
import ProductCard from '../../components/User/ProductCard';

export default async function ShopPage() {
  // Fetch ALL products (no slicing)
  const products = await getProducts();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <p className="mt-2 text-sm text-gray-500">
            Browse our complete collection of fresh groceries and pantry staples.
          </p>
        </div>

        {/* Optional: Filter/Sort Bar could go here */}
        
        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-gray-900">No products found.</h3>
            <p className="text-gray-500">Check back later for new stock!</p>
          </div>
        )}
      </div>
    </div>
  );
}
import React from 'react';
import { getProducts } from '@/server/product';
import ProductCard from '@/app/components/User/ProductCard';

// Next.js 16 uses an asynchronous structure for props
interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  // CRITICAL FIX: Await the searchParams Promise
  const filters = await searchParams;

  // 1. Get category from URL (e.g. /shop?category=Dairy)
  const category =
    typeof filters.category === 'string' ? filters.category : undefined;

  // 2. Fetch products filtered by category
  // This now uses the actual 'category' value, e.g., "Meats"
  const products = await getProducts(category);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {category ? `${category}` : 'All Products'}
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {products.length} result(s) found.
            </p>
          </div>

          {category && (
            // A simple <a> tag is fine here for clearing filters
            <a
              href="/shop"
              className="text-sm text-green-600 hover:text-green-800 underline"
            >
              Clear Filter
            </a>
          )}
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">
              No products found.
            </h3>
            <p className="text-gray-500 mt-2">
              Try selecting a different category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

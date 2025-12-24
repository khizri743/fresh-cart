import { getProducts } from '@/server/product';
import React from 'react';
import Link from 'next/link';
import ProductCard from '../ProductCard'; // Import the reusable card

const FeaturedProducts = async () => {
  // Fetch all and slice the first 4
  const allProducts = await getProducts();
  const products = allProducts.slice(0, 4);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Featured Products</h2>
          <Link href="/shop" className="text-green-600 hover:text-green-700 font-medium">
            View All &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
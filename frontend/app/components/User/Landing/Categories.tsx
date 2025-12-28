import Link from 'next/link';
import React from 'react';

const Categories = () => {
  const categories = [
    // Note: 'slug' must match the exact strings in your Laravel Factory
    { name: 'Fruits & Veg', color: 'bg-orange-100', slug: 'Fruits & Veg' },
    { name: 'Meats', color: 'bg-red-100', slug: 'Meats' },
    { name: 'Dairy', color: 'bg-yellow-100', slug: 'Dairy' },
    { name: 'Bakery', color: 'bg-amber-100', slug: 'Bakery' },
    { name: 'Beverages', color: 'bg-blue-100', slug: 'Beverages' },
    { name: 'Snacks', color: 'bg-purple-100', slug: 'Snacks' },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((cat) => (
            // Update Link to point to /shop?category=...
            <Link 
              key={cat.name} 
              href={`/shop?category=${encodeURIComponent(cat.slug)}`} 
              className="group"
            >
              <div className={`${cat.color} rounded-xl h-32 flex items-center justify-center mb-3 transition-transform transform group-hover:scale-105`}>
                <span className="text-2xl font-bold text-gray-700 opacity-50">{cat.name[0]}</span>
              </div>
              <h3 className="text-center font-medium text-gray-900 group-hover:text-green-600">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
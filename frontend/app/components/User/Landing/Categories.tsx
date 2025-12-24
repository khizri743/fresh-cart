import Link from 'next/link';
import React from 'react';

const Categories = () => {
  const categories = [
    { name: 'Fruits & Veg', color: 'bg-orange-100', href: '/shop/fruits-veg' },
    { name: 'Meats & Seafood', color: 'bg-red-100', href: '/shop/meats' },
    { name: 'Dairy & Eggs', color: 'bg-yellow-100', href: '/shop/dairy' },
    { name: 'Bakery', color: 'bg-amber-100', href: '/shop/bakery' },
    { name: 'Beverages', color: 'bg-blue-100', href: '/shop/beverages' },
    { name: 'Snacks', color: 'bg-purple-100', href: '/shop/snacks' },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="group">
              <div className={`${category.color} rounded-xl h-32 flex items-center justify-center mb-3 transition-transform transform group-hover:scale-105`}>
                <span className="text-2xl font-bold text-gray-700 opacity-50">{category.name[0]}</span>
              </div>
              <h3 className="text-center font-medium text-gray-900 group-hover:text-green-600">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
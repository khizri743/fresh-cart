import React from 'react';
import Hero from '../components/User/Landing/Hero';
import Features from '../components/User/Landing/Features';
import Categories from '../components/User/Landing/Categories';
import FeaturedProducts from '../components/User/Landing/FeaturedProducts';
import { get } from '@/server/user';

export default async function Home() {

  const data = await get();

  console.log("User Data on Home Page:", data);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Service Features (Free Shipping, etc.) */}
      <Features />

      {/* 3. Shop by Category */}
      <Categories />

      {/* 4. Featured/Popular Products */}
      <FeaturedProducts />
      
      {/* 5. Simple Newsletter Section (Inline) */}
      <section className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">Get 20% off your first order</h2>
          <p className="mt-4 text-lg text-green-100">Join our newsletter to get weekly recipes and fresh deals.</p>
          <div className="mt-8 flex justify-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-5 py-3 rounded-l-md w-64 md:w-96 text-gray-900 focus:outline-none"
            />
            <button className="px-5 py-3 bg-gray-900 text-white font-medium rounded-r-md hover:bg-gray-800">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
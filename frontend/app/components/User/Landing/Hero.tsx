import React from 'react';
import Link from 'next/link';
import HeroSlideshow from './HeroSlideshow';

const Hero = () => {
  return (
    <section className="relative bg-green-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-green-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          
          {/* Main Text Content (Server Rendered for SEO) */}
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Fresh groceries</span>{' '}
                <span className="block text-green-600 xl:inline">delivered to your door</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Get farm-fresh produce, dairy, meats, and pantry staples delivered in as little as 2 hours. Quality you can taste, convenience you can trust.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/shop" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition">
                    Shop Now
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="/offers" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10 transition">
                    View Offers
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Slideshow Container */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 h-64 sm:h-72 md:h-96 lg:h-full">
         <HeroSlideshow />
      </div>
    </section>
  );
};

export default Hero;
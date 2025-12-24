'use client'; 

import Link from 'next/link';
import React, { useState } from 'react';

// Define the User interface (matching your server/user.ts)
interface User {
  name: string;
  email: string;
}

interface NavbarProps {
  user?: User | null; // Accept user as a prop
}

const Navbar = ({ user }: NavbarProps) => {
  // State to manage the Mobile Menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to close menu when a link is clicked
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* 1. Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" onClick={closeMenu} className="text-2xl font-bold text-green-600 tracking-tight">
              GroceryApp
            </Link>
          </div>

          {/* 2. Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search for items or categories..."
                className="w-full text-black bg-gray-100 rounded-full py-2 pl-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-300 ease-in-out border border-transparent focus:border-green-500"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* 3. Right Side Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6 items-center">
               <Link href="/" className="text-gray-700 hover:text-green-600 font-medium text-sm transition">Home</Link>
               <Link href="/shop" className="text-gray-700 hover:text-green-600 font-medium text-sm transition">Shop</Link>
               <Link href="/offers" className="text-gray-700 hover:text-green-600 font-medium text-sm transition">Offers</Link>
            </div>

            {/* CONDITIONAL CART: Only show if user is logged in */}
            {user && (
              <button className="text-gray-600 hover:text-green-600 relative transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </button>
            )}
            
            {/* CONDITIONAL AUTH BUTTON: Show User Name if logged in, else Show Login */}
            {user ? (
               <div className="hidden md:flex items-center">
                  <span className="text-sm font-semibold text-gray-700">Hi, {user.name}</span>
               </div>
            ) : (
               <Link href="/login" className="hidden md:block px-5 py-2 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-green-700 transition shadow-sm">
                 Login
               </Link>
            )}

            {/* Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 z-40">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <Link href="/" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">Home</Link>
             <Link href="/shop" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">Shop</Link>
             <Link href="/offers" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">Offers</Link>
             <div className="border-t border-gray-100 my-2"></div>
             
             {/* Mobile Auth Logic */}
             {user ? (
               <div className="px-3 py-2">
                 <p className="text-sm text-gray-500 mb-2">Signed in as <span className="font-bold">{user.name}</span></p>
                 <button className="block w-full text-center px-3 py-3 rounded-md text-base font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
                    Logout
                 </button>
               </div>
             ) : (
               <Link href="/login" onClick={closeMenu} className="block w-full text-center px-3 py-3 rounded-md text-base font-medium bg-green-600 text-white hover:bg-green-700">
                 Login
               </Link>
             )}
          </div>
        </div>
      )}

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4 bg-white border-b border-gray-100 pt-2">
         <div className="relative w-full">
            <input type="text" placeholder="Search groceries..." className="w-full text-black bg-gray-50 border border-gray-200 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-green-500" />
            <button className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-green-600">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </button>
         </div>
      </div>
    </nav>
  );
};

export default Navbar;
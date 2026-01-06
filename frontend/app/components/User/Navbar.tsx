'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import NavLinks from './Navbar/NavLinks';
import SearchBar from './Navbar/SearchBar';
import CartButton from './Navbar/CartButton';
import MobileMenu from './Navbar/MobileMenu';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* 1. Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-green-600 tracking-tight"
            >
              GroceryApp
            </Link>
          </div>

          {/* 2. Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* 3. Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6 items-center">
              <NavLinks className="text-sm" />
            </div>

            {/* Cart - Only show if user is logged in */}
            {user && <CartButton />}

            {/* Desktop Auth Buttons */}
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                {/* --- ADMIN BUTTON START --- */}
                {user.role === 'admin' && (
                  <Link
                    href="/admin/dashboard"
                    className="px-4 py-2 bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-slate-900 transition shadow-sm"
                  >
                    Admin Panel
                  </Link>
                )}
                {/* --- ADMIN BUTTON END --- */}

                <span className="text-sm font-semibold text-gray-700">
                  Hi, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-red-500 hover:text-red-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:block px-5 py-2 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-green-700 transition shadow-sm"
              >
                Login
              </Link>
            )}

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Dropdown */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        logout={logout}
      />

      {/* 5. Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4 bg-white border-b border-gray-100 pt-2">
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;

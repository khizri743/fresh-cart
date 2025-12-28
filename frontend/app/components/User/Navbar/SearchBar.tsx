import React from 'react';

const SearchBar = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative w-full group ${className}`}>
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
  );
};

export default SearchBar;
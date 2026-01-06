'use client'; // Required for interactivity

import React, { useState } from 'react';
import { Product } from '@/server/product';
import { useCart } from '@/context/CartContext'; // Import context

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart(); // Get the add function
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if wrapped in a Link
    addToCart(product);

    // Show visual feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="group relative border rounded-lg p-4 hover:shadow-lg transition bg-white flex flex-col h-full">
      {/* Image Area */}
      <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center mb-4 relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      {/* Product Details */}
      <div className="mt-auto">
        <div className="flex justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm font-bold text-gray-900">${product.price}</p>
        </div>

        {/* Add Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`w-full py-2 rounded-md transition font-medium ${
            isAdded
              ? 'bg-green-800 text-white'
              : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
          }`}
        >
          {isAdded ? 'Added! ✓' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

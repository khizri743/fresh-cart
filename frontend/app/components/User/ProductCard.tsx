import React from 'react';
import { Product } from '@/server/product'; // Import the interface

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group relative border rounded-lg p-4 hover:shadow-lg transition bg-white">
      {/* Image Area */}
      <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center mb-4 relative">
        {/* We use an img tag here assuming product.image is a URL from the DB/Server Action */}
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:opacity-90 transition"
          />
        ) : (
          <span className="text-gray-400 font-medium">No Image</span>
        )}
      </div>

      {/* Details */}
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 font-medium">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          {/* You can add a weight/unit field to your DB later if needed */}
          <p className="mt-1 text-sm text-gray-500">{product.description ? product.description.substring(0, 20) + '...' : 'Fresh'}</p>
        </div>
        <p className="text-sm font-bold text-gray-900">${product.price}</p>
      </div>
      
      <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 z-10 relative transition">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
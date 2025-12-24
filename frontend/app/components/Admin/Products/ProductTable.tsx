import { Product } from '@/server/product'; // Import the shared interface
import React from 'react';

// Define Props Interface
interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  // We removed the mock 'const products = [...]' array from here

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase font-medium text-xs">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gray-100 overflow-hidden relative">
                        {/* Handle images safely */}
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs">No Img</div>
                        )}
                      </div>
                      <span className="font-medium text-slate-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800">${product.price}</td>
                  <td className="px-6 py-4">{product.stock} units</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${product.status === 'in_stock' ? 'bg-green-100 text-green-700' : ''}
                      ${product.status === 'out_of_stock' ? 'bg-red-100 text-red-700' : ''}
                      ${product.status === 'low_stock' ? 'bg-yellow-100 text-yellow-700' : ''}
                    `}>
                      {/* Replace underscores with spaces for better display */}
                      {product.status.replace(/_/g, ' ')} 
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 mr-3 font-medium">Edit</button>
                    <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No products found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer / Pagination Mockup */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
        <span>Showing all {products.length} entries</span>
        <div className="flex gap-2">
           <button className="px-3 py-1 border rounded hover:bg-white disabled:opacity-50" disabled>Previous</button>
           <button className="px-3 py-1 border rounded hover:bg-white disabled:opacity-50" disabled>Next</button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
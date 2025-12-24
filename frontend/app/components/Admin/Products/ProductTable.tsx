import React from 'react';

const ProductTable = () => {
  // Mock Data
  const products = [
    {
      id: 1,
      name: "Organic Bananas",
      category: "Fruits & Veg",
      price: "$1.50",
      stock: 120,
      status: "In Stock",
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=100&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Whole Milk (1L)",
      category: "Dairy",
      price: "$2.20",
      stock: 45,
      status: "In Stock",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "Fresh Sourdough Bread",
      category: "Bakery",
      price: "$4.50",
      stock: 2,
      status: "Low Stock",
      image: "https://images.unsplash.com/photo-1585476644321-b9a3d595876f?w=100&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      name: "Chicken Breast (1kg)",
      category: "Meat",
      price: "$12.00",
      stock: 0,
      status: "Out of Stock",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=100&auto=format&fit=crop&q=60"
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase font-medium text-xs">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 overflow-hidden">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <span className="font-medium text-slate-800">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4 font-medium text-slate-800">{product.price}</td>
                <td className="px-6 py-4">{product.stock} units</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${product.status === 'In Stock' ? 'bg-green-100 text-green-700' : ''}
                    ${product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${product.status === 'Out of Stock' ? 'bg-red-100 text-red-700' : ''}
                  `}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 mr-3 font-medium">Edit</button>
                  <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Simple Pagination */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
        <span>Showing 1 to 4 of 24 entries</span>
        <div className="flex gap-2">
           <button className="px-3 py-1 border rounded hover:bg-white">Previous</button>
           <button className="px-3 py-1 border rounded hover:bg-white">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
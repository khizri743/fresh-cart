// 'use server';

// import { revalidatePath } from 'next/cache';
// import axios from 'axios';

// export interface Product {
//   id: number;
//   name: string;
//   category: string;
//   description: string;
//   price: number;
//   stock: number;
//   status: string;
//   image: string;
//   created_at: string;
// }

// export interface ProductFilters {
//   search?: string;
//   category?: string;
//   status?: string;
// }

// const baseUrl = process.env.APP_URL || 'http://127.0.0.1:8000/api';

// /**
//  * Fetch Products with optional category filtering
//  */
// export async function getProducts(
//   filters: ProductFilters = {}
// ): Promise<Product[]> {
//   try {
//     // Construct URL with query parameters
//     const params = new URLSearchParams();

//     if (filters.category) params.append('category', filters.category);
//     if (filters.status) params.append('status', filters.status);
//     if (filters.search) params.append('search', filters.search);

//     const url = `${baseUrl}/products?${params.toString()}`;

//     const response = await fetch(url, {
//       cache: 'no-store',
//       headers: {
//         'Cache-Control': 'no-cache',
//       },
//     });

//     if (!response.ok) return [];

//     const data = await response.json();
//     return data.data || data;
//   } catch (error) {
//     console.error('Product fetch error:', error);
//     return [];
//   }
// }

// /**
//  * Create Product
//  */
// export async function createProduct(formData: FormData) {
//   // 1. Prepare data for Laravel
//   const productData = {
//     name: formData.get('name'),
//     // Fallback to 'Uncategorized' if null to prevent DB error
//     category: formData.get('category') || 'Uncategorized',
//     description: formData.get('description'),
//     price: formData.get('price'),
//     stock: formData.get('stock'),
//     status: formData.get('status'),
//     slug:
//       formData.get('name')?.toString().toLowerCase().replace(/ /g, '-') +
//       '-' +
//       Date.now(),
//     image: 'https://placehold.co/600x400?text=New+Product',
//   };

//   try {
//     const response = await axios.post(`${baseUrl}/products`, productData, {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//     });

//     // 2. Revalidate the products page to show new data immediately
//     revalidatePath('/admin/products');
//     revalidatePath('/shop'); // Also revalidate shop to show new product

//     return {
//       success: true,
//       message: 'Product created successfully',
//       data: response.data,
//     };
//   } catch (error: any) {
//     // Axios catches non-2xx status codes (like 422 validation errors) automatically
//     const errorData = error.response?.data;
//     console.error('Laravel Error:', errorData || error.message);

//     return {
//       success: false,
//       message: errorData?.message || 'Failed to create product',
//       errors: errorData?.errors, // Return specific validation errors to the UI
//     };
//   }
// }

'use server';

import { revalidatePath } from 'next/cache';
import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  status: string;
  image: string;
  created_at: string;
}

// Define the shape of the filters object
interface ProductFilters {
  category?: string;
  status?: string;
  search?: string;
}

const baseUrl = process.env.APP_URL || 'http://127.0.0.1:8000/api';

/**
 * Fetch Products with ALL filters (Category, Status, Search)
 */
export async function getProducts(
  filters: ProductFilters = {}
): Promise<Product[]> {
  try {
    const response = await axios.get(`${baseUrl}/products`, {
      // Pass the whole filters object as params
      // Axios automatically handles ?category=X&status=Y&search=Z
      params: {
        category: filters.category,
        status: filters.status,
        search: filters.search,
      },
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });

    return response.data.data || response.data;
  } catch (error) {
    console.error('Product fetch error:', error);
    return [];
  }
}

/**
 * Create Product
 */
export async function createProduct(formData: FormData) {
  const productData = {
    name: formData.get('name'),
    category: formData.get('category') || 'Uncategorized',
    description: formData.get('description'),
    price: formData.get('price'),
    stock: formData.get('stock'),
    status: formData.get('status'),
    slug:
      formData.get('name')?.toString().toLowerCase().replace(/ /g, '-') +
      '-' +
      Date.now(),
    image: 'https://placehold.co/600x400?text=New+Product',
  };

  try {
    const response = await axios.post(`${baseUrl}/products`, productData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    revalidatePath('/admin/products');
    revalidatePath('/shop');

    return {
      success: true,
      message: 'Product created successfully',
      data: response.data,
    };
  } catch (error: any) {
    const errorData = error.response?.data;
    console.error('Laravel Error:', errorData || error.message);

    return {
      success: false,
      message: errorData?.message || 'Failed to create product',
      errors: errorData?.errors,
    };
  }
}

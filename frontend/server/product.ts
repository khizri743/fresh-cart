"use server"

import { revalidatePath } from "next/cache";

// export interface Product {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     stock: number;
//     status: string;
//     image: string;
//     created_at: string;
// }

// const baseUrl = process.env.APP_URL || 'http://127.0.0.1:8000/api';

// export async function getProducts(): Promise<Product[]> {
//     try {
//         const response = await fetch(`${baseUrl}/products`, { cache: 'no-store' });
//         if (!response.ok) throw new Error('Failed to fetch products');
//         const data = await response.json();
//         return data.data || data;
//     } catch (error) {
//         console.error("Product fetch error:", error);
//         return [];
//     }
// }





// ... imports and interface ...

export interface Product {
    id: number;
    name: string;
    category: string; // <--- Add this to interface
    description: string;
    price: number;
    stock: number;
    status: string;
    image: string;
    created_at: string;
}

const baseUrl = process.env.APP_URL || 'http://127.0.0.1:8000/api';

// Accept an optional category parameter
export async function getProducts(category?: string): Promise<Product[]> {
    try {
        let url = `${baseUrl}/products`;
        
        // Append query param if category exists
        if (category) {
            url += `?category=${encodeURIComponent(category)}`;
        }

        const response = await fetch(url, { cache: 'no-store' });
        
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("Product fetch error:", error);
        return [];
    }
}
// ... rest of file (createProduct) ...



// NEW: Action to Create Product
export async function createProduct(formData: FormData) {
    // 1. Prepare data for Laravel
    // Note: We are mocking the image for now to keep it simple. 
    // Real file uploads require multipart/form-data handling.
    const productData = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        stock: formData.get('stock'),
        status: formData.get('status'),
        // Generating a slug from name for now
        slug: formData.get('name')?.toString().toLowerCase().replace(/ /g, '-') + '-' + Date.now(),
        image: 'https://placehold.co/600x400?text=New+Product' // Placeholder
    };

    try {
        const response = await fetch(`${baseUrl}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Laravel Error:", errorData);
            return { success: false, message: 'Failed to create product' };
        }

        // 2. Revalidate the products page to show new data immediately
        revalidatePath('/admin/products');
        
        return { success: true, message: 'Product created successfully' };

    } catch (error) {
        console.error("Create Product Error:", error);
        return { success: false, message: 'Server error occurred' };
    }
}
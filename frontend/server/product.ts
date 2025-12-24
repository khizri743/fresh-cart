"use server"

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    status: string;
    image: string;
    created_at: string;
}

export async function getProducts(): Promise<Product[]> {
    try {
        const response = await fetch(`${process.env.APP_URL}/products`, {
            cache: 'no-store' // Ensures fresh data for admin panel
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        console.log(data);
        return data.data;
    } catch (error) {
        console.error("Product fetch error:", error);
        return [];
    }
}
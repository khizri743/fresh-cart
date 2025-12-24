"use server"

export interface Order {
    id: number;
    order_number: string;
    customer: string;
    total_amount: string; // or number, depending on API response format
    status: string;
    payment_status: string;
    date: string;
}

export async function getOrders(): Promise<Order[]> {
    try {
        const response = await fetch(`${process.env.APP_URL}/orders`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Order fetch error:", error);
        return [];
    }
}
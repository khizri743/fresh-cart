"use server"

export interface DashboardStats {
    total_sales: number;
    total_orders: number;
    pending_delivery: number;
    new_customers: number;
}

export async function getDashboardStats(): Promise<DashboardStats | null> {
    try {
        const response = await fetch(`${process.env.APP_URL}/admin/stats`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Stats fetch error:", error);
        return null;
    }
}
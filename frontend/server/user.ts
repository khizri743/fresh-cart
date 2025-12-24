"use server"

export interface User {
    id: number;
    name: string;
    email: string;
    role: string; // admin, customer, vendor
    created_at: string; // Join Date
    email_verified_at: string | null;
}

export async function getUsers(): Promise<User[]> {
    const baseUrl = process.env.APP_URL || 'http://127.0.0.1:8000/api';

    try {
        const response = await fetch(`${baseUrl}/users`, { 
            cache: 'no-store' 
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        // The Laravel Resource might return wrapped data or direct array depending on implementation.
        // Usually, Resource::collection returns { data: [...] }
        return data.data || data; 
    } catch (error) {
        console.error("User fetch error:", error);
        return [];
    }
}

// Export 'get' as alias to keep compatibility with your previous code if needed
export { getUsers as get };
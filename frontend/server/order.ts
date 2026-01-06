'use server';

import axios from 'axios';

export interface Order {
  id: number;
  order_number: string;
  customer: string;
  total_amount: string;
  status: string;
  payment_status: string;
  date: string;
}

// Define the filters interface
interface OrderFilters {
  status?: string;
  payment?: string;
  search?: string;
}

const baseUrl = process.env.APP_URL || 'http://127.0.0.1:8000/api';

export async function getOrders(filters: OrderFilters = {}): Promise<Order[]> {
  try {
    const response = await axios.get(`${baseUrl}/orders`, {
      // Axios handles adding ?status=...&payment=... automatically
      params: filters,
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });

    return response.data.data || response.data;
  } catch (error) {
    console.error('Order fetch error:', error);
    return [];
  }
}

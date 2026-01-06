import React from 'react';
import OrdersToolbar from '../../../components/Admin/Orders/OrdersToolbar';
import OrdersTable from '../../../components/Admin/Orders/OrdersTable';
import { getOrders } from '@/server/order';

interface OrdersPageProps {
  searchParams: Promise<{
    status?: string;
    payment?: string;
    search?: string;
  }>;
}

const OrdersPage = async (props: OrdersPageProps) => {
  // 1. Await params
  const searchParams = await props.searchParams;

  // 2. Fetch filtered data
  const orders = await getOrders({
    status: searchParams?.status,
    payment: searchParams?.payment,
    search: searchParams?.search,
  });

  return (
    <div className="w-full">
      {/* Header... */}
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Orders</h2>
          <p className="text-gray-500 mt-1">
            Manage and track customer orders.
          </p>
        </div>
        {/* Export Button... */}
      </div>

      <OrdersToolbar />
      <OrdersTable orders={orders} />
    </div>
  );
};

export default OrdersPage;

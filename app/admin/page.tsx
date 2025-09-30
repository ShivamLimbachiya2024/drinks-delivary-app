"use client";

import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { KPICard } from '@/components/admin/KPICard';
import { SalesChart } from '@/components/admin/SalesChart';
import { CategoryChart } from '@/components/admin/CategoryChart';
import { Package, DollarSign, ShoppingBag, XCircle, RotateCcw, Store } from 'lucide-react';
import orders from '@/data/orders.json';
import vendors from '@/data/vendors.json';
import products from '@/data/products.json';

function AdminDashboardContent() {
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;
  const returnOrders = orders.filter(o => o.status === 'return').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const pendingVendors = vendors.filter(v => !v.isApproved);

  const salesByMonth: { [key: string]: number } = {};
  orders.forEach(order => {
    const date = new Date(order.createdAt);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    salesByMonth[monthKey] = (salesByMonth[monthKey] || 0) + order.total;
  });

  const salesChartData = {
    labels: Object.keys(salesByMonth).sort(),
    values: Object.keys(salesByMonth).sort().map(key => salesByMonth[key]),
  };

  const salesByCategory: { [key: string]: number } = {};
  orders.forEach(order => {
    order.products.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        salesByCategory[product.category] = (salesByCategory[product.category] || 0) + (item.price * item.quantity);
      }
    });
  });

  const categoryChartData = {
    labels: Object.keys(salesByCategory),
    values: Object.values(salesByCategory),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <KPICard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={DollarSign}
        />
        <KPICard
          title="Total Orders"
          value={totalOrders}
          icon={Package}
        />
        <KPICard
          title="Delivered"
          value={deliveredOrders}
          icon={ShoppingBag}
        />
        <KPICard
          title="Pending"
          value={pendingOrders}
          icon={Package}
        />
        <KPICard
          title="Cancelled"
          value={cancelledOrders}
          icon={XCircle}
        />
        <KPICard
          title="Returns"
          value={returnOrders}
          icon={RotateCcw}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SalesChart data={salesChartData} />
        <CategoryChart data={categoryChartData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Pending Vendor Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingVendors.length === 0 ? (
              <p className="text-gray-600">No pending approvals</p>
            ) : (
              <div className="space-y-4">
                {pendingVendors.map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      <p className="text-sm text-gray-600">{vendor.email}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm">Approve</Button>
                      <Button size="sm" variant="outline">Reject</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${order.total.toFixed(2)}</p>
                    <Badge
                      variant={
                        order.status === 'delivered'
                          ? 'default'
                          : order.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Store className="h-4 w-4 text-gray-600" />
                    <p className="font-medium">{vendor.name}</p>
                  </div>
                  <Badge variant={vendor.isApproved ? 'default' : 'secondary'}>
                    {vendor.isApproved ? 'Active' : 'Pending'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{vendor.email}</p>
                <p className="text-sm text-gray-600">{vendor.phone}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}

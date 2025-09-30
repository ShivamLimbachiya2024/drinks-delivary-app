"use client";

import { useAuth } from '@/store/authContext';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';
import { KPICard } from '@/components/admin/KPICard';
import orders from '@/data/orders.json';
import products from '@/data/products.json';

function VendorDashboardContent() {
  const { user } = useAuth();
  const vendorId = user?.vendorId;

  const vendorOrders = orders.filter(o => o.vendorId === vendorId);
  const vendorProducts = products.filter(p => p.vendorId === vendorId);

  const totalSales = vendorOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = vendorOrders.filter(o => o.status === 'pending').length;
  const deliveredOrders = vendorOrders.filter(o => o.status === 'delivered').length;

  const productSales: { [key: string]: number } = {};
  vendorOrders.forEach(order => {
    order.products.forEach(item => {
      productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity;
    });
  });

  const bestSellingProduct = vendorProducts.reduce((best, product) => {
    const sales = productSales[product.id] || 0;
    const bestSales = productSales[best?.id] || 0;
    return sales > bestSales ? product : best;
  }, vendorProducts[0]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Vendor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Sales"
          value={`$${totalSales.toFixed(2)}`}
          icon={DollarSign}
        />
        <KPICard
          title="Total Products"
          value={vendorProducts.length}
          icon={Package}
        />
        <KPICard
          title="Pending Orders"
          value={pendingOrders}
          icon={ShoppingBag}
        />
        <KPICard
          title="Delivered Orders"
          value={deliveredOrders}
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vendorOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${order.total.toFixed(2)}</p>
                    <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Selling Product</CardTitle>
          </CardHeader>
          <CardContent>
            {bestSellingProduct ? (
              <div>
                <p className="font-bold text-lg">{bestSellingProduct.name}</p>
                <p className="text-gray-600">{productSales[bestSellingProduct.id] || 0} units sold</p>
                <p className="text-2xl font-bold text-amber-600 mt-2">
                  ${bestSellingProduct.price.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-gray-600">No sales data available</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {vendorProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VendorDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['vendor']}>
      <VendorDashboardContent />
    </ProtectedRoute>
  );
}

import products from '@/data/products.json';
import vendors from '@/data/vendors.json';
import { VendorCarousel } from '@/components/vendors/VendorCarousel';
import { VendorCard } from '@/components/vendors/VendorCard';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';

export default function HomePage() {
  const approvedVendors = vendors.filter(v => v.isApproved);
  const featuredProducts = products.filter(p => p.isFeatured);
  const saleProducts = products.filter(p => p.isOnSale);
  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);
  const bestSellers = [...products]
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-4 py-8">
        <VendorCarousel vendors={approvedVendors} />
      </section>

      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Truck className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                <p className="text-sm text-gray-600">Delivered in 60 minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <ShieldCheck className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Payment</h3>
                <p className="text-sm text-gray-600">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Open 24/7</h3>
                <p className="text-sm text-gray-600">Order anytime, anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link href="/category/all">
            <Button variant="ghost">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
          </div>
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">On Sale</h2>
        </div>
        <ProductGrid products={saleProducts} emptyMessage="No products on sale right now" />
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Best Sellers</h2>
          </div>
          <ProductGrid products={bestSellers} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Our Vendors</h2>
          <Link href="/vendor/register">
            <Button variant="outline">
              Become a Vendor <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>
    </div>
  );
}

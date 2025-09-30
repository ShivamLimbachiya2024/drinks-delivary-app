"use client";

import { useWishlist } from '@/store/wishlistContext';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import products from '@/data/products.json';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-6">Add products you love to your wishlist</p>
        <Link href="/">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
      <ProductGrid products={wishlistProducts} />
    </div>
  );
}

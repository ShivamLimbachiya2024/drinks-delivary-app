"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cartContext";
import { useWishlist } from "@/store/wishlistContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import products from "@/data/products.json";
import vendors from "@/data/vendors.json";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <Link href="/">
          <Button className="mt-4">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const vendor = vendors.find((v) => v.id === product.vendorId);
  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {product.isOnSale && <Badge variant="destructive">Sale</Badge>}
                {product.isFeatured && (
                  <Badge className="bg-amber-600">Featured</Badge>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-gray-500">
                  ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Stock:</span>{" "}
                {product.stock > 0 ? (
                  <span className="text-green-600">
                    {product.stock} available
                  </span>
                ) : (
                  <span className="text-red-600">Out of stock</span>
                )}
              </p>
            </div>

            {vendor && (
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-1">Sold by</p>
                  <Link href={`/vendor/${vendor.id}`}>
                    <h4 className="font-semibold text-amber-600 hover:text-amber-700">
                      {vendor.name}
                    </h4>
                  </Link>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => addToCart(product.id)}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleToggleWishlist}
                className={cn(inWishlist && "text-red-500 border-red-500")}
              >
                <Heart
                  className={cn("h-5 w-5", inWishlist && "fill-current")}
                />
              </Button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <Card className="hover:shadow-lg transition">
                    <CardContent className="p-4">
                      <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {p.name}
                      </h3>
                      <p className="text-lg font-bold text-gray-900 mt-2">
                        ${p.price.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

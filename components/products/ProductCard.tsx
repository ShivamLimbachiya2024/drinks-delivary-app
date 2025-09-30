"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/store/cartContext";
import { useWishlist } from "@/store/wishlistContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    isOnSale?: boolean;
    isFeatured?: boolean;
    stock: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.id);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <CardContent className="p-4 flex-1">
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              {product.isOnSale && (
                <Badge variant="destructive" className="shadow-md">
                  Sale
                </Badge>
              )}
              {product.isFeatured && (
                <Badge className="bg-amber-600 hover:bg-amber-700 shadow-md">
                  Featured
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-2 left-2 bg-white/90 hover:bg-white",
                inWishlist && "text-red-500"
              )}
              onClick={handleToggleWishlist}
            >
              <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {product.category}
            </p>
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-amber-600 transition">
              {product.name}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
              {product.stock < 10 && (
                <Badge variant="outline" className="text-xs">
                  Only {product.stock} left
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

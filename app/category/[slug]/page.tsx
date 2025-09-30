"use client";

import { use, useState } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import products from "@/data/products.json";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [sortBy, setSortBy] = useState("default");

  const categoryProducts =
    slug === "all" ? products : products.filter((p) => p.category === slug);

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {slug === "all" ? "All Products" : slug}
          </h1>
          <p className="text-gray-600 mt-1">
            {sortedProducts.length} products found
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ProductGrid
        products={sortedProducts}
        emptyMessage={`No products found in ${
          slug === "all" ? "this category" : slug
        }`}
      />
    </div>
  );
}

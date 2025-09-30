"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, ArrowLeft } from "lucide-react";
import vendors from "@/data/vendors.json";
import products from "@/data/products.json";

export default function VendorStorefrontPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const vendor = vendors.find((v) => v.id === id);
  const vendorProducts = products.filter((p) => p.vendorId === id);

  if (!vendor) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Vendor not found</h1>
        <Link href="/">
          <Button className="mt-4">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={vendor.banner}
          alt={vendor.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <div className="-mt-16 relative z-10 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                  <Image
                    src={vendor.logo}
                    alt={vendor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        {vendor.name}
                      </h1>
                      <p className="text-lg text-gray-600">{vendor.title}</p>
                    </div>
                    <Link href="/">
                      <Button variant="ghost">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                    </Link>
                  </div>
                  <p className="text-gray-700 mt-4">{vendor.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {vendor.categories.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{vendor.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm">{vendor.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="text-sm">{vendor.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Products from {vendor.name}
          </h2>
          <ProductGrid
            products={vendorProducts}
            emptyMessage="This vendor has no products yet"
          />
        </div>
      </div>
    </div>
  );
}

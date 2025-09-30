"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

interface Vendor {
  id: string;
  name: string;
  banner: string;
  description: string;
}

interface VendorCarouselProps {
  vendors: Vendor[];
}

export function VendorCarousel({ vendors }: VendorCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {vendors.map((vendor) => (
          <CarouselItem key={vendor.id}>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={vendor.banner}
                alt={vendor.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="text-4xl font-bold mb-2">{vendor.name}</h2>
                <p className="text-lg mb-4 max-w-2xl">{vendor.description}</p>
                <Link href={`/vendor/${vendor.id}`}>
                  <Button size="lg" variant="secondary">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}

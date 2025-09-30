import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone } from 'lucide-react';

interface VendorCardProps {
  vendor: {
    id: string;
    name: string;
    title: string;
    logo: string;
    banner: string;
    description: string;
    address: string;
    phone: string;
    categories: string[];
    isApproved: boolean;
  };
}

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Link href={`/vendor/${vendor.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
        <div className="relative h-32 overflow-hidden">
          <Image
            src={vendor.banner}
            alt={vendor.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-md -mt-8 bg-white flex-shrink-0">
              <Image
                src={vendor.logo}
                alt={vendor.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition truncate">
                {vendor.name}
              </h3>
              <p className="text-sm text-gray-600 truncate">{vendor.title}</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {vendor.description}
          </p>

          <div className="mt-3 space-y-1">
            <div className="flex items-center text-xs text-gray-500">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{vendor.address}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
              <span>{vendor.phone}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            {vendor.categories.slice(0, 3).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

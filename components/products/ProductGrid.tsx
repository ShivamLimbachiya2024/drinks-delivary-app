import { ProductCard } from './ProductCard';

interface Product {
  id: string;
  vendorId: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  isFeatured: boolean;
  isOnSale: boolean;
  createdAt: string;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  emptyMessage?: string;
}

export function ProductGrid({ products, title, emptyMessage = 'No products found' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

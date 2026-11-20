import { useEffect, useState } from 'react';
import type { Product, ProductCategory } from '@/types/product';
import { subscribeToProducts } from '@/firebase/products';
import { ProductGrid } from './ProductGrid';
import { PatternMotif } from './PatternStrip';

interface ProductSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  category: ProductCategory;
  emptyMessage: string;
}

export function ProductSection({
  id,
  eyebrow,
  title,
  description,
  category,
  emptyMessage,
}: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((items) => {
      setProducts(items);
      setLoading(false);
    }, category);
    return unsubscribe;
  }, [category]);

  return (
    <section id={id} className="container py-5">
      <PatternMotif className="mb-3" style={{ height: '1.25rem', width: '8rem' }} />
      <p className="font-mono small text-uppercase text-brand-red-deep mb-1" style={{ letterSpacing: '0.1em' }}>
        {eyebrow}
      </p>
      <h2 className="font-display fw-semibold display-6 text-brand-dark mb-2">{title}</h2>
      <p className="text-black-50 mb-4" style={{ maxWidth: '36rem' }}>{description}</p>

      <div className="mt-4">
        <ProductGrid products={products} loading={loading} emptyMessage={emptyMessage} />
      </div>
    </section>
  );
}

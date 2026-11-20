import { motion } from 'framer-motion';
import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  emptyMessage: string;
}

export function ProductGrid({ products, loading, emptyMessage }: ProductGridProps) {
  if (loading) {
    return (
      <div className="row g-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="col-6 col-md-4 col-lg-3" key={i}>
            <div className="ratio ratio-1x1 rounded-4 bg-black bg-opacity-10 placeholder-glow">
              <span className="placeholder w-100 h-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-4 border border-2 border-dashed text-center text-black-50 py-5">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="row g-4">
      {products.map((product, i) => (
        <motion.div
          className="col-6 col-md-4 col-lg-3"
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: (i % 4) * 0.08 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}

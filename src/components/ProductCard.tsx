import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { Product } from '@/types/product';
import { formatNaira } from '@/lib/format';
import { useCart } from '@/context/CartContext';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="tag-notch card h-100 shadow-sm border-0"
      whileHover={{ y: -6, boxShadow: '0 12px 24px rgba(33,28,25,0.12)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="bg-brand-ivory ratio ratio-1x1">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="d-flex align-items-center justify-content-center small text-black-50">
            No image yet
          </div>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h3 className="font-display fs-5 fw-semibold mb-1">{product.name}</h3>
        {product.description && (
          <p
            className="small text-black-50 mb-2"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </p>
        )}

        <div className="mt-auto d-flex align-items-center justify-content-between pt-2">
          <span className="font-mono fw-semibold">{formatNaira(product.price)}</span>

          {product.inStock ? (
            <motion.button
              onClick={() => addToCart(product)}
              className="btn btn-brand-dark btn-sm rounded-pill d-flex align-items-center gap-1"
              whileTap={{ scale: 0.92 }}
            >
              <Plus size={14} />
              Add
            </motion.button>
          ) : (
            <span className="badge bg-secondary-subtle text-secondary rounded-pill">Sold out</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

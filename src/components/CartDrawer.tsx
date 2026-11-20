import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatNaira } from '@/lib/format';
import { buildWhatsAppOrderLink } from '@/lib/whatsapp';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, total, clearCart } =
    useCart();

  function handleCheckout() {
    const link = buildWhatsAppOrderLink(items, total);
    window.open(link, '_blank');
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="offcanvas-backdrop fade show"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="offcanvas offcanvas-end show"
            style={{ visibility: 'visible' }}
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="offcanvas-header border-bottom">
              <h2 className="offcanvas-title font-display fw-semibold text-brand-dark">Your cart</h2>
              <button type="button" className="btn-close" onClick={closeCart} aria-label="Close cart" />
            </div>

            <div className="offcanvas-body d-flex flex-column">
              <div className="flex-grow-1 overflow-auto">
                {items.length === 0 ? (
                  <p className="text-center text-black-50 py-5">
                    Your cart is empty. Go find some fabric.
                  </p>
                ) : (
                  <ul className="list-unstyled d-flex flex-column gap-3">
                    {items.map((item) => (
                      <li key={item.product.id} className="d-flex gap-3">
                        <div className="flex-shrink-0 bg-black bg-opacity-10 rounded-3 overflow-hidden" style={{ width: '5rem', height: '5rem' }}>
                          {item.product.imageUrl && (
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-100 h-100"
                              style={{ objectFit: 'cover' }}
                            />
                          )}
                        </div>
                        <div className="flex-grow-1 d-flex flex-column">
                          <div className="d-flex justify-content-between gap-2">
                            <p className="fw-medium mb-0 lh-sm">{item.product.name}</p>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              aria-label={`Remove ${item.product.name}`}
                              className="btn btn-link btn-sm text-black-50 p-0"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="font-mono small text-brand-red mb-0">
                            {formatNaira(item.product.price)}
                          </p>
                          <div className="mt-auto d-flex align-items-center gap-2 pt-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="btn btn-outline-secondary btn-sm rounded-circle p-1 d-flex"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="small" style={{ width: '1.5rem', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="btn btn-outline-secondary btn-sm rounded-circle p-1 d-flex"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-top pt-3 mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fw-medium">Total</span>
                    <span className="font-mono fs-5 fw-semibold text-brand-dark">
                      {formatNaira(total)}
                    </span>
                  </div>
                  <button onClick={handleCheckout} className="btn btn-success w-100 rounded-pill fw-semibold">
                    Checkout on WhatsApp
                  </button>
                  <button
                    onClick={clearCart}
                    className="btn btn-link btn-sm w-100 text-black-50 mt-2"
                  >
                    Clear cart
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

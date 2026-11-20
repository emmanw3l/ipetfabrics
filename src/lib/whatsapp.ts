import type { CartItem } from '@/types/cart';
import { formatNaira } from './format';

// Set your WhatsApp business number here, in international format with no
// leading zero, "+", or spaces. e.g. Nigerian number 080X XXX XXXX -> 234X XXXXXXXXX
export const WHATSAPP_NUMBER = '2349061525916';

export function buildWhatsAppOrderLink(items: CartItem[], total: number): string {
  const lines = items.map((item) => {
    const lineTotal = formatNaira(item.product.price * item.quantity);
    return `• ${item.product.name} x${item.quantity} — ${lineTotal}`;
  });

  const message = [
    'Hi! I\'d like to place an order:',
    '',
    ...lines,
    '',
    `Total: ${formatNaira(total)}`,
    '',
    'Please confirm availability and delivery details. Thank you!',
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

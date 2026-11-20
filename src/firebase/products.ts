import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import type { Product, ProductCategory, ProductInput } from '@/types/product';

const PRODUCTS_COLLECTION = 'products';

/**
 * Subscribes to real-time product updates, optionally filtered by category.
 * Returns an unsubscribe function — call it in a useEffect cleanup.
 * If Firebase isn't configured yet, immediately reports an empty list
 * instead of throwing, so the page can still render.
 */
export function subscribeToProducts(
  onChange: (products: Product[]) => void,
  category?: ProductCategory
) {
  if (!isFirebaseConfigured || !db) {
    onChange([]);
    return () => {};
  }

  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const q = category
    ? query(productsRef, where('category', '==', category), orderBy('createdAt', 'desc'))
    : query(productsRef, orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Product, 'id'>),
    }));
    onChange(products);
  });
}

export async function createProduct(input: ProductInput) {
  if (!db) throw new Error('Firebase is not configured.');
  await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...input,
    createdAt: Date.now(),
  });
}

export async function updateProduct(id: string, input: Partial<ProductInput>) {
  if (!db) throw new Error('Firebase is not configured.');
  await updateDoc(doc(db, PRODUCTS_COLLECTION, id), input);
}

export async function deleteProduct(product: Product) {
  if (!db) throw new Error('Firebase is not configured.');
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, product.id));
  // Note: we don't delete the Cloudinary image here — unsigned uploads
  // can't be deleted from the client without exposing an API secret.
  // Old images will just sit unused in your Cloudinary media library,
  // which is fine given the free tier's generous storage limit.
}

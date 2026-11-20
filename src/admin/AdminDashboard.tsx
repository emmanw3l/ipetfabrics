import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, LogOut } from 'lucide-react';
import type { Product, ProductCategory, ProductInput } from '@/types/product';
import {
  subscribeToProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/firebase/products';
import { logoutAdmin } from '@/firebase/auth';
import { formatNaira } from '@/lib/format';
import { ProductForm } from './ProductForm';

export function AdminDashboard() {
  const [tab, setTab] = useState<ProductCategory>('fabric');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToProducts((items) => {
      setProducts(items);
      setLoading(false);
    }, tab);
    return unsubscribe;
  }, [tab]);

  async function handleSave(input: ProductInput) {
    if (editing) {
      await updateProduct(editing.id, input);
    } else {
      await createProduct(input);
    }
  }

  async function handleDelete(product: Product) {
    if (!confirm(`Delete "${product.name}"? This can't be undone.`)) return;
    await deleteProduct(product);
  }

  async function handleLogout() {
    await logoutAdmin();
    navigate('/admin/login');
  }

  return (
    <div className="bg-brand-ivory" style={{ minHeight: '100vh' }}>
      <header className="d-flex align-items-center justify-content-between bg-brand-dark text-white px-4 py-3">
        <h1 className="font-display fs-4 fw-semibold mb-0">Shop admin</h1>
        <button onClick={handleLogout} className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-2">
          <LogOut size={16} />
          Log out
        </button>
      </header>

      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="btn-group" role="group">
            <button
              onClick={() => setTab('fabric')}
              className={`btn rounded-pill me-2 ${tab === 'fabric' ? 'btn-brand-dark' : 'btn-outline-secondary'}`}
            >
              Fabrics
            </button>
            <button
              onClick={() => setTab('clothing')}
              className={`btn rounded-pill ${tab === 'clothing' ? 'btn-brand-dark' : 'btn-outline-secondary'}`}
            >
              Clothes
            </button>
          </div>

          <button
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
            className="btn btn-success rounded-pill d-flex align-items-center gap-2 fw-semibold"
          >
            <Plus size={16} />
            Add {tab === 'fabric' ? 'fabric' : 'clothing item'}
          </button>
        </div>

        <div className="mt-4">
          {loading ? (
            <p className="text-black-50">Loading…</p>
          ) : products.length === 0 ? (
            <div className="rounded-4 border border-2 border-dashed text-center text-black-50 py-5">
              Nothing here yet. Add your first item.
            </div>
          ) : (
            <div className="table-responsive rounded-4 border bg-white">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div className="bg-black bg-opacity-10 rounded-2 overflow-hidden flex-shrink-0" style={{ width: '2.5rem', height: '2.5rem' }}>
                            {product.imageUrl && (
                              <img src={product.imageUrl} alt="" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                            )}
                          </div>
                          <span className="fw-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="font-mono">{formatNaira(product.price)}</td>
                      <td>
                        <span className={`badge rounded-pill ${product.inStock ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                          {product.inStock ? 'In stock' : 'Sold out'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            onClick={() => {
                              setEditing(product);
                              setFormOpen(true);
                            }}
                            className="btn btn-light btn-sm rounded-circle p-2"
                            aria-label={`Edit ${product.name}`}
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="btn btn-light btn-sm rounded-circle p-2 text-danger"
                            aria-label={`Delete ${product.name}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {formOpen && (
        <ProductForm
          category={tab}
          initial={editing}
          onSave={handleSave}
          onClose={() => setFormOpen(false)}
        />
      )}
    </div>
  );
}

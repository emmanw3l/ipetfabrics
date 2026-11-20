import { useState, type FormEvent } from 'react';
import type { Product, ProductCategory, ProductInput } from '@/types/product';
import { uploadToCloudinary } from '@/lib/cloudinary';

interface ProductFormProps {
  category: ProductCategory;
  initial?: Product | null;
  onSave: (input: ProductInput) => Promise<void>;
  onClose: () => void;
}

export function ProductForm({ category, initial, onSave, onClose }: ProductFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [price, setPrice] = useState(initial?.price?.toString() ?? '');
  const [inStock, setInStock] = useState(initial?.inStock ?? true);
  const [imageUrl] = useState(initial?.imageUrl ?? '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initial?.imageUrl ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    const priceNumber = Number(price);
    if (!name.trim()) {
      setError('Give it a name.');
      return;
    }
    if (!priceNumber || priceNumber <= 0) {
      setError('Enter a valid price.');
      return;
    }

    setSaving(true);
    try {
      let finalImageUrl = imageUrl;
      if (imageFile) {
        finalImageUrl = await uploadToCloudinary(imageFile);
      }
      if (!finalImageUrl) {
        setError('Add a photo.');
        setSaving(false);
        return;
      }

      await onSave({
        name: name.trim(),
        description: description.trim(),
        price: priceNumber,
        imageUrl: finalImageUrl,
        category,
        inStock,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong saving this item. Try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content rounded-4">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h2 className="modal-title font-display fw-semibold fs-4 text-brand-dark">
                {initial ? 'Edit item' : `Add new ${category}`}
              </h2>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-medium small">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder={category === 'fabric' ? 'e.g. Royal Blue Ankara' : 'e.g. Tailored Agbada'}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium small">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="form-control"
                  placeholder="Short details a customer would want to know"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium small">Price (₦)</label>
                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control"
                  placeholder="15000"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium small d-block">Photo</label>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="rounded-3 mb-2"
                    style={{ width: '8rem', height: '8rem', objectFit: 'cover' }}
                  />
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
              </div>

              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="form-check-input"
                  id="inStockCheck"
                />
                <label className="form-check-label small fw-medium" htmlFor="inStockCheck">
                  In stock
                </label>
              </div>

              {error && <p className="text-danger small mb-0">{error}</p>}
            </div>

            <div className="modal-footer">
              <button type="submit" disabled={saving} className="btn btn-brand-dark w-100 rounded-pill fw-semibold">
                {saving ? 'Saving…' : 'Save item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

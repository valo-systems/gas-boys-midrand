import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Image, CheckCircle } from '@phosphor-icons/react'
import { useInventoryStore, type Product } from '../../stores/useInventoryStore'

const CATEGORIES: Product['category'][] = ['cylinders', 'appliances', 'cast-iron', 'accessories', 'heating']

export default function AddProduct() {
  const navigate = useNavigate()
  const addProduct = useInventoryStore(s => s.addProduct)
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    name: '', sku: '', category: 'appliances' as Product['category'],
    brand: 'Gas Boys', price: '', stockQty: '', lowStockAt: '3',
    description: '', popular: false,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const update = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setImagePreview(result)
      setImageBase64(result)
    }
    reader.readAsDataURL(file)
  }

  function handleSave() {
    if (!form.name || !form.price || !form.stockQty) return
    addProduct({
      name: form.name,
      sku: form.sku || `PROD-${Date.now()}`,
      category: form.category,
      brand: form.brand,
      price: parseFloat(form.price),
      stockQty: parseInt(form.stockQty),
      lowStockAt: parseInt(form.lowStockAt) || 3,
      description: form.description,
      popular: form.popular,
      images: imageBase64 ? [imageBase64] : ['/gallery/Full-Cylinder.jpg'],
    })
    setSaved(true)
    setTimeout(() => navigate('/admin/inventory'), 1200)
  }

  if (saved) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <CheckCircle size={56} weight="fill" className="text-green-400 mx-auto mb-4" />
          <div className="font-display text-3xl text-green-400">PRODUCT ADDED!</div>
          <div className="text-sm text-gas-muted mt-2">Redirecting to inventory…</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => navigate('/admin/inventory')} className="btn-ghost py-2 px-4 text-sm mb-6">
        <ArrowLeft size={14} /> Back to Inventory
      </button>

      <h1 className="font-display text-4xl mb-8">ADD <span className="text-yellow-500">PRODUCT</span></h1>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Form */}
        <div className="xl:col-span-2 space-y-6">
          <div className="card p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Product Name *</label>
                <input className="input" value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. Triple Ring Burner" />
              </div>
              <div>
                <label className="label">SKU</label>
                <input className="input" value={form.sku} onChange={e => update('sku', e.target.value)} placeholder="e.g. RING-3-XL" />
              </div>
              <div>
                <label className="label">Brand</label>
                <input className="input" value={form.brand} onChange={e => update('brand', e.target.value)} />
              </div>
              <div>
                <label className="label">Category *</label>
                <select className="input" value={form.category} onChange={e => update('category', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Selling Price (R) *</label>
                <input className="input" type="number" value={form.price} onChange={e => update('price', e.target.value)} placeholder="0.00" step="0.01" />
              </div>
              <div>
                <label className="label">Initial Stock Qty *</label>
                <input className="input" type="number" value={form.stockQty} onChange={e => update('stockQty', e.target.value)} placeholder="0" />
              </div>
              <div>
                <label className="label">Low Stock Alert (below)</label>
                <input className="input" type="number" value={form.lowStockAt} onChange={e => update('lowStockAt', e.target.value)} />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="popular"
                  checked={form.popular}
                  onChange={e => update('popular', e.target.checked)}
                  className="w-4 h-4 accent-yellow-500"
                />
                <label htmlFor="popular" className="text-sm text-gas-muted cursor-pointer">Mark as Popular</label>
              </div>
            </div>
            <div>
              <label className="label">Description</label>
              <textarea
                className="input resize-none"
                rows={3}
                value={form.description}
                onChange={e => update('description', e.target.value)}
                placeholder="Brief product description…"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => navigate('/admin/inventory')} className="btn-ghost px-6 py-3">Cancel</button>
            <button
              onClick={handleSave}
              disabled={!form.name || !form.price || !form.stockQty}
              className="btn-primary flex-1 justify-center py-3 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Save Product
            </button>
          </div>
        </div>

        {/* Image upload */}
        <div>
          <div className="card p-6">
            <div className="font-heading font-semibold mb-4">Product Image</div>

            <div
              className="border-2 border-dashed border-gas-border rounded-2xl overflow-hidden cursor-pointer hover:border-yellow-500/50 transition-colors mb-4"
              onClick={() => fileRef.current?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-52 object-cover" />
              ) : (
                <div className="h-52 flex flex-col items-center justify-center gap-3 text-gas-muted">
                  <Image size={40} weight="duotone" />
                  <div className="text-sm">Click to upload image</div>
                  <div className="text-xs text-gas-muted2">JPG, PNG up to 10MB</div>
                </div>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />

            <button
              onClick={() => fileRef.current?.click()}
              className="btn-ghost w-full justify-center py-2.5 text-sm"
            >
              {imagePreview ? 'Change Image' : 'Upload Image'}
            </button>

            {!imagePreview && (
              <p className="text-xs text-gas-muted text-center mt-3">
                No image? We'll use the default cylinder placeholder.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

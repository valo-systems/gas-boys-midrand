import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, ArrowUp, PencilSimple, X } from '@phosphor-icons/react'
import { useInventoryStore, type Product } from '../../stores/useInventoryStore'

const CATS = ['all', 'cylinders', 'appliances', 'cast-iron', 'accessories', 'heating']
const CAT_LABELS: Record<string, string> = {
  all: 'All', cylinders: 'Cylinders', appliances: 'Appliances',
  'cast-iron': 'Cast Iron', accessories: 'Accessories', heating: 'Heating',
}

export default function InventoryGrid() {
  const navigate = useNavigate()
  const products       = useInventoryStore(s => s.products)
  const updateProduct  = useInventoryStore(s => s.updateProduct)
  const restockProduct = useInventoryStore(s => s.restockProduct)

  const [cat,        setCat]        = useState('all')
  const [restockId,  setRestockId]  = useState<string | null>(null)
  const [restockQty, setRestockQty] = useState(10)
  const [editPriceId,setEditPriceId]= useState<string | null>(null)
  const [editPrice,  setEditPrice]  = useState('')

  const filtered = cat === 'all' ? products : products.filter(p => p.category === cat)
  const restocking = products.find(p => p.id === restockId)

  function savePrice(p: Product) {
    const val = parseFloat(editPrice)
    if (!isNaN(val) && val > 0) updateProduct(p.id, { price: val })
    setEditPriceId(null)
    setEditPrice('')
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl mb-1">INVENTORY</h1>
          <p className="text-sm text-gas-muted">{products.length} products · {products.filter(p => p.stockQty <= p.lowStockAt).length} low stock</p>
        </div>
        <button onClick={() => navigate('/admin/inventory/add')} className="btn-primary py-2.5 px-5 text-sm">
          <Plus size={15} weight="bold" /> Add Product
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {CATS.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
              cat === c ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' : 'border-gas-border bg-gas-card2 text-gas-muted hover:border-gas-border2'
            }`}
          >
            {CAT_LABELS[c]}
            {c !== 'all' && (
              <span className="ml-1.5 text-[10px] text-gas-muted">
                ({products.filter(p => p.category === c).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map(p => {
          const isLow  = p.stockQty > 0 && p.stockQty <= p.lowStockAt
          const isOut  = p.stockQty === 0
          return (
            <div
              key={p.id}
              className={`card overflow-hidden group flex flex-col ${
                isOut ? 'border-red-500/30' : isLow ? 'border-orange-500/30' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-36 bg-gas-card2 overflow-hidden flex items-center justify-center">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className={`h-full w-full transition-transform duration-300 group-hover:scale-105 ${
                    p.category === 'cylinders' ? 'object-contain p-3' : 'object-cover'
                  }`}
                  onError={e => { (e.target as HTMLImageElement).src = '/gallery/Full-Cylinder.jpg' }}
                />
                {isOut && (
                  <div className="absolute inset-0 bg-gas-bg/70 flex items-center justify-center">
                    <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">OUT OF STOCK</span>
                  </div>
                )}
                {isLow && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">LOW</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3 flex-1 flex flex-col">
                <div className="text-[9px] uppercase tracking-widest text-gas-muted mb-0.5">{p.brand}</div>
                <div className="text-xs font-semibold leading-snug mb-2 flex-1">{p.name}</div>

                {/* Stock bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-gas-muted">Stock</span>
                    <span className={isOut ? 'text-red-400 font-bold' : isLow ? 'text-orange-400 font-bold' : 'text-green-400'}>
                      {p.stockQty}
                    </span>
                  </div>
                  <div className="h-1 bg-gas-card2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${isOut ? 'bg-red-500' : isLow ? 'bg-orange-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.min(100, (p.stockQty / Math.max(p.stockQty, 30)) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Price + actions */}
                <div className="flex items-center justify-between">
                  {editPriceId === p.id ? (
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-xs text-gas-muted">R</span>
                      <input
                        className="input py-1 px-2 text-xs flex-1"
                        autoFocus
                        value={editPrice}
                        onChange={e => setEditPrice(e.target.value)}
                        onBlur={() => savePrice(p)}
                        onKeyDown={e => { if (e.key === 'Enter') savePrice(p); if (e.key === 'Escape') { setEditPriceId(null); setEditPrice('') } }}
                      />
                    </div>
                  ) : (
                    <button
                      className="font-display text-base text-yellow-500 hover:text-yellow-400 transition-colors"
                      onClick={() => { setEditPriceId(p.id); setEditPrice(p.price.toFixed(2)) }}
                      title="Click to edit price"
                    >
                      R{p.price.toFixed(0)}
                    </button>
                  )}
                  <div className="flex gap-1">
                    <button
                      onClick={() => { setRestockId(p.id); setRestockQty(10) }}
                      className="w-7 h-7 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 flex items-center justify-center transition-all"
                      title="Restock"
                    >
                      <ArrowUp size={11} className="text-green-400" weight="bold" />
                    </button>
                    <button
                      onClick={() => { setEditPriceId(p.id); setEditPrice(p.price.toFixed(2)) }}
                      className="w-7 h-7 rounded-lg bg-gas-card2 hover:bg-gas-card border border-gas-border flex items-center justify-center transition-all"
                      title="Edit price"
                    >
                      <PencilSimple size={11} className="text-gas-muted" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Restock Modal */}
      {restockId && restocking && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setRestockId(null)}>
          <div className="card p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="font-heading font-semibold">Restock</div>
              <button onClick={() => setRestockId(null)} className="text-gas-muted hover:text-gas-text"><X size={18} /></button>
            </div>
            <div className="text-sm text-gas-muted mb-1">{restocking.name}</div>
            <div className="text-xs text-gas-muted2 mb-5">Current stock: <span className="text-gas-text font-bold">{restocking.stockQty}</span></div>

            <label className="label">Add Quantity</label>
            <div className="flex items-center gap-3 mb-5">
              <button onClick={() => setRestockQty(q => Math.max(1, q - 1))} className="w-10 h-10 rounded-xl border border-gas-border bg-gas-card2 text-xl flex items-center justify-center hover:border-gas-border2">−</button>
              <input
                type="number"
                className="input flex-1 text-center font-display text-xl"
                value={restockQty}
                onChange={e => setRestockQty(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button onClick={() => setRestockQty(q => q + 1)} className="w-10 h-10 rounded-xl border border-gas-border bg-gas-card2 text-xl flex items-center justify-center hover:border-gas-border2">+</button>
            </div>

            <div className="text-xs text-gas-muted text-center mb-5">
              New stock level: <span className="text-yellow-500 font-bold text-sm">{restocking.stockQty + restockQty}</span>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setRestockId(null)} className="btn-ghost flex-1 py-3">Cancel</button>
              <button
                onClick={() => { restockProduct(restockId, restockQty); setRestockId(null) }}
                className="btn-primary flex-1 justify-center py-3"
              >
                <ArrowUp size={14} weight="bold" /> Add Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

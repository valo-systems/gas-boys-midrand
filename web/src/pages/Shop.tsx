import { useState } from 'react'
import { MagnifyingGlass, Truck } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useInventoryStore } from '../stores/useInventoryStore'

const CATEGORIES = [
  { label: 'All',        value: 'all' },
  { label: 'Cylinders',  value: 'cylinders' },
  { label: 'Appliances', value: 'appliances' },
  { label: 'Cast Iron',  value: 'cast-iron' },
  { label: 'Accessories',value: 'accessories' },
  { label: 'Heating',    value: 'heating' },
]

export default function Shop() {
  const [cat, setCat] = useState('all')
  const [search, setSearch] = useState('')

  const products = useInventoryStore(s => s.products)

  const filtered = products.filter(p => {
    const matchCat = cat === 'all' || p.category === cat
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.brand.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="section-label mb-2">Gas Cylinders, Appliances & Accessories</div>
        <h1 className="font-display text-6xl md:text-7xl mb-10">SHOP</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlass size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gas-muted" />
            <input className="input pl-10" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          {/* Categories */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(c => (
              <button
                key={c.value}
                onClick={() => setCat(c.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer ${cat === c.value ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' : 'border-gas-border bg-gas-card2 text-gas-muted hover:border-gas-border2'}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(p => (
            <div
              key={p.id}
              className={`card overflow-hidden hover:-translate-y-1 transition-all duration-200 group relative ${p.popular ? 'border-yellow-500/50' : ''} ${p.stockQty === 0 ? 'opacity-60' : ''}`}
            >
              {p.popular && p.stockQty > 0 && (
                <div className="bg-yellow-500 text-black text-[9px] font-bold text-center py-1.5 tracking-widest uppercase">Most Popular</div>
              )}

              {/* Image */}
              <div className="h-44 bg-gas-card2 overflow-hidden flex items-center justify-center relative">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className={`h-full w-full transition-transform duration-300 group-hover:scale-105 ${p.category === 'cylinders' ? 'object-contain p-4' : 'object-cover'}`}
                  onError={e => { (e.target as HTMLImageElement).src = '/gallery/Full-Cylinder.jpg' }}
                />
                {/* Stock overlay */}
                {p.stockQty === 0 && (
                  <div className="absolute inset-0 bg-gas-bg/70 flex items-center justify-center">
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">OUT OF STOCK</span>
                  </div>
                )}
                {p.stockQty > 0 && p.stockQty <= p.lowStockAt && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">LOW STOCK</span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="text-[10px] uppercase tracking-widest text-gas-muted mb-1">{p.brand}</div>
                <div className="font-semibold text-sm mb-1 leading-snug">{p.name}</div>
                <div className="text-xs text-gas-muted leading-relaxed mb-3 line-clamp-2">{p.description}</div>

                {/* Stock indicator */}
                <div className="flex items-center gap-1.5 mb-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${p.stockQty === 0 ? 'bg-red-500' : p.stockQty <= p.lowStockAt ? 'bg-orange-500' : 'bg-green-500'}`} />
                  <span className="text-[10px] text-gas-muted">
                    {p.stockQty === 0 ? 'Out of stock' : p.stockQty <= p.lowStockAt ? `Only ${p.stockQty} left` : `${p.stockQty} in stock`}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="font-display text-2xl text-yellow-500">R{p.price.toFixed(2)}</div>
                  {p.stockQty > 0 ? (
                    <Link to={p.category === 'cylinders' ? '/order' : '/order'} className="btn-primary text-xs py-2 px-3 rounded-lg">
                      <Truck size={13} weight="duotone" /> Order
                    </Link>
                  ) : (
                    <a
                      href={`https://wa.me/27640263510?text=Hi%20Gas%20Boys!%20I%27m%20interested%20in%20the%20${encodeURIComponent(p.name)}%20but%20it%20shows%20out%20of%20stock.%20When%20will%20it%20be%20available?`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn-ghost text-xs py-2 px-3 rounded-lg"
                    >
                      Ask Us
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gas-muted">
            <div className="font-display text-4xl mb-2">NO RESULTS</div>
            <div className="text-sm">Try a different search or category</div>
          </div>
        )}
      </div>
    </div>
  )
}

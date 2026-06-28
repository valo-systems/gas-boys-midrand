import { useState } from 'react'
import { MagnifyingGlass, Truck } from '@phosphor-icons/react'
import { products, productCategories } from '../data/mock'
import { Link } from 'react-router-dom'

export default function Shop() {
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = products.filter(p => {
    const matchCat = cat === 'All' || p.category === cat.toLowerCase()
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
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
            {productCategories.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer ${cat === c ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' : 'border-gas-border bg-gas-card2 text-gas-muted hover:border-gas-border2'}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(p => (
            <div key={p.id} className={`card overflow-hidden hover:-translate-y-1 transition-all duration-200 group ${p.popular ? 'border-yellow-500/50' : ''}`}>
              {p.popular && <div className="bg-yellow-500 text-black text-[9px] font-bold text-center py-1.5 tracking-widest uppercase">Most Popular</div>}
              <div className="h-40 bg-gas-card2 overflow-hidden flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className={`h-full w-full transition-transform duration-300 group-hover:scale-105 ${p.category === 'cylinders' ? 'object-contain p-4' : 'object-cover'}`}
                />
              </div>
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-widest text-gas-muted mb-1">{p.brand}</div>
                <div className="font-semibold text-sm mb-1 leading-snug">{p.name}</div>
                <div className="text-xs text-gas-muted leading-relaxed mb-4">{p.description}</div>
                <div className="flex items-center justify-between">
                  <div className="font-display text-2xl text-yellow-500">R{p.price.toFixed(2)}</div>
                  <Link to="/order" className="btn-primary text-xs py-2 px-3 rounded-lg">
                    <Truck size={13} weight="duotone" /> Order
                  </Link>
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

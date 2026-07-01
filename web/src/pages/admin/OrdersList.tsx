import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { useOrderStore } from '../../stores/useOrderStore'

const TABS: { label: string; value: string }[] = [
  { label: 'All',       value: 'all' },
  { label: 'Pending',   value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Dispatched',value: 'dispatched' },
  { label: 'Delivered', value: 'delivered' },
]

const STATUS_COLORS: Record<string, string> = {
  pending:   'text-yellow-500 bg-yellow-500/10 border-yellow-500/25',
  confirmed: 'text-blue-400   bg-blue-500/10   border-blue-500/25',
  dispatched:'text-orange-400 bg-orange-500/10 border-orange-500/25',
  delivered: 'text-green-400  bg-green-500/10  border-green-500/25',
  cancelled: 'text-red-400    bg-red-500/10    border-red-500/25',
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_COLORS[status] ?? ''}`}>
      {status}
    </span>
  )
}

function fmt(date: Date) {
  return new Date(date).toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
}

export default function OrdersList() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('all')
  const orders = useOrderStore(s => s.orders)

  const filtered = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .filter(o => tab === 'all' || o.status === tab)

  const counts = TABS.reduce<Record<string, number>>((acc, t) => {
    acc[t.value] = t.value === 'all' ? orders.length : orders.filter(o => o.status === t.value).length
    return acc
  }, {})

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl mb-1">ORDERS</h1>
          <p className="text-sm text-gas-muted">{orders.length} total orders · {orders.filter(o => o.status === 'pending').length} pending</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map(t => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer flex items-center gap-2 ${
              tab === t.value
                ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500'
                : 'border-gas-border bg-gas-card2 text-gas-muted hover:border-gas-border2'
            }`}
          >
            {t.label}
            {counts[t.value] > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                tab === t.value ? 'bg-yellow-500 text-black' : 'bg-gas-card text-gas-muted'
              }`}>
                {counts[t.value]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders table */}
      <div className="card overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1.4fr_1.6fr_90px_80px_36px] gap-4 px-5 py-3 border-b border-gas-border text-[10px] font-bold uppercase tracking-widest text-gas-muted">
          <div>Reference</div>
          <div>Customer</div>
          <div>Items</div>
          <div className="text-right">Total</div>
          <div>Status</div>
          <div />
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gas-muted text-sm">No orders in this category</div>
        )}

        <div className="divide-y divide-gas-border">
          {filtered.map(o => (
            <div
              key={o.id}
              onClick={() => navigate(`/admin/orders/${o.id}`)}
              className="grid grid-cols-[1fr_1.4fr_1.6fr_90px_80px_36px] gap-4 px-5 py-4 hover:bg-gas-card2 transition-colors cursor-pointer group items-center"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs text-yellow-500">{o.ref}</span>
                  {o.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse flex-shrink-0" />}
                </div>
                <div className="text-[10px] text-gas-muted mt-0.5">{fmt(o.createdAt)}</div>
              </div>
              <div>
                <div className="text-sm font-medium">{o.customer.name}</div>
                <div className="text-xs text-gas-muted truncate">{o.customer.phone}</div>
              </div>
              <div className="text-xs text-gas-muted truncate">
                {o.items.map(i => `${i.qty}× ${i.size ? `${i.size}kg` : i.name.split(' ')[0]}`).join(', ')}
              </div>
              <div className="text-right">
                <div className="font-display text-base text-yellow-500">R{o.total.toFixed(0)}</div>
                <div className={`text-[9px] uppercase font-bold mt-0.5 ${
                  o.paymentStatus === 'paid' ? 'text-green-400' : 'text-gas-muted'
                }`}>{o.paymentStatus}</div>
              </div>
              <div><StatusBadge status={o.status} /></div>
              <div className="text-gas-muted group-hover:text-yellow-500 transition-colors">
                <ArrowRight size={15} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
